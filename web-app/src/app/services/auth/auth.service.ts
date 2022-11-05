import { HttpClient } from '@angular/common/http';
import { Injectable, TestabilityRegistry } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateOrganizationDto } from 'src/app/interfaces/create.organization.dto';
import { CreateUserDto } from 'src/app/interfaces/create.user.dto';
import { LoginDto } from 'src/app/interfaces/login.dto';
import { Data, LoginResponseDto, User } from 'src/app/interfaces/login.response.dto';
import { RegisterDto } from 'src/app/interfaces/register.organizacion.dto';
import { RegisterUserResponseDto } from 'src/app/interfaces/user.registry.response.dto';
import { environment } from 'src/environments/environment.prod';
import axios, { AxiosResponse } from 'axios';
import { RegisterOrganizationResponseDto } from 'src/app/interfaces/organization.registry,response.dto';
import { VerifyEmailDto } from 'src/app/interfaces/verify.email.dto';
import { VerifyEmailResponseDto } from 'src/app/interfaces/verify.email.response.dto';
import { Organization } from 'src/app/interfaces/organization';
import jwt_decode from 'jwt-decode';
import { GetUserResponseDto } from 'src/app/interfaces/get.user.response.dto';
import { GetOrganizationResponseDto } from 'src/app/interfaces/get.organization.response.dto';
import { GetTipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { GetEspacioResponse } from 'src/app/interfaces/get.espacios.response.dto';
import { GetFrecuencia } from 'src/app/interfaces/get.tarifa.frecuencia.res.dto';
import { CreateActividadDto } from 'src/app/interfaces/create.actividad.dto';
import { CreateActividadResponse } from 'src/app/interfaces/create.actividad.response.dto';
import { GetActividadesOrganizacion } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { GetEmployeeOrganization } from 'src/app/interfaces/get.employee.org.dto';
import { GetActividadDetail } from 'src/app/interfaces/get.detail.actividad.dto';
import { CreateTarifaDto } from 'src/app/interfaces/create.tarifa.dto';
import { GetTarifasActividadDto } from 'src/app/interfaces/get.tarifas.actividad.dto';
import { CreateTurnoDto } from 'src/app/interfaces/create.turno.dto';
import { GetInscriptosByOrganizacion } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { GetPagosByOrganizacion } from 'src/app/interfaces/get.pagos.organizacion.dto';
import { GetTarifasByOrganizacion } from 'src/app/interfaces/get.tarifas.organizacion.dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  organization: Organization | null = null;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  async processLogin(email: string, password: string) {
    // const url = 'https://' + environment.appUrl + environment.apiVersionUri + environment.loginUri;
    const url = 'http://localhost:3000' + environment.apiVersionUri + environment.loginUri;
    const dto: LoginDto = {
      email,
      password,
    }

    const request = this.http.post<LoginResponseDto>(url, dto)
    request.subscribe(
      {
        next: data => {
          this.user = data.data.user
          this.cookieService.set('token', data.data.access_token)
          this.cookieService.set('uid',data.data.user.id)
          this.getOrganizationDetail();
          return this.router.navigate([""]);
        },
        error: error => {
          return false;
        }
      })

    return request;
  }

  async processRegistry(registryForm: RegisterDto) {
    const user = this.createUser(registryForm.User);
    const org = "";
  }

  async createUser(userForm: CreateUserDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/auth/register';

    const usuario = (await axios.post<RegisterUserResponseDto>(url, userForm)).data;
    this.cookieService.set('token', usuario.access_token);
    this.cookieService.set('uid', usuario.id);
    this.user = {...usuario}
    return this.user;
  }

  async updateUserImage(path: string, uid: string) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/usuarios/' + uid;
    const form = {
      fotoPerfil: path
    };
    const token = this.getToken();
    const usuario = (await axios.patch<RegisterUserResponseDto>(url, form, { headers: { Authorization: `Bearer ${token}` }})).data;
    this.cookieService.set('uid', usuario.id);
    this.user = usuario;

    return this.user;
  }

  async updateActividad(actividad:Partial<GetActividadDetail>) {
    const token = this.getToken();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades/' + actividad.id;

    const result = (await axios.patch<GetActividadDetail>(url, actividad, { headers: { Authorization: `Bearer ${token}` }})).data;
    return result;
  }

  async createOrganization(organizationForm: CreateOrganizationDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones';

    const organization = (await axios.post<RegisterOrganizationResponseDto>(url, organizationForm)).data;
    this.cookieService.set('org', organization.id)
    this.organization = organization;
    return this.organization;
  }

  async createActividad(dto: CreateActividadDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades';
    const result = await axios.post<CreateActividadResponse>(url, dto);
    return result;
  }

  async createTarifa(dto: CreateTarifaDto) {
    const token = this.getToken();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/tarifas';
    const result = await axios.post<CreateTarifaDto>(url, dto, { headers: { Authorization: `Bearer ${token}` }});
    return result;
  }

  async createTurno(dto: CreateTurnoDto) {
    const token = this.getToken();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades/turno';
    const result = await axios.post<CreateTurnoDto>(url, dto, { headers: { Authorization: `Bearer ${token}` }});
    return result;
  }

  logout() {
    this.cookieService.delete('token');
    return this.router.navigate(['login']);
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/auth/verify';
    const token = this.getToken();
    const result =  await axios.post<VerifyEmailResponseDto>(url, dto, { headers: { Authorization: `Bearer ${token}` }});
    if (result.status == 201 && result.data.verified === true) {
      return this.router.navigate([""]);
    }
    return false;
  }

  getToken() {
    return this.cookieService.get('token');
  }

  async getUser() {
    const token = this.cookieService.get('token');
    const decodedToken = this.getDecodedAccessToken();
    if (! decodedToken) throw new Error("No token found.");

    const uid = decodedToken.sub;

    const url = '' + environment.appUrl + environment.apiVersionUri + '/usuarios/' + uid;
    const user = await axios.get<GetUserResponseDto>(url, { headers: { Authorization: `Bearer ${token}` }});
    return user;
  }

  async getOrgId () {
    let orgId = this.cookieService.get('org');
    const token = this.getToken();

    if (! orgId) {
      const decodedToken = this.getDecodedAccessToken();
      if (! decodedToken) throw new Error("No token found.");
      const uid = decodedToken.sub;
      const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones/personal/' + uid;
      orgId = (await axios.get<GetEmployeeOrganization>(url, { headers: { Authorization: `Bearer ${token}` }})).data.data[0].organizacion.id;
      this.cookieService.set('org', orgId)
    }

    return orgId;
  }

  async getOrganizationDetail() {
    let orgId = this.cookieService.get('org');
    const token = this.getToken();

    if (! orgId) {
      const decodedToken = this.getDecodedAccessToken();
      if (! decodedToken) throw new Error("No token found.");
      const uid = decodedToken.sub;
      const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones/personal/' + uid;
      orgId = (await axios.get<GetEmployeeOrganization>(url, { headers: { Authorization: `Bearer ${token}` }})).data.data[0].organizacion.id;
      this.cookieService.set('org', orgId)
    }
    const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones/' + orgId;

    return (await axios.get<GetOrganizationResponseDto>(url, { headers: { Authorization: `Bearer ${token}` }})).data;
  }

  async listEmployeeOrganizations () {
    const token = this.getToken();
    const uid = (await this.getUser()).data.data.id;

    const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones/personal/' + uid;
    return (await axios.get<GetEmployeeOrganization>(url, { headers: { Authorization: `Bearer ${token}` }})).data.data;
  }

  getDecodedAccessToken(): any {
    const token = this.cookieService.get('token');
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  async getTipoActividad() {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades/tipo';
    const token = this.getToken();
    return this.http.get<GetTipoActividad>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getTarifaFrecuencias() {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/tarifas/frecuencia';
    const token = this.getToken();
    return this.http.get<GetFrecuencia>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getTarifasActividad(idActividad: string) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/tarifas/actividad/' + idActividad;
    const token = this.getToken();
    return this.http.get<GetTarifasActividadDto>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getEspaciosOrganizacion() {
    const orgId = this.cookieService.get('org');
    const url = '' + environment.appUrl + environment.apiVersionUri + '/organizaciones/espacios/' + orgId;
    const token = this.getToken();
    return this.http.get<GetEspacioResponse>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getActividadesOrganizacion () {
    const orgId = await this.getOrgId();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades/organizacion/' + orgId;
    const token = this.getToken();
    return this.http.get<GetActividadesOrganizacion>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getActividadById (actividadId: string) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/actividades/' + actividadId;
    const token = this.getToken();
    return this.http.get<GetActividadDetail>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getSociosByOrg () {
    const orgId = await this.getOrgId();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/socios/organizacion/' + orgId;
    const token = this.getToken();
    return this.http.get<GetInscriptosByOrganizacion>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getPagosByOrg() {
    const orgId = await this.getOrgId();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/pagos/organizacion/' + orgId;
    const token = this.getToken();
    return this.http.get<GetPagosByOrganizacion>(url, { headers: { Authorization: `Bearer ${token}` }});
  }

  async getTarifasByOrg() {
    const orgId = await this.getOrgId();
    const url = '' + environment.appUrl + environment.apiVersionUri + '/tarifas/organizacion/' + orgId;
    const token = this.getToken();
    return this.http.get<GetTarifasByOrganizacion>(url, { headers: { Authorization: `Bearer ${token}` }});
  }
}
