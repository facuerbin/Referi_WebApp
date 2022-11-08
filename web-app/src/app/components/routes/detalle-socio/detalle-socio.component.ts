import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horario } from 'src/app/interfaces/create.turno.dto';
import { HorarioElement, Inscripcion } from 'src/app/interfaces/get.inscripciones.user.dto';
import { User } from 'src/app/interfaces/get.user.response.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalle-socio.component.html',
  styleUrls: ['./detalle-socio.component.css']
})
export class DetalleSocioComponent implements OnInit {
  userId: string = "";
  user: User | null = null;
  profileImg: string = environment.appUrl + environment.apiVersionUri + "/uploads/profile.jpeg";
  birthDate: string = "";
  inscripciones: Inscripcion[] = [];


  constructor( private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.userId = params['id'];

      (await this.auth.getUserById(this.userId)).subscribe( result => {
        this.user = result.data;
        this.profileImg = environment.appUrl + environment.apiVersionUri + "/" + this.user.fotoPerfil;
        const birthday = new Date(this.user.fechaNacimiento);
        this.birthDate = birthday.getDate() + "/" + birthday.getMonth() + "/" + birthday.getFullYear();
      });

      (await this.auth.getInscripcionesByUserId(this.userId)).subscribe(result => {
        this.inscripciones = result.data;
      })
    });
  }


  formatHorarios(horario: HorarioElement) {
    return horario.horario.diaSemana +
    " de " +
    horario.horario.horaInicio +
    ":" +
    (horario.horario.minutosInicio > 9 ? horario.horario.minutosInicio: '0' + horario.horario.minutosInicio) +
    " a " +
    Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60) +
    ":" +
    ((horario.horario.minutosInicio + horario.horario.duracion % 60) > 9 ? (horario.horario.minutosInicio + horario.horario.duracion % 60): '0' + (horario.horario.minutosInicio + horario.horario.duracion % 60))
  }

  getImageUrl(imgUrl: string) {
    return environment.appUrl +
    environment.apiVersionUri +
    (imgUrl ? "/" + imgUrl: "/uploads/profile.jpeg");
  }

}
