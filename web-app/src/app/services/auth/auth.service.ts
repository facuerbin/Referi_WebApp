import { HttpClient } from '@angular/common/http';
import { Injectable, TestabilityRegistry } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CreateOrganizationDto } from 'src/app/interfaces/create.organization.dto';
import { CreateUserDto } from 'src/app/interfaces/create.user.dto';
import { LoginDto } from 'src/app/interfaces/login.dto';
import { LoginResponseDto } from 'src/app/interfaces/login.response.dto';
import { RegisterOrganizationResponseDto } from 'src/app/interfaces/organization.registry,response.dto';
import { RegisterDto } from 'src/app/interfaces/register.organizacion.dto';
import { User } from 'src/app/interfaces/user';
import { RegisterUserResponseDto } from 'src/app/interfaces/user.registry.response.dto';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : User | null = null;

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

  async processLogin(email: string, password: string) {
    // const url = 'https://' + environment.appUrl + environment.apiVersionUri + environment.loginUri;
    const url = 'http://localhost:3000' + environment.apiVersionUri + environment.loginUri;
    const dto: LoginDto = {
      email,
      password,
    }

    const user = this.http.post<LoginResponseDto>(url, dto).subscribe( data => {
      this.user = data.data.user
      console.log(data.data)
      this.cookieService.set('token', data.data.access_token)
      return this.router.navigate([""]);
    });
  }

  async processRegistry(registryForm: RegisterDto) {
    const user = this.createUser(registryForm.User);
    const org = "";
  }

  async createUser(userForm: CreateUserDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/register';

    const user = this.http.post<RegisterUserResponseDto>(url, userForm).subscribe(data => {
      this.user = data,
      this.cookieService.set('token', data.access_token)
      return this.user;
    })
  }

  async createOrganization(organizationForm: CreateOrganizationDto) {
    const url = '' + environment.appUrl + environment.apiVersionUri + '/register';

    const organization = this.http.post<RegisterOrganizationResponseDto>(url, organizationForm).subscribe(data => {
      return this.user;
    })
  }

  logout () {
    this.cookieService.delete('token');
    return this.router.navigate(['login']);
  }
}
