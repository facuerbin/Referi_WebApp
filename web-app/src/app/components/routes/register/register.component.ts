import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CreateOrganizationDto } from 'src/app/interfaces/create.organization.dto';
import { CreateUserDto } from 'src/app/interfaces/create.user.dto';
import { Domicilio } from 'src/app/interfaces/domicilio';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('repeatPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

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
    repeatPassword: ["", [Validators.required, Validators.minLength(8)]],
    fname: ["", [Validators.required, Validators.minLength(2)]],
    lname: ["", [Validators.required, Validators.minLength(2)]],
    dni: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
    fechaNac: ["", [Validators.required]]
  }, {validators: this.checkPasswords});

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
    const registerForm = {
      calle: this.loginForm.controls["calle"].value,
      numero: this.loginForm.controls["numero"].value,
      ciudad: this.loginForm.controls["ciudad"].value,
      provincia: this.loginForm.controls["provincia"].value,
      telefono: this.loginForm.controls["telefono"].value,
      nombre: this.loginForm.controls["nombre"].value,
      tipo: this.loginForm.controls["tipo"].value,
      descripcion: this.loginForm.controls["descripcion"].value,
      fname: this.loginForm.controls["fname"].value,
      lname: this.loginForm.controls["lname"].value,
      dni: this.loginForm.controls["dni"].value,
      fechaNac: this.loginForm.controls["fechaNac"].value,
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value,
    }

    const domicilio: Domicilio = {
      calle: registerForm.calle,
      numero: registerForm.numero,
      ciudad: registerForm.ciudad,
      provincia: registerForm.provincia
    }

    const organizacionDto: CreateOrganizationDto = {
      nombre: registerForm.nombre,
      direccion: domicilio,
      tipoOrganizacion: registerForm.tipo,
      logo: '/default',
      descripcion: registerForm.descripcion,
      telefono: registerForm.telefono,
      email: registerForm.email
    };

    const usuarioDto: CreateUserDto = {
      email: registerForm.email,
      password: registerForm.password,
      nombre: registerForm.fname,
      apellido: registerForm.lname,
      dni: registerForm.dni,
      telefono: registerForm.telefono,
      fechaNacimiento: registerForm.fechaNac,
      fotoPerfil: '/default',
      domicilio: domicilio
    }

    const user = await this.auth.createUser(usuarioDto);
    const org = await this.auth.createOrganization(organizacionDto);
    if (user && org) return this.router.navigate(["verify"]);
    else return false
  }

  return () {
    if (this.section > 1)this.section --;
  }

  next () {
    if (this.section < 4)this.section ++;
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
