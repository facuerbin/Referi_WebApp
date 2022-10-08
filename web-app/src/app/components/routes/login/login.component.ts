import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });

  eye = faEye;
  eyeSlash = faEyeSlash;
  passwordIsVisible = false;

  constructor(private formBuilder: FormBuilder,  private router: Router, private auth: AuthService) { }


  ngOnInit(): void {
  }

  async handleLogin() {
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    const user = await this.auth.processLogin(email, password);
    // return await this.auth.isLoggedIn()
  }


  isValid(field: string): boolean {
    return this.loginForm.controls[field].errors !== null &&
    (this.loginForm.controls[field].touched || this.loginForm.controls[field].dirty);
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    return this.passwordIsVisible = !this.passwordIsVisible;
  }

}
