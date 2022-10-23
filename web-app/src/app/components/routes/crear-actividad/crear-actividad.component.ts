import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Espacio } from 'src/app/interfaces/get.espacios.response.dto';
import { Frecuencia } from 'src/app/interfaces/get.tarifa.frecuencia.res.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {
  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    tipo: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    cupo: ["", [Validators.required]],
    espacio: ["", [Validators.required]],
    tarifas: this.formBuilder.array([{
      tarifa: ["", [Validators.required]],
      monto: ["", [Validators.required]],
      frecuencia: ["", [Validators.required]]
    }])
  });


  horariosForm: FormGroup = this.formBuilder.group({
    dia: ["", [Validators.required]],
    hora: ["", [Validators.required]],
    duracion: ["", [Validators.required]],
  })

  tipoActividad: TipoActividad[] = [];
  frecuencias: Frecuencia[] = [];
  espaciosOrganizacion: Espacio[] = [];
  load: boolean = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    const res = (await this.auth.getTipoActividad()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoActividad.push(element);
      })
      this.load = true;
    })

    const espacios = (await this.auth.getEspaciosOrganizacion()).subscribe(res => {
      res.data.forEach(element => {
        this.espaciosOrganizacion.push(element);
      })
      this.load = true;
    })

    const frecuencias = (await this.auth.getTarifaFrecuencias()).subscribe(res => {
      res.data.forEach(element => {
        this.frecuencias.push(element);
      })
      this.load = true;
    })
  }

  mySelect = [];
  selectedValue: any;
  selectChange() {
    this.selectedValue = this.auth.getTipoActividad();
  }

  handleForm() {

  }

  isValidActividad(field: string): boolean {
    return this.actividadForm.controls[field].errors !== null &&
    (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }

  // isValidTarifa(field: string): boolean {
  //   return this.tarifaForm.get(field)?.errors !== null &&
  //   Boolean(this.tarifaForm.get(field)?.touched);
  // }

  isValidHorario(field: string): boolean {
    return this.horariosForm.controls[field].errors !== null &&
    (this.horariosForm.controls[field].touched || this.horariosForm.controls[field].dirty);
  }

  get tarifas() {
    return this.actividadForm.controls["tarifas"] as FormArray;
  }

  addTarifa() {
    this.tarifas.push({

    })
    const tarifaForm = this.tarifas;

    this.tarifas.push(tarifaForm);
  }

  deleteTarifa(tarifaIndex: number) {
    this.tarifas.removeAt(tarifaIndex);
  }

  createActividad() {
    const registerForm = {
      nombre: this.actividadForm.controls["nombre"].value,
      tipo: this.actividadForm.controls["tipo"].value,
      descipcion: this.actividadForm.controls["descripcion"].value,
      cupo: this.actividadForm.controls["cupo"].value,
      espacio: this.actividadForm.controls["espacio"].value,
    }

    // this.auth.createActividad(registerForm);
  }

}

interface Tarifa {
  tarifa: string | null;
  monto: number | null;
}
