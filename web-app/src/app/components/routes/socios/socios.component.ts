import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { isValidDate } from 'src/app/helpers/date.validator';
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
  errorTurnos = false;
  errorInscripcion = "";
  search: string = "";
  searchUser: string = "";
  socios: Inscripto[] = [];
  sociosFiltered: Inscripto[] = [];
  actividades: Actividad[] = [];
  turnos: Turno[] = [];

  sociosForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email, Validators.maxLength(200)]],
    nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
    apellido: ["", [Validators.required,  Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
    dni: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    fechaNac: ["", [Validators.required, isValidDate]],
    telefono: ["", [Validators.required, Validators.maxLength(120)]],
    calle: ["", [Validators.required, Validators.maxLength(120)]],
    numero: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    ciudad: ["", [Validators.required, Validators.maxLength(120)]],
    provincia: ["", [Validators.required, Validators.maxLength(120)]],
    idActividad: ["", [Validators.required]],
    idTurnoActividad: ["", [Validators.required]],
  });


  constructor(private formBuilder: FormBuilder, private auth: AuthService, public helper: HelperService, private csvParser: NgxCsvParser) { }


  async ngOnInit(): Promise<void> {
    this.getSocios();
    this.getActividadOrganizacion();
  }

  async getSocios () {
    return (await this.auth.getSociosByOrg()).subscribe(result => {
      this.socios = result.data;
      this.sociosFiltered = this.socios;
    })
  }

  async getActividadOrganizacion () {
    const actividades = this.auth.getActividadesOrganizacion();
    (await actividades).subscribe( result =>{
      this.actividades = result.data;
    })
  }

  filterSearch() {
    const result = this.socios.filter(socio => {
      return socio.usuario.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.apellido.toLowerCase().search(this.search.toLowerCase()) !== -1
          || socio.usuario.email.toLowerCase().search(this.search.toLowerCase()) !== -1
          || (socio.usuario.dni+"").toLowerCase().search(this.search.toLowerCase()) !== -1
      ;
    });

    this.sociosFiltered = result;
    return "";
  }


  async onChange(deviceValue: any) {
    if (deviceValue.value) {
      (await this.auth.getActividadById(deviceValue.value)).subscribe(result => {
        this.turnos = result.turnos;
        this.errorTurnos = this.turnos.length == 0;
      });
    }
  }

  parseTurno(turno: Turno): string[] {
    return turno.horarios.map(horario => {
      return `${horario.horario.diaSemana}: de ${horario.horario.horaInicio}:${horario.horario.minutosInicio>9  ? horario.horario.minutosInicio: '0'+horario.horario.minutosInicio} a ${Math.floor(horario.horario.horaInicio + horario.horario.duracion / 60)}:${((horario.horario.minutosInicio + horario.horario.duracion) % 60) >9  ? (horario.horario.minutosInicio + horario.horario.duracion) % 60: '0'+(horario.horario.minutosInicio + horario.horario.duracion) % 60}`
    });
  }

  @ViewChild('fileImportInput') fileImportInput: any;
  header: boolean = false;
  backupSucces: boolean = false;
  csvRecords: any;
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.csvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
        next: async (result): Promise<void> => {
          this.csvRecords = result;
          const response = await this.auth.restoreSocios(this.csvRecords);
          if (response) {
            this.backupSucces = true;
            setTimeout(() => {
              return window.location.reload();
            }, 3000);
          }
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        }
      });
  }

  async exportarSocios() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    const orgId = await this.auth.getOrgId();
    link.setAttribute('href', '/v1/socios/organizacion/'+ orgId + '/backup');
    link.setAttribute('download', `socios.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
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

  async handleForm() {
    try {
      const result = await this.auth.registerNewSocio({
        email: this.sociosForm.value['email'],
        nombre: this.sociosForm.value['nombre'],
        apellido: this.sociosForm.value['apellido'],
        dni: +this.sociosForm.value['dni'],
        telefono: this.sociosForm.value['telefono'],
        fechaNacimiento: this.sociosForm.value['fechaNac'],
        domicilio: {
          calle: this.sociosForm.value['calle'],
          numero: this.sociosForm.value['numero'],
          ciudad: this.sociosForm.value['ciudad'],
          provincia: this.sociosForm.value['provincia']
        },
        idTurnoActividad: this.sociosForm.value['idTurnoActividad'],
      });

      this.getSocios();
      this.closeModal('modalAgregarUsuario');
    } catch (error: any) {
      console.log(error)
      if (error && error?.response && error?.response.data && error.response.data.error){
        this.errorInscripcion = error.response.data.error;
      } else {
        this.errorInscripcion = "Ocurrió un error al realizar la inscripción"
      }
    }

  }

  buscarSocio() {
    if (this.sociosForm.controls['email'].errors) {
      return null;
    }
    this.auth.getUser()
    return null;
  }

  isValid(control: string) {
    return false;
  }
}
