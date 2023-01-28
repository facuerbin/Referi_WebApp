import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { OrganizationDetailDto } from 'src/app/interfaces/OrganizationDetailDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  organizacionForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
    descripcion: ["", [Validators.required, Validators.maxLength(250)]],
    telefono: ["", [Validators.required, Validators.maxLength(120)]],
    calle: ["", [Validators.required, Validators.maxLength(120)]],
    numero: ["", [Validators.required, Validators.maxLength(12)]],
    ciudad: ["", [Validators.required, Validators.maxLength(120)]],
    provincia: ["", [Validators.required, Validators.maxLength(100)]],
    tipo: ["", [Validators.required]],
  })

  organizacion: OrganizationDetailDto | null = null;
  load = false;
  spinner = false;
  tipoOrganizacion: any[] = [];
  fechaCreacion = "";
  fechaActualizacion = "";
  modal: bootstrap.Modal | undefined;
  pencil = faPencilAlt;
  fileToUpload: File | null = null;
  imgUrl = environment.appUrl + environment.apiVersionUri + "/uploads/placeholder.png";
  dias = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO"
  ];

  constructor(private formBuilder: FormBuilder, public helper: HelperService, private auth: AuthService, private upload: UploadService) { }

  ngOnInit() {
    this.getOrganizacion();
    this.getTipoOrganizacion();
  }


  async getOrganizacion() {
    return (await this.auth.suscribeOrgDetails()).subscribe(res => {
      this.organizacion = res;
      if (this.organizacion.logo) this.imgUrl = environment.appUrl + environment.apiVersionUri + "/" + this.organizacion.logo;
      this.fechaCreacion = this.organizacion.fechaCreacion.toString().slice(0, 10);
      this.fechaActualizacion = this.organizacion.fechaActualizacion.toString().slice(0, 10);

      this.load = true;
    })
  }

  async getTipoOrganizacion() {
    return (await this.auth.getTipoOrganizacion()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoOrganizacion.push(element);
      })
      this.load = true;
    })
  }

  isValid(field: string): boolean {
    return this.organizacionForm.controls[field].errors !== null &&
      (this.organizacionForm.controls[field].touched || this.organizacionForm.controls[field].dirty);
  }

  openModalTarifas() {
    this.modal = new Modal(document.getElementById("modalTarifas") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModalTarifas() {
    this.modal = new Modal(document.getElementById("modalTarfias") || "", {
      keyboard: false
    });
    this.modal.hide();
  }

  async saveUpdate() {
    this.spinner = true;
    const form = this.organizacionForm.value;

    if (! this.organizacion) return window.location.reload;

    const dto = {
      id: this.organizacion.id,
      nombre: form.nombre ? form.nombre: this.organizacion.nombre,
      direccion: {
        calle: form.calle ? form.calle: this.organizacion.direccion.calle,
        numero: form.numero ? form.numero: this.organizacion.direccion.numero,
        ciudad: form.ciudad ? form.ciudad: this.organizacion.direccion.ciudad,
        provincia: form.provincia ? form.provincia: this.organizacion.direccion.provincia
      },
      descripcion: form.descripcion? form.descripcion: this.organizacion.descripcion,
      telefono: form.telefono? form.telefono: this.organizacion.telefono,
      tipo: form.tipo? form.tipo: this.organizacion.tipo.id
    }



    const res = this.auth.updateOrganizacion(dto);
    return res.
      then(result => {
        this.spinner = false;
        return window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChange(event: any) {
    this.fileToUpload = event.target?.files[0];
    this.load = !this.load;
    if (!this.fileToUpload) throw new Error();
    this.upload.upload(this.fileToUpload)
      .then(async result => {
        this.load = false;
        if (!this.organizacion) throw new Error();
        this.organizacion.logo = result.data.path;
        const res = await this.auth.updateOrganizacion(this.organizacion);
        return window.location.reload();
      })
      .catch(error => console.log(error))
  }
}
