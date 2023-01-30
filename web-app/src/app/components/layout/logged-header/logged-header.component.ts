import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBars, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Modal } from 'bootstrap';
import { from } from 'rxjs';
import { GetUserResponseDto } from 'src/app/interfaces/get.user.response.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<any>();
  bar = faBars;
  eye = faEye;
  eyeSlash = faEyeSlash;
  passwordVisible = {
    old: false,
    new: false,
    confirm: false
  }
  profileButton = false;
  dropDown: Dropdown | undefined;
  profileImg = environment.appUrl + environment.apiVersionUri + "/uploads/profile.jpeg";
  user: GetUserResponseDto | null = null;
  rol: string = "";
  modal: bootstrap.Modal | undefined;
  changePasswordSucces = false;
  changePasswordFail = false;

  contraseniaForm: FormGroup = this.formBuilder.group({
    oldPassword: ["", [Validators.required, Validators.minLength(8)]],
    newPassword: ["", [Validators.required, Validators.minLength(8)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
  });

  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) {
  }

  async ngOnInit() {
    const obs = from(this.auth.getUser());
    obs.subscribe(result => {
      if (result.data.data.fotoPerfil) this.profileImg = environment.appUrl + environment.apiVersionUri + '/' + result.data.data.fotoPerfil;
      this.user = result.data;
    });

    const rol = (await this.auth.listEmployeeOrganizations()).subscribe(result => {
      this.rol = result.data[0].rol.nombre;
    });

  }

  toggleButton() {
    this.sidebarToggle.emit('');
  }

  toggleProfile(id: string) {
    this.dropDown = new Dropdown(document.getElementById(id) || "");
    this.profileButton = !this.profileButton;
    if (this.profileButton) {
      this.dropDown?.show();
    } else {
      this.dropDown?.hide();
    }
  }

  logout() {
    this.auth.logout();
  }

  openModal(id: string) {
    this.modal = new Modal(document.getElementById(id) || "", {
      keyboard: false,
    });
    this.contraseniaForm.reset();
    this.modal.show();
  }

  closeModal(id: string) {
    this.modal?.hide();
  }

  async handleForm() {
    const dto = {
      oldPassword: this.contraseniaForm.controls["oldPassword"].value,
      newPassword: this.contraseniaForm.controls["newPassword"].value,
    }

    if (dto.oldPassword == dto.newPassword) return this.changePasswordFail = true;

    try {
      const result = await this.auth.changePassword(dto.oldPassword, dto.newPassword);
      if (result.data == "Password updated") {
        this.contraseniaForm.reset();
        this.changePasswordFail = false;
        return this.changePasswordSucces = true;
      }
    } catch (error) {
      this.changePasswordSucces = false;
      return this.changePasswordFail = true;
    }
    return ""
  }

  isValid(control: string) {
    return this.contraseniaForm.controls[control].errors !== null &&
      (this.contraseniaForm.controls[control].touched || this.contraseniaForm.controls[control].dirty);
  }

  isValidRepeatPassword(): boolean {
    return this.contraseniaForm.controls['newPassword'].value != this.contraseniaForm.controls['confirmPassword'].value &&
    (this.contraseniaForm.controls['confirmPassword'].touched || this.contraseniaForm.controls['confirmPassword'].dirty);
  }

  togglePassword(event: Event, field: string) {
    event.preventDefault();
    this.modal?.show()
    switch (field) {
      case 'old':
        return this.passwordVisible.old = !this.passwordVisible.old;
      case 'new':
        return this.passwordVisible.new = !this.passwordVisible.new;
      case 'confirm':
        return this.passwordVisible.confirm = !this.passwordVisible.confirm;
      default:
        return false;
    }
  }
}

