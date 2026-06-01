import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email, Validators.maxLength(200)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  eye = faEye;
  eyeSlash = faEyeSlash;
  passwordIsVisible = false;
  loginFailed = false;
  modal: Modal | undefined;
  load = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


  ngOnInit(): void {
    this.load = true;
  }

  async handleLogin() {
    const email = this.loginForm.controls["email"].value;
    const password = this.loginForm.controls["password"].value;
    const login = await this.auth.processLogin(email, password);
    login.subscribe(
      {
        next: async data => {
          await this.auth.loginSucces(data);
          return true;
        },
        error: error => {
          this.loginFailed = true;
          return false;
        }
      })
  }

  isValid(field: string): boolean {
    return this.loginForm.controls[field].errors !== null &&
    (this.loginForm.controls[field].touched || this.loginForm.controls[field].dirty);
  }

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    return this.passwordIsVisible = !this.passwordIsVisible;
  }

  openModal(id: string) {
    this.modal = new Modal(document.getElementById(id) || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal(id: string) {
    this.modal?.hide();
  }

}
