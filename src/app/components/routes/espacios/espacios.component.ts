import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Espacio } from 'src/app/interfaces/get.espacios.response.dto';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})
export class EspaciosComponent implements OnInit {
    searchIcon = faSearch;
    detailIcon = faAddressCard;
    trashIcon = faTrash;
    editIcon = faUserEdit;
    load = false;
    spinner = false;

    espacios: Espacio[] = [];
    espaciosFiltered: Espacio[] = [];

    modal: bootstrap.Modal | undefined;
    modalError = false;
    errorTurnos = false;
    search: string = "";
    searchUser: string = "";
    orgId: string = "";
    actividades: Actividad[] = [];

    espacioForm: FormGroup = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u), Validators.minLength(2)]],
      capacidad: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
      id: [""]
    })


    constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


    async ngOnInit(): Promise<void> {
      await this.getEspacios();
      this.orgId = await this.auth.getOrgId();
    }

    async getEspacios() {
      return (await this.auth.getEspaciosOrganizacion()).subscribe(res => {
        this.espacios = [];
        res.data.forEach(element => {
          this.espacios.push(element);
        })
        this.espaciosFiltered = this.espacios;
        this.load = true;
      })
    }


    async getActividadOrganizacion() {
      const actividades = this.auth.getActividadesOrganizacion();
      (await actividades).subscribe(result => {
        this.actividades = result.data;
      })
    }

    filterSearch() {
      const result = this.espacios.filter(espacio => {
        return espacio.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || (espacio.capacidad+ "").search(this.search.toLowerCase()) !== -1;
      });

      this.espaciosFiltered = result;


      return "";
    }

    parseDate(date: string) {
      const anio = date.slice(0,4);
      const mes = date.slice(5,7);
      const dia = date.slice(8,10);
      return `${dia}/${mes}/${anio}`;
    }

    openModal(id: string, espacio?: Espacio) {
      if (espacio) {
        this.espacioForm.value['nombre'] = espacio.nombre;
        this.espacioForm.value['capacidad'] = espacio.capacidad;
        this.espacioForm.value['id'] = espacio.id;
      }
      this.modal = new Modal(document.getElementById(id) || "", {
        keyboard: false
      });
      this.modal.show();
    }

    closeModal(id: string) {
      this.modal?.hide();
    }

    async handleForm() {
      const dto = {
          nombre: this.espacioForm.value['nombre'],
          capacidad: this.espacioForm.value['capacidad']
        }

      await this.auth.createEspacio(this.orgId, dto);
      this.getEspacios()
      this.closeModal('modalAgregarUsuario');
    }

    async handleFormEdit() {
      const dto = {
          nombre: this.espacioForm.value['nombre'],
          capacidad: this.espacioForm.value['capacidad']
        }

      // await this.auth.createEspacio(this.orgId, dto);
      this.getEspacios()
      this.closeModal('modalAgregarUsuario');
    }

    isValid(field: string): boolean {
      return this.espacioForm.controls[field].errors !== null &&
        (this.espacioForm.controls[field].touched || this.espacioForm.controls[field].dirty);
    }
  }
