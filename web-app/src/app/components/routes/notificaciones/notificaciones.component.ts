import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { HorarioElement, Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
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



  actividadSelect: boolean = false;
  selectedActividadId: string = "";
  turnoSelect: boolean = false;
  socioSelect: boolean = false;
  notificationSuccess: boolean = false;
  notificationError: boolean = false;




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
    const orgId = await this.auth.getOrgId();
    console.log(this.notificacionForm.controls['socio'])
    const dto = {
      idRemitente: orgId,
      tipoDestinatario: this.notificacionForm.controls['tipoDestinatario'].value,
      idDestinatario: this.notificacionForm.controls['turno'].value || this.notificacionForm.controls['socio'].value,
      titulo: this.notificacionForm.controls['asunto'].value,
      cuerpo: this.notificacionForm.controls['mensaje'].value,
      tipoRemitente: 'Organizacion'
    }

    const response = await this.auth.sendNotification(dto);

    if (response) this.notificationSuccess = true;
    else this.notificationError = true;

    setTimeout(() => {
      return window.location.reload();
    }, 2000);
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

    if (deviceValue.value && deviceValue.value.includes('Actividad')) {
      this.getActividades();
      this.actividadSelect = true;
    }

    if (deviceValue.value && deviceValue.value.includes('Turno')) {
      this.getActividades();
      this.actividadSelect = true;
      this.turnoSelect = true;
    }

    if (deviceValue.value && deviceValue.value == 'Socio') {
      this.getSocios();
      this.socioSelect = true;
    }
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
