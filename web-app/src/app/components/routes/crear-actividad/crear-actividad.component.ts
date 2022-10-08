import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {
  actividadForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleForm() {

  }

  isValid(field: string): boolean {
    return this.actividadForm.controls[field].errors !== null &&
    (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }

}
