import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Personal, Rol } from 'src/app/interfaces/listPersonalOrganizacion.dto';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {
  @Component({
    selector: 'app-socios',
    templateUrl: './socios.component.html',
    styleUrls: ['./socios.component.css'],
  })
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  trashIcon = faTrash;
  editIcon = faUserEdit;
  spinner = false;

  personal: Personal[] = [];
  personalFiltered: Personal[] = [];

  modal: bootstrap.Modal | undefined;
  modalError = false;
  errorTurnos = false;
  search: string = "";
  searchUser: string = "";
  orgId: string = "";
  socios: Inscripto[] = [];
  sociosFiltered: Inscripto[] = [];
  actividades: Actividad[] = [];
  roles: Rol[] = [];
  turnos: Turno[] = [];

  empleadoForm: FormGroup = this.formBuilder.group({
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
    rol: ["", [Validators.required]],
  });


  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


  async ngOnInit(): Promise<void> {
    this.getPersonal();
    this.getRoles();
  }

  async getPersonal() {
    return await (await this.auth.getPersonalOrganizacion()).subscribe( result => {
      this.personal = result.data;
      this.personalFiltered = this.personal;
      this.orgId = result.data[0].organizacion.id;
    });
  }

  async getActividadOrganizacion() {
    const actividades = this.auth.getActividadesOrganizacion();
    (await actividades).subscribe(result => {
      this.actividades = result.data;
    })
  }

  async getRoles() {
    const roles = this.auth.getRoles();
    (await roles).subscribe(result => {
      this.roles = result.data;
    })
  }

  filterSearch() {
    const result = this.personal.filter(personal => {
      return personal.personal?.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
        || personal.personal.apellido.toLowerCase().search(this.search.toLowerCase()) !== -1
        || personal.personal.email.toLowerCase().search(this.search.toLowerCase()) !== -1
        || personal.rol?.nombre.toString().search(this.search.toLowerCase()) !== -1
        ;
    });

    this.personalFiltered = result;


    return "";
  }


  parseTurno(turno: Turno): string[] {
    return turno.horarios.map(horario => {
      return `${horario.horario.diaSemana}: de ${horario.horario.horaInicio}:${horario.horario.minutosInicio > 9 ? horario.horario.minutosInicio : '0' + horario.horario.minutosInicio} a ${Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60)}:${((horario.horario.minutosInicio + horario.horario.duracion) % 60) > 9 ? (horario.horario.minutosInicio + horario.horario.duracion) % 60 : '0' + (horario.horario.minutosInicio + horario.horario.duracion) % 60}`
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
    const user = await this.auth.addUser({
      email: this.empleadoForm.value['email'],
      password: this.empleadoForm.value['email'],
      nombre: this.empleadoForm.value['nombre'],
      apellido: this.empleadoForm.value['apellido'],
      dni: +this.empleadoForm.value['dni'],
      telefono: this.empleadoForm.value['telefono'],
      fechaNacimiento: this.empleadoForm.value['fechaNac'],
      domicilio: {
        calle: this.empleadoForm.value['calle'],
        numero: this.empleadoForm.value['numero'],
        ciudad: this.empleadoForm.value['ciudad'],
        provincia: this.empleadoForm.value['provincia']
      },
    });

    const rol = this.empleadoForm.value['rol']

    await this.auth.addOrganizationEmployee(this.orgId, user.email, rol);
    this.getPersonal()
    this.closeModal('modalAgregarUsuario');

  }

  buscarSocio() {
    if (this.empleadoForm.controls['email'].errors) {
      return null;
    }
    this.auth.getUser()
    return null;
  }

  isValid(control: string) {
    return false;
  }
}
