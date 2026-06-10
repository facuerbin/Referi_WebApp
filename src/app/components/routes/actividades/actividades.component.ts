import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActividadTableElement } from 'src/app/interfaces/actividad.table';
import { CreateActividadDto } from 'src/app/interfaces/create.actividad.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  standalone: false,
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  @ViewChild('actividadModal') actividadModal!: ModalComponent;
  searchIcon = faSearch;
  detailIcon = faAddressCard;
  modalError = false;
  tipoActividad: TipoActividad[] = [];
  load = false;
  spinner = false;
  search: string = "";

  actividadesFiltered: ActividadTableElement[] = [];
  actividades: ActividadTableElement[] = []

  constructor(private formBuilder: FormBuilder, private auth: AuthService, public helper: HelperService, private cdr: ChangeDetectorRef) { }


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
      this.cdr.detectChanges();
    })
  }

  async getActividadOrganizacion () {
    const actividades = this.auth.getActividadesOrganizacion();
    (await actividades).subscribe(result => {
      this.actividades = result.data.map(actividad => {
        return {
          codigo: actividad.id,
          nombre: actividad.nombre,
          tipo: actividad.tipo.tipo,
          cupo: actividad.cupo,
          turnos: actividad.turnos.length,
          fechaInicio: (actividad.fechaCreacion + "").slice(0,10),
          espacio: "" + actividad.turnos.map(turno => turno.espacio?.nombre || " "),
          estado: !actividad.fechaBaja ? "Activo" : "Baja",
        };
      });
      this.actividadesFiltered = this.actividades;
      this.cdr.detectChanges();
    })
  }

  filterSearch(query: string = '') {
    this.search = query;
    const result = this.actividades.filter(actividad => {
      return actividad.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || actividad.tipo.toLowerCase().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.actividadesFiltered = result;


    return "";
  }

  openModal() {
    this.actividadForm.reset({ nombre: '', idTipoActividad: '', descripcion: '', cupo: '' });
    this.actividadModal.open();
  }

  closeModal() {
    this.actividadModal.close();
  }


  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u) , Validators.minLength(2)]],
    idTipoActividad: ["", [Validators.required]],
    descripcion: ["", [Validators.required, Validators.minLength(5)]],
    cupo: ["", [Validators.required, Validators.pattern(/^[0-9]*$/)]],
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
        this.actividadForm.reset({ nombre: '', idTipoActividad: '', descripcion: '', cupo: '' });
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
