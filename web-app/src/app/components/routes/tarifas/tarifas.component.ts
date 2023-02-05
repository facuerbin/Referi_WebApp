import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Frecuencia } from 'src/app/interfaces/get.tarifa.frecuencia.res.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  searchIcon = faSearch;
  pencil = faPencilAlt;
  trashIcon = faTrash;

  tarifas: Tarifa[] = [];
  tarifasFiltered: Tarifa[] = [];
  actividades: Actividad[] = [];
  frecuencias: Frecuencia[] = [];

  modal: bootstrap.Modal | undefined;
  tarifaAEliminar: Tarifa | null = null;
  tarifaAEditar: Tarifa | null = null;
  search: string = "";

  tarifasForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u), Validators.minLength(2), Validators.maxLength(120)]],
    monto: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    idActividad: ["", [Validators.required]],
    esOpcional: ["", [Validators.required]],
    frecuencia: ["", [Validators.required]],
  });

  constructor(private auth: AuthService, private formBuilder: FormBuilder, public helper: HelperService) { }

  async ngOnInit(): Promise<void> {
    this.getTarifas();
    (await this.auth.getActividadesOrganizacion()).subscribe( result =>{
      this.actividades = result.data;
    });

    (await this.auth.getTarifaFrecuencias()).subscribe( result =>{
      this.frecuencias = result.data;
    });
  }

  async getTarifas() {
    (await this.auth.getTarifasByOrg()).subscribe( result => {
      this.tarifas = result.data.map(tarifa => {
        return {
          id: tarifa.id,
          actividad: tarifa.actividad.nombre,
          nombre: tarifa.nombre,
          monto: tarifa.monto,
          opcional: tarifa.esOpcional? 'Sí': 'No',
          fechaActualizacion: String(tarifa.fechaActualizacion).slice(0,10),
          frecuencia: tarifa.frecuencia.nombre
        }
      })
      this.tarifasFiltered = this.tarifas;
    });
  }

  filterSearch() {
    const result = this.tarifas.filter(tarifa => {
      return tarifa.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || tarifa.frecuencia.toLowerCase().search(this.search.toLowerCase()) !== -1
          || tarifa.actividad.toLowerCase().search(this.search.toLowerCase()) !== -1
          || tarifa.monto.toString().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.tarifasFiltered = result;


    return "";
  }

  openModal(id: string) {
    this.modal = new Modal(document.getElementById(id) || "", {
      keyboard: false
    });
    this.tarifasForm.reset();
    this.modal.show();
  }

  closeModal(id: string) {
    this.modal?.hide();
  }

  isValid(field: string): boolean {
    return this.tarifasForm.controls[field].errors !== null &&
      (this.tarifasForm.controls[field].touched || this.tarifasForm.controls[field].dirty);
  }

  async handleTarifasForm() {
    const orgId = await this.auth.getOrgId();

    const body = {
      nombre: this.tarifasForm.value['nombre'],
      monto: this.tarifasForm.value['monto'],
      esOpcional: !!this.tarifasForm.value['esOpcional'],
      nombreFrecuencia: this.tarifasForm.value['frecuencia'],
      idActividad: this.tarifasForm.value['idActividad'],
      idOrganizacion : orgId,
    }

    this.tarifasForm.reset();
    const newTarifa = await this.auth.createTarifa(body);
    this.getTarifas();
    this.closeModal("modalAgregarTarifa")

    return newTarifa;
  }

  deleteTarifaModal(idTarifa: string) {
    this.openModal('modalEliminarTarifa')
    const tarifa = this.tarifas.filter(tarifa => {
      return tarifa.id === idTarifa;
    })[0];
    this.tarifaAEliminar = tarifa;
  }

  editarTarifaModal (idTarifa: string) {
    this.openModal('modalEditarTarifa')
    const tarifa = this.tarifas.filter(tarifa => {
      return tarifa.id === idTarifa;
    })[0];
    this.tarifaAEditar = tarifa;

  }

  handleEliminarTarifa () {
    if (this.tarifaAEliminar) this.auth.deleteTarifa(this.tarifaAEliminar.id);
    this.getTarifas();
    this.closeModal('modalEliminarTarifa');
  }

  async handleTarifasEdit () {
    if (! this.tarifaAEditar) return null;
    const body = {
      nombre: this.tarifasForm.value['nombre'],
      monto: this.tarifasForm.value['monto'],
      esOpcional: !!this.tarifasForm.value['esOpcional'],
      nombreFrecuencia: this.tarifasForm.value['frecuencia'],
    }

    if (this.tarifaAEditar) await this.auth.editTarifa(body, this.tarifaAEditar.id);
    this.getTarifas();
    this.tarifasForm.reset();
    this.closeModal('modalEditarTarifa');
    return null;
  }
}

interface Tarifa {
  id: string,
  actividad: string,
  nombre: string,
  monto: number,
  opcional: string,
  fechaActualizacion: string,
  frecuencia: string
}
