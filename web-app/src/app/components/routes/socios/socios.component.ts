import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faIdCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
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


  ngOnInit(): void {
    this.socios = this.mock;
  }

  filterSearch() {
    const result = this.mock.filter(socio => {
      return socio.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.email.toLowerCase().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.socios = result;


    return "";
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

  socios: Socio[] = [];

  mock = [
    {
      legajo: 1,
      nombre: "Dal Newdick",
      email: "dnewdick0@imdb.com",
      dni: "07-095-5898"
    },
    {
      legajo: 2,
      nombre: "Gaylor Saffon",
      email: "gsaffon1@bizjournals.com",
      dni: "13-516-1362"
    },
    {
      legajo: 3,
      nombre: "Kerby Burkhill",
      email: "kburkhill2@cargocollective.com",
      dni: "78-138-1315"
    },
    {
      legajo: 4,
      nombre: "Tiphany Meffen",
      email: "tmeffen3@wisc.edu",
      dni: "20-179-4628"
    },
    {
      legajo: 5,
      nombre: "Darnell Kamen",
      email: "dkamen4@booking.com",
      dni: "84-113-3103"
    },
    {
      legajo: 6,
      nombre: "Willette Stothart",
      email: "wstothart5@thetimes.co.uk",
      dni: "06-200-3057"
    },
    {
      legajo: 7,
      nombre: "Ring Louthe",
      email: "rlouthe6@dailymail.co.uk",
      dni: "44-880-5212"
    },
    {
      legajo: 8,
      nombre: "Barbe Hulburd",
      email: "bhulburd7@techcrunch.com",
      dni: "15-189-9283"
    },
    {
      legajo: 9,
      nombre: "Obadiah Astupenas",
      email: "oastupenas8@last.fm",
      dni: "71-597-8894"
    },
    {
      legajo: 10,
      nombre: "Sarajane Etteridge",
      email: "setteridge9@booking.com",
      dni: "30-289-4790"
    },
    {
      legajo: 11,
      nombre: "Carlyn Attree",
      email: "cattreea@sciencedaily.com",
      dni: "56-903-5278"
    },
    {
      legajo: 12,
      nombre: "Elizabet Brislane",
      email: "ebrislaneb@house.gov",
      dni: "17-349-5514"
    },
    {
      legajo: 13,
      nombre: "Auberon Slorach",
      email: "aslorachc@sina.com.cn",
      dni: "28-112-8788"
    },
    {
      legajo: 14,
      nombre: "Eada Gerbl",
      email: "egerbld@squidoo.com",
      dni: "57-042-8366"
    },
    {
      legajo: 15,
      nombre: "Henrietta Hogben",
      email: "hhogbene@arizona.edu",
      dni: "95-153-6597"
    }
  ];
}


interface Socio {
  legajo: number;
  nombre: string;
  email:  string;
  dni:    string;
}
