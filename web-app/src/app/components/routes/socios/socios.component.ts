import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faIdCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css'],
})
export class SociosComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  trashIcon = faTrash;
  editIcon = faUserEdit;
  spinner = false;

  modal: bootstrap.Modal | undefined;
  modalError = false;
  search: string = "";
  socios: Inscripto[] = [];
  sociosFiltered: Inscripto[] = [];

  sociosForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    dni: ["", [Validators.required]],
    fechaNac: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


  async ngOnInit(): Promise<void> {
    (await this.auth.getSociosByOrg()).subscribe(result => {
      this.socios = result.data;
      this.sociosFiltered = this.socios;
    })
  }

  filterSearch() {
    const result = this.socios.filter(socio => {
      return socio.usuario.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.apellido.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.email.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.estados[0].nombre?.toString().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.sociosFiltered = result;


    return "";
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

  handleForm() {

  }

  isValid(control: string) {
    return false;
  }
}
