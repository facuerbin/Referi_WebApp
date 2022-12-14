import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { FileUpload } from 'src/app/interfaces/file.upload.response.dto';
import { HorarioElement } from '../interfaces/get.detail.actividad.dto';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
    constructor() { }

    // Parses a string date into dd/mm/aaaa
    parseDate(date: string) {
      const anio = date.slice(0,4);
      const mes = date.slice(5,7);
      const dia = date.slice(8,10);
      return `${dia}/${mes}/${anio}`;
    }

    formatHorarios(horario: HorarioElement) {
      console.log(horario)
      return horario.horario.diaSemana +
        " de " +
        horario.horario.horaInicio +
        ":" +
        (horario.horario.minutosInicio > 9 ? horario.horario.minutosInicio : '0' + horario.horario.minutosInicio) +
        " a " +
        Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60) +
        ":" +
        ((horario.horario.minutosInicio + horario.horario.duracion % 60) > 9 ? (horario.horario.minutosInicio + horario.horario.duracion % 60) : '0' + (horario.horario.minutosInicio + horario.horario.duracion % 60))
    }
  }
