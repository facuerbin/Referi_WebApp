import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    calle: ["", [Validators.required]],
    numero: ["", [Validators.required]],
    ciudad: ["", [Validators.required]],
    provincia: ["", [Validators.required]],
    telefono: ["", [Validators.required]],
    nombre: ["", [Validators.required]],
    tipo: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(8)]]
  });

  eye = faEye;
  eyeSlash = faEyeSlash;
  passwordIsVisible = false;
  repeatPasswordIsVisible = false;
  tipos: string[] = [
    "Gimnasio",
    "Club",
    "Instituto de Danza",
    "Otro"
  ];
  section = 1;

  constructor(private formBuilder: FormBuilder,private changeDetector: ChangeDetectorRef,  private router: Router, private auth: AuthService, private http: HttpClient) {
    this.loginForm.controls['tipo'].setValue("default", {onlySelf: true})
  }


  ngOnInit(): void {
    // this.http.get<string[]>(environment.tipoOrgUri).subscribe(data => {
    //   this.tipos = data;
    // })
  }

  async handleRegistry() {
    // console.log(this.loginForm)
    const registerForm = {
      calle: this.loginForm.controls["calle"].value,
      numero: this.loginForm.controls["numero"].value,
      ciudad: this.loginForm.controls["ciudad"].value,
      provincia: this.loginForm.controls["provincia"].value,
      telefono: this.loginForm.controls["telefono"].value,
      nombre: this.loginForm.controls["nombre"].value,
      tipo: this.loginForm.controls["apellido"].value,
      descripcion: this.loginForm.controls["descripcion"].value,
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value,
    }

    console.log(registerForm);
    // const user = await this.auth.;
    // return await this.auth.isLoggedIn()
  }

  return () {
    if (this.section > 1)this.section --;
    console.log(this.section)
  }

  next () {
    if (this.section < 3)this.section ++;
  }


  isValid(field: string): boolean {
    return this.loginForm.controls[field].errors !== null &&
    (this.loginForm.controls[field].touched || this.loginForm.controls[field].dirty);
  }

  togglePassword(event: MouseEvent, field: number) {
    event.preventDefault();
    if (field === 1) {
      return this.passwordIsVisible = !this.passwordIsVisible;
    } else {
      return this.repeatPasswordIsVisible = !this.repeatPasswordIsVisible;
    }
  }

}
