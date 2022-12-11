import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificacionForm: FormGroup = this.formBuilder.group({
    destinatario: ["", [Validators.required]],
    asunto: ["", [Validators.required, Validators.minLength(4)]],
    mensaje: ["", [Validators.required, Validators.minLength(10)]],

  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleForm() {

  }

  isValid(field: string): boolean {
    return this.notificacionForm.controls[field].errors !== null &&
    (this.notificacionForm.controls[field].touched || this.notificacionForm.controls[field].dirty);
  }
}
