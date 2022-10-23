import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetActividadDetail } from 'src/app/interfaces/get.detail.actividad.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {
  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    idTipoActividad: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    cupo: ["", [Validators.required]],
  });
  actividadId: string = "";
  actividad: GetActividadDetail | null = null;
  load = false;
  tipoActividad: TipoActividad[] = [];
  fechaCreacion = "";

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.actividadId = params['id'];

      (await this.auth.getActividadById(this.actividadId)).subscribe( result => {
        this.actividad = {...result};
        this.fechaCreacion = ("" + this.actividad.fechaCreacion).slice(0,10);
      });
  });

  this.getTipoActividad();
  }

  async getTipoActividad () {
    return (await this.auth.getTipoActividad()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoActividad.push(element);
      })
      this.load = true;
    })
  }

  handleForm() {

  }

  isValid(field: string): boolean {
    return false;
    return this.actividadForm.controls[field].errors !== null &&
    (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }
}
