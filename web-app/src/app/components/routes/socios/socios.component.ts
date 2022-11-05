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
    const socios = (await this.auth.getSociosByOrg()).subscribe(result => {
      console.log(result);
      this.socios = result.data;
    })
  }

  filterSearch() {
    // const result = this.mock.filter(socio => {
    //   return socio.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
    //       || socio.email.toLowerCase().search(this.search.toLowerCase()) !== -1
    //   ;
    // });

    // this.socios = result;


    // return "";
  }

  handleForm() {

  }

  isValid(control: string) {
    return false;
  }

  openModal() {
    this.modal = new Modal(document.getElementById("modalForm") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal() {
    this.modal = new Modal(document.getElementById("modalForm") || "", {
      keyboard: false
    });
    this.modal.hide();
  }

  socios: Inscripto[] = [];

}
