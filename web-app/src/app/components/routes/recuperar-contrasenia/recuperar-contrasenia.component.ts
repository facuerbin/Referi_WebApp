import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {
  spinner: any;
  isValid(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  recoverForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
  });
  load: any;
  handleForm() {
    throw new Error('Method not implemented.');
  }
  closeModal() {
    throw new Error('Method not implemented.');
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
