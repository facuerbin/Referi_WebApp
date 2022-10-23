import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscribir-socio',
  templateUrl: './inscribir-socio.component.html',
  styleUrls: ['./inscribir-socio.component.css']
})
export class InscribirSocioComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    dni: ["", [Validators.required]],
    fechaNac: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  isValid(control: string) {

  }
}
