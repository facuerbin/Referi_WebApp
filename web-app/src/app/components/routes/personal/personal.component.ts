import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faPencilAlt, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Personal, Rol } from 'src/app/interfaces/listPersonalOrganizacion.dto';
import { isValidDate } from 'src/app/helpers/date.validator';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})

export class PersonalComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  trashIcon = faTrash;
  pencil = faPencilAlt;
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
  editPersonalId:string = "";

  empleadoForm: FormGroup = this.formBuilder.group({
    email: new FormControl(["", [Validators.required, Validators.email, Validators.maxLength(200)]]),
    nombre: new FormControl(["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)]),
    apellido: new FormControl(["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)]),
    dni: new FormControl(["", [Validators.required, Validators.maxLength(10), Validators.minLength(8), Validators.pattern('^[0-9]*$')]]),
    fechaNac: new FormControl(["", [Validators.required, isValidDate]]),
    telefono: new FormControl(["", [Validators.required, Validators.maxLength(15)]]),
    calle: new FormControl(["", [Validators.required, Validators.maxLength(120)]]),
    numero: new FormControl(["", [Validators.required, Validators.pattern('^[0-9]*$')]]),
    ciudad: new FormControl(["", [Validators.required, Validators.maxLength(120)]]),
    provincia: new FormControl(["", [Validators.required, Validators.maxLength(120)]]),
    rol: new FormControl(["", [Validators.required, Validators.minLength(1)]]),
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
      this.roles = result.data.filter(rol => rol.nombre != "PROPIETARIO");
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

  async deletePersonal(idPersonal: string) {
    await this.auth.bajaPersonal(idPersonal);
    this.getPersonal();
  }


  parseTurno(turno: Turno): string[] {
    return turno.horarios.map(horario => {
      return `${horario.horario.diaSemana}: de ${horario.horario.horaInicio}:${horario.horario.minutosInicio > 9 ? horario.horario.minutosInicio : '0' + horario.horario.minutosInicio} a ${Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60)}:${((horario.horario.minutosInicio + horario.horario.duracion) % 60) > 9 ? (horario.horario.minutosInicio + horario.horario.duracion) % 60 : '0' + (horario.horario.minutosInicio + horario.horario.duracion) % 60}`
    });
  }

  openModal(id: string, personalId?: string) {
    this.modal = new Modal(document.getElementById(id) || "", {
      keyboard: false
    });
    this.empleadoForm.reset();
    this.modal.show();
    this.editPersonalId = '' + personalId;
  }

  closeModal(id: string) {
    this.modal?.hide();
  }

  async handleForm() {
    const rol = this.empleadoForm.value['rol']
    this.auth.addUser({
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
    }).then(async user => {
      await this.auth.addOrganizationEmployee(this.orgId, user.email , rol);
      this.getPersonal()
      this.closeModal('modalAgregarUsuario');
    }).catch(async e => {
      await this.auth.addOrganizationEmployee(this.orgId, this.empleadoForm.value['email'] , rol);
      this.getPersonal()
      this.closeModal('modalAgregarUsuario');
    });
  }

  async handleEditForm() {
    const rol = this.empleadoForm.value['rol'];
    await this.auth.editPersonal(this.editPersonalId, rol);
    this.getPersonal();
  }

  buscarSocio() {
    if (this.empleadoForm.controls['email'].errors) {
      return null;
    }
    this.auth.getUser()
    return null;
  }

  isValid(field: string): boolean {
    return this.empleadoForm.controls[field].errors !== null &&
      (this.empleadoForm.controls[field].touched || this.empleadoForm.controls[field].dirty);
  }
}
