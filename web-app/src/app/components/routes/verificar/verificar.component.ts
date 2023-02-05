import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { of } from 'rxjs';
import { GetUserResponseDto } from 'src/app/interfaces/get.user.response.dto';
import { User } from 'src/app/interfaces/user';
import { VerifyEmailDto } from 'src/app/interfaces/verify.email.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.css']
})
export class VerificarComponent implements OnInit {
  verificationForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email, Validators.maxLength(200)]],
    codigo: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]],
  });

  user: GetUserResponseDto | null = null;
  email: string = "";
  showError = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    const res = of(this.auth.getUser()).subscribe( res =>{
      res.then( res => {
        this.user = res.data;
        this.email = this.user?.data.email ? this.user?.data.email: "";
      });
    })
  }

  async handleVerification() {
    const form: VerifyEmailDto = {
      email: this.verificationForm.controls['email'].value,
      code: parseInt(this.verificationForm.controls['codigo'].value),
    }
    const result = await this.auth.verifyEmail({email: this.email, code: form.code});
    if (!result) this.showError = true;
  }

  isValid(field: string): boolean {
    return this.verificationForm.controls[field].errors !== null &&
    (this.verificationForm.controls[field].touched || this.verificationForm.controls[field].dirty);
  }

  getEmail() {
    const token = this.auth.getDecodedAccessToken();
    if (! token) throw new Error("No access token found.");

    const uid = token.sub;
    return uid;
  }

}
