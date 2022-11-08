import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faIdCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  trashIcon = faTrash;
  editIcon = faUserEdit;
  spinner = false;

  modal: bootstrap.Modal | undefined;
  modalError = false;
  errorTurnos = false;
  search: string = "";
  searchUser: string = "";
  socios: Inscripto[] = [];
  sociosFiltered: Inscripto[] = [];
  actividades: Actividad[] = [];
  turnos: Turno[] = [];

  sociosForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    dni: ["", [Validators.required]],
    fechaNac: ["", [Validators.required]],
    telefono: ["", [Validators.required]],
    calle: ["", [Validators.required]],
    numero: ["", [Validators.required]],
    ciudad: ["", [Validators.required]],
    provincia: ["", [Validators.required]],
    idActividad: ["", [Validators.required]],
    idTurnoActividad: ["", [Validators.required]],
  });


  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


  async ngOnInit(): Promise<void> {
    this.getSocios();
    this.getActividadOrganizacion();
  }

  async getSocios () {
    return (await this.auth.getSociosByOrg()).subscribe(result => {
      this.socios = result.data;
      this.sociosFiltered = this.socios;
    })
  }

  async getActividadOrganizacion () {
    const actividades = this.auth.getActividadesOrganizacion();
    (await actividades).subscribe( result =>{
      this.actividades = result.data;
    })
  }

  filterSearch() {
    const result = this.socios.filter(socio => {
      return socio.usuario.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.apellido.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.email.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.estados[0].nombre?.toString().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.sociosFiltered = result;


    return "";
  }


  async onChange(deviceValue: any) {
    if (deviceValue.value) {
      (await this.auth.getActividadById(deviceValue.value)).subscribe(result => {
        this.turnos = result.turnos;
        this.errorTurnos = this.turnos.length == 0;
      });
    }
  }

  parseTurno(turno: Turno): string[] {
    return turno.horarios.map(horario => {
      return `${horario.horario.diaSemana}: de ${horario.horario.horaInicio}:${horario.horario.minutosInicio>9  ? horario.horario.minutosInicio: '0'+horario.horario.minutosInicio} a ${Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60)}:${(horario.horario.minutosInicio + horario.horario.duracion % 60) >9  ? horario.horario.minutosInicio + horario.horario.duracion % 60: '0'+horario.horario.minutosInicio + horario.horario.duracion % 60}`
    });
  }

  openModal(id: string) {
    this.modal = new Modal(document.getElementById(id) || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal(id: string) {
    this.modal?.hide();
  }

  async handleForm() {
    const result = await this.auth.registerNewSocio({
      email: this.sociosForm.value['email'],
      nombre: this.sociosForm.value['nombre'],
      apellido: this.sociosForm.value['apellido'],
      dni: +this.sociosForm.value['dni'],
      telefono: this.sociosForm.value['telefono'],
      fechaNacimiento: this.sociosForm.value['fechaNac'],
      domicilio: {
        calle: this.sociosForm.value['calle'],
        numero: this.sociosForm.value['numero'],
        ciudad: this.sociosForm.value['ciudad'],
        provincia: this.sociosForm.value['provincia']
      },
      idTurnoActividad: this.sociosForm.value['idTurnoActividad'],
    });
    this.getSocios();
    this.closeModal('modalAgregarUsuario');

  }

  buscarSocio() {
    if (this.sociosForm.controls['email'].errors) {
      return null;
    }
    this.auth.getUser()
    return null;
  }

  isValid(control: string) {
    return false;
  }
}
