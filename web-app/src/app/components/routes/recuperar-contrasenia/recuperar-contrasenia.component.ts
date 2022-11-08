import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrls: ['./recuperar-contrasenia.component.css']
})
export class RecuperarContraseniaComponent implements OnInit {
  spinner: any;
  recoverForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
  });
  load: any;
  emailStatus: boolean = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  async handleForm() {
    const response = await this.auth.recoverPassword(this.recoverForm.value['email']);
    if (response.status == 200) {
      this.emailStatus = true;
    }
  }


  ngOnInit(): void {
  }

  isValid(field: string): boolean {
    return this.recoverForm.controls[field].errors !== null &&
    (this.recoverForm.controls[field].touched || this.recoverForm.controls[field].dirty);
  }
}
