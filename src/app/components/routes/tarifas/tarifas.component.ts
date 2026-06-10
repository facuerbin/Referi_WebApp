import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPencilAlt, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Frecuencia } from 'src/app/interfaces/get.tarifa.frecuencia.res.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  standalone: false,
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  @ViewChild('agregarTarifaModalRef') agregarTarifaRef!: ModalComponent;
  @ViewChild('eliminarTarifaModalRef') eliminarTarifaRef!: ModalComponent;
  @ViewChild('editarTarifaModalRef') editarTarifaRef!: ModalComponent;
  searchIcon = faSearch;
  pencil = faPencilAlt;
  trashIcon = faTrash;

  tarifas: Tarifa[] = [];
  tarifasFiltered: Tarifa[] = [];
  actividades: Actividad[] = [];
  frecuencias: Frecuencia[] = [];

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

  constructor(private auth: AuthService, private formBuilder: FormBuilder, public helper: HelperService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getTarifas();
    this.auth.getActividadesOrganizacion().subscribe(result => {
      this.actividades = result.data;
      this.cdr.detectChanges();
    });

    this.auth.getTarifaFrecuencias().subscribe(result => {
      this.frecuencias = result.data;
      this.cdr.detectChanges();
    });
  }

  getTarifas() {
    this.auth.getTarifasByOrg().subscribe(result => {
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
      this.cdr.detectChanges();
    });
  }

  filterSearch(query: string = '') {
    this.search = query;
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

  private getModalRef(id: string): ModalComponent {
    if (id === 'modalAgregarTarifa') return this.agregarTarifaRef;
    if (id === 'modalEliminarTarifa') return this.eliminarTarifaRef;
    return this.editarTarifaRef;
  }

  openModal(id: string) {
    this.tarifasForm.reset({ nombre: '', monto: '', idActividad: '', esOpcional: '', frecuencia: '' });
    this.getModalRef(id).open();
  }

  closeModal(id: string) {
    this.getModalRef(id).close();
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

    this.tarifasForm.reset({ nombre: '', monto: '', idActividad: '', esOpcional: '', frecuencia: '' });
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
    this.tarifasForm.reset({ nombre: '', monto: '', idActividad: '', esOpcional: '', frecuencia: '' });
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
