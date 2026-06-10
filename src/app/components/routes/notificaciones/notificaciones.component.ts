import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { HorarioElement, Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificacionForm: FormGroup = this.formBuilder.group({
    tipoDestinatario: ["", [Validators.required]],
    actividad: ["", []],
    turno: ["", []],
    socio: ["", []],
    asunto: ["", [Validators.required, Validators.minLength(4)]],
    mensaje: ["", [Validators.required, Validators.minLength(10)]],
  });

  actividades: Actividad[] = [];
  turnos: Turno[] = [];
  socios: Inscripto[] = [];

  @ViewChild('confirmationModal') confirmationModal: any;
  modal: bootstrap.Modal | undefined;

  actividadSelect: boolean = false;
  selectedActividadId: string = "";
  turnoSelect: boolean = false;
  socioSelect: boolean = false;
  notificationSuccess: boolean = false;
  notificationError: boolean = false;
  spinner: boolean = false;




  tipoDestinatarios = [
    'Deudores',
    'Socios',
    'Inscriptos a Actividad',
    'Inscriptos a un Turno',
    'Socio',
  ]
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async handleForm() {
    this.spinner = true;
    const orgId = await this.auth.getOrgId();
    const tipoDestinatario = this.notificacionForm.controls['tipoDestinatario'].value;

    let idDestinatario = '';
    if (tipoDestinatario === 'Inscriptos a Actividad') {
      idDestinatario = this.notificacionForm.controls['actividad'].value;
    } else if (tipoDestinatario === 'Inscriptos a un Turno') {
      idDestinatario = this.notificacionForm.controls['turno'].value;
    } else if (tipoDestinatario === 'Socio') {
      idDestinatario = this.notificacionForm.controls['socio'].value;
    }

    const dto = {
      idRemitente: orgId,
      tipoDestinatario: tipoDestinatario,
      idDestinatario: idDestinatario,
      titulo: this.notificacionForm.controls['asunto'].value,
      cuerpo: this.notificacionForm.controls['mensaje'].value,
      tipoRemitente: 'Organizacion'
    }

    const response = await this.auth.sendNotification(dto);

    this.spinner = false;
    if (response) {
      this.openModal();
    }
  }

  openModal() {
    this.modal = new Modal(document.getElementById("confirmationModal") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal() {
    this.modal?.hide();
    window.location.reload();
  }

  async getActividades() {
    (await this.auth.getActividadesOrganizacion()).subscribe(result => {
      this.actividades = result.data;
    })
  }

  async getActividadTurnos(actividadId: string) {
    const actividad = this.actividades.find(actividad => {
      return actividad.id == actividadId;
    });
    if (!actividad) return [];
    return actividad.turnos;
  }

  async getSocios() {
    (await this.auth.getSociosByOrg()).subscribe( inscriptos => {
      const uniqueInscriptos: Inscripto[] = [];
      inscriptos.data.forEach( inscripto => {
        const found = uniqueInscriptos.find( uniqueInscr => {
          return uniqueInscr.usuario.email == inscripto.usuario.email;
        });

        if (!found) uniqueInscriptos.push(inscripto);
      });
      this.socios = uniqueInscriptos;
    });
  }


  isValid(field: string): boolean {
    return this.notificacionForm.controls[field].errors !== null &&
    (this.notificacionForm.controls[field].touched || this.notificacionForm.controls[field].dirty);
  }

  async onChange(deviceValue: any) {
    this.actividadSelect = false;
    this.turnoSelect = false;
    this.socioSelect = false;

    // Reset conditionally required fields with empty string to show placeholders
    this.notificacionForm.controls['actividad'].clearAsyncValidators();
    this.notificacionForm.controls['turno'].clearAsyncValidators();
    this.notificacionForm.controls['socio'].clearAsyncValidators();
    this.notificacionForm.controls['actividad'].reset({ value: '', disabled: false });
    this.notificacionForm.controls['turno'].reset({ value: '', disabled: false });
    this.notificacionForm.controls['socio'].reset({ value: '', disabled: false });

    if (deviceValue.value === 'Inscriptos a Actividad') {
      this.getActividades();
      this.actividadSelect = true;
      this.notificacionForm.controls['actividad'].setValidators([Validators.required]);
    } else if (deviceValue.value === 'Inscriptos a un Turno') {
      this.getActividades();
      this.actividadSelect = true;
      this.turnoSelect = true;
      this.notificacionForm.controls['actividad'].setValidators([Validators.required]);
      this.notificacionForm.controls['turno'].setValidators([Validators.required]);
    } else if (deviceValue.value === 'Socio') {
      this.getSocios();
      this.socioSelect = true;
      this.notificacionForm.controls['socio'].setValidators([Validators.required]);
    }

    this.notificacionForm.controls['actividad'].updateValueAndValidity();
    this.notificacionForm.controls['turno'].updateValueAndValidity();
    this.notificacionForm.controls['socio'].updateValueAndValidity();
  }

  async onChangeActividad(select: any) {
    this.selectedActividadId = select.value;
    this.turnos = await this.getActividadTurnos(this.selectedActividadId);
  }

  async onChangeTurno(select: any) {

  }

  onChangeSocio (select: any) {

  }

  parseHorarios(horario: HorarioElement) {
    const dia = horario.horario.diaSemana;
    const horaIni = (horario.horario.horaInicio > 9)? horario.horario.horaInicio: '0' + horario.horario.horaInicio;
    const minutosIni = (horario.horario.minutosInicio > 9)? horario.horario.minutosInicio: '0' + horario.horario.minutosInicio;
    const duracion = horario.horario.duracion;
    const horaFin = (horario.horario.horaInicio + Math.floor(duracion / 60)) ?
                      (horario.horario.horaInicio + Math.floor(duracion / 60)) :
                      '0' + (horario.horario.horaInicio + Math.floor(duracion / 60));
    const minutosFin = ((horario.horario.minutosInicio + duracion) % 60) ?
                      ((horario.horario.minutosInicio + duracion) % 60) :
                      '0' + ((horario.horario.minutosInicio + duracion) % 60);
    return `${dia} de ${horaIni}:${minutosIni} a ${horaFin}:${minutosFin}`;
  }
}
