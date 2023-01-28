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

  registerForm: FormGroup = this.formBuilder.group({
    calle: ["", [Validators.required, Validators.maxLength(120)]],
    numero: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    ciudad: ["", [Validators.required, Validators.maxLength(120)]],
    provincia: ["", [Validators.required, Validators.maxLength(120)]],
    telefono: ["", [Validators.required, Validators.maxLength(120)]],
    nombre: ["", [Validators.required]],
    tipo: ["", [Validators.required]],
    descripcion: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
    email: ["", [Validators.required, Validators.email, Validators.maxLength(200)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    repeatPassword: ["", [Validators.required, Validators.minLength(8)]],
    fname: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
    lname: ["", [Validators.required,  Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
    dni: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
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
    this.registerForm.controls['tipo'].setValue("default", {onlySelf: true})
  }


  ngOnInit(): void {
    // this.http.get<string[]>(environment.tipoOrgUri).subscribe(data => {
    //   this.tipos = data;
    // })
  }

  async handleRegistry() {
    const registerForm = {
      calle: this.registerForm.controls["calle"].value,
      numero: this.registerForm.controls["numero"].value,
      ciudad: this.registerForm.controls["ciudad"].value,
      provincia: this.registerForm.controls["provincia"].value,
      telefono: this.registerForm.controls["telefono"].value,
      nombre: this.registerForm.controls["nombre"].value,
      tipo: this.registerForm.controls["tipo"].value,
      descripcion: this.registerForm.controls["descripcion"].value,
      fname: this.registerForm.controls["fname"].value,
      lname: this.registerForm.controls["lname"].value,
      dni: this.registerForm.controls["dni"].value,
      fechaNac: this.registerForm.controls["fechaNac"].value,
      email: this.registerForm.controls["email"].value,
      password: this.registerForm.controls["password"].value,
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
      fotoPerfil: '',
      domicilio: domicilio
    }

    const user = await this.auth.createUser(usuarioDto);
    const org = await this.auth.createOrganization(organizacionDto);
    if (user && org) {
      await this.auth.addOrganizationOwner(org.id, user.email);
      return this.router.navigate(["verify"]);
    } else return false
  }

  return () {
    if (this.section > 1)this.section --;
  }

  next () {
    if (this.section < 4)this.section ++;
  }


  isValid(field: string): boolean {
    return this.registerForm.controls[field].errors !== null &&
    (this.registerForm.controls[field].touched || this.registerForm.controls[field].dirty);
  }

  isValidRepeatPassword(): boolean {
    return this.registerForm.controls['password'].value != this.registerForm.controls['repeatPassword'].value &&
    (this.registerForm.controls['repeatPassword'].touched || this.registerForm.controls['repeatPassword'].dirty);
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
