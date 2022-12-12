import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
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

  bajaForm: FormGroup = this.formBuilder.group({
    idInscripcion: ["", [Validators.required]],
  })

  modal: bootstrap.Modal | undefined;
  load = false;
  bajaSucces = false;
  bajaError = false;
  spinner = false;



  constructor(private route: ActivatedRoute, private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.userId = params['id'];

      (await this.auth.getUserById(this.userId)).subscribe(result => {
        this.user = result.data;
        this.profileImg = environment.appUrl + environment.apiVersionUri + "/" + this.user.fotoPerfil;
        const birthday = new Date(this.user.fechaNacimiento);
        this.birthDate = birthday.getDate() + "/" + birthday.getMonth() + "/" + birthday.getFullYear();
      });

      (await this.auth.getInscripcionesByUserId(this.userId)).subscribe(result => {
        this.inscripciones = result.data;
      })
      this.load = true;
    });
  }


  formatHorarios(horario: HorarioElement) {
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

  getImageUrl(imgUrl: string) {
    return environment.appUrl +
      environment.apiVersionUri +
      (imgUrl ? "/" + imgUrl : "/uploads/profile.jpeg");
  }

  openModal() {
    this.modal = new Modal(document.getElementById("modalBaja") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal() {
    this.modal = new Modal(document.getElementById("modalBaja") || "", {
      keyboard: false
    });
    this.bajaForm.reset();
    this.modal.hide();
  }

  async handleForm() {
    const id = this.bajaForm.value['idInscripcion']
    if (! id) return this.bajaError = true;
    const response = await this.auth.bajaSocio(id);
    if (!response) return this.bajaError = true;
    this.bajaSucces = true;
    setTimeout(() => window.location.reload(), 3000);
    return true;
  }

  isValid(field: string): boolean {
    return this.bajaForm.controls[field].errors !== null &&
      (this.bajaForm.controls[field].touched || this.bajaForm.controls[field].dirty);
  }

}
