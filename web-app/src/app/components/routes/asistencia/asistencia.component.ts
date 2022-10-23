import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CreateActividadDto } from 'src/app/interfaces/create.actividad.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  modal: bootstrap.Modal | undefined;
  modalError = false;
  tipoActividad: TipoActividad[] = [];
  load = false;
  spinner = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


  async ngOnInit(): Promise<void> {
    const res = (await this.auth.getTipoActividad()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoActividad.push(element);
      })
      this.load = true;
    })
  }

  openModal() {
    this.modal = new bootstrap.Modal(document.getElementById("modalForm") || "", {
      keyboard: false
    });
    this.modal.show();
  }


  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    idTipoActividad: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    cupo: ["", [Validators.required]],
  });


  selectedValue: any;
  selectChange() {
    this.selectedValue = this.auth.getTipoActividad();
  }

  handleForm() {
    this.spinner = true;
    const form = this.actividadForm.value;

    const req: CreateActividadDto = {
      ...form,
      imgUrl: "",
      idOrganizacion: this.auth.getOrgId(),
    }

    const res = this.auth.createActividad(req);
    res.
      then( result => {
        this.spinner = false
      })
      .catch(e => {
        this.modalError = true;
      });
  }

  isValidActividad(field: string): boolean {
    return this.actividadForm.controls[field].errors !== null &&
      (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }
}
