import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { ActividadTableElement } from 'src/app/interfaces/actividad.table';
import { CreateActividadDto } from 'src/app/interfaces/create.actividad.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  modal: bootstrap.Modal | undefined;
  modalError = false;
  tipoActividad: TipoActividad[] = [];
  load = false;
  spinner = false;
  search: string = "";

  actividadesFiltered: ActividadTableElement[] = [];
  actividades: ActividadTableElement[] = []

  constructor(private formBuilder: FormBuilder, private auth: AuthService, public helper: HelperService) { }


  async ngOnInit(): Promise<void> {
    this.getTipoActividad();
    this.getActividadOrganizacion();

  }

  async getTipoActividad () {
    return (await this.auth.getTipoActividad()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoActividad.push(element);
      })
      this.load = true;
    })
  }

  async getActividadOrganizacion () {
    const actividades = this.auth.getActividadesOrganizacion();
    (await actividades).subscribe( result =>{
      this.actividades = result.data.map( actividad => {
        return {
          codigo: actividad.id,
          nombre: actividad.nombre,
          tipo: actividad.tipo.tipo,
          cupo: actividad.cupo,
          turnos: actividad.turnos.length,
          fechaInicio: (actividad.fechaCreacion + "").slice(0,10),
          espacio: "" + actividad.turnos.map( turno => turno.espacio?.nombre || " "),
          estado: !actividad.fechaBaja ? "Activo" : "Baja",
        };
      });
      this.actividadesFiltered = this.actividades;

    })
  }

  filterSearch() {
    const result = this.actividades.filter(actividad => {
      return actividad.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || actividad.tipo.toLowerCase().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.actividadesFiltered = result;


    return "";
  }

  openModal() {
    this.modal = new Modal(document.getElementById("modalForm") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModal() {
    this.modal?.hide();
  }


  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    idTipoActividad: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    cupo: ["", [Validators.required]],
  });


  selectedValue: any;
  selectChange() {
    this.selectedValue = this.auth.getTipoActividad();
  }

  async handleForm() {
    this.spinner = true;
    const form = this.actividadForm.value;

    const req: CreateActividadDto = {
      ...form,
      imgUrl: "",
      idOrganizacion: await this.auth.getOrgId(),
    }

    const res = this.auth.createActividad(req);
    res.
      then( result => {
        this.spinner = false;
        this.getActividadOrganizacion();
        this.actividadForm.reset();
        this.closeModal();
      })
      .catch(e => {
        this.modalError = true;
      });
  }

  isValidActividad(field: string): boolean {
    return this.actividadForm.controls[field].errors !== null &&
      (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }

}
