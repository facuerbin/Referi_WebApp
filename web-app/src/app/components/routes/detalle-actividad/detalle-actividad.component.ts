import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { CreateTarifaDto } from 'src/app/interfaces/create.tarifa.dto';
import { Horario } from 'src/app/interfaces/create.turno.dto';
import { GetActividadDetail, Tarifas, Turno } from 'src/app/interfaces/get.detail.actividad.dto';
import { Espacio } from 'src/app/interfaces/get.espacios.response.dto';
import { Frecuencia } from 'src/app/interfaces/get.tarifa.frecuencia.res.dto';
import { TipoActividad } from 'src/app/interfaces/get.tipo.actividad.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detalle-actividad',
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent implements OnInit {
  actividadForm: FormGroup = this.formBuilder.group({
    nombre: ["", [Validators.required]],
    idTipoActividad: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    cupo: ["", [Validators.required]],
  });


  tarifasForm: FormGroup = this.formBuilder.group({
    nombreTarifa: ["", [Validators.required]],
    frecuencia: ["", [Validators.required]],
    monto: ["", [Validators.required]],
    tarifaOpcional: ["", [Validators.nullValidator]],
  });

  horariosForm: FormGroup = this.formBuilder.group({
    dia: ["", [Validators.required]],
    horaInicio: ["", [Validators.required]],
    minutosInicio: ["", [Validators.required]],
    duracion: ["", [Validators.required]],
    espacio: ["", [Validators.required]],
  })

  horariosArray: Horario[] = []
  horariosStrings: String[] = []
  turnosArray: Turno[] = []
  turnosStrings: String[][] = []

  actividadId: string = "";
  actividad: GetActividadDetail | null = null;
  load = false;
  spinner = false;
  tipoActividad: TipoActividad[] = [];
  fechaCreacion = "";
  tarifas: Tarifas[] = [];
  espacios: Espacio[] = [];
  modal: bootstrap.Modal | undefined;
  pencil = faPencilAlt;
  fileToUpload: File | null = null;
  frecuencias: Frecuencia[] = [];
  imgUrl = environment.appUrl + environment.apiVersionUri + "/uploads/placeholder.png";
  dias = [
    "LUNES" ,
    "MARTES" ,
    "MIERCOLES" ,
    "JUEVES" ,
    "VIERNES" ,
    "SABADO" ,
    "DOMINGO"
  ];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private auth: AuthService, private upload: UploadService) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.actividadId = params['id'];

      (await this.auth.getActividadById(this.actividadId)).subscribe( result => {
        this.actividad = {...result};
        this.turnosArray = this.actividad.turnos;
        this.turnosStrings = this.turnosArray.map( turno => {
          return turno.horarios.map(horario => {
            const minIni = horario.horario.minutosInicio>= 10 ? horario.horario.minutosInicio: '0'+horario.horario.minutosInicio;
            const minFin = horario.horario.minutosInicio + horario.horario.duracion%60 >= 10 ? horario.horario.minutosInicio + horario.horario.duracion%60 : '0' + horario.horario.minutosInicio + horario.horario.duracion%60;
            return (`${horario.horario.diaSemana}: de ${horario.horario.horaInicio}:${minIni} a ${Math.floor(horario.horario.horaInicio + horario.horario.duracion/60)}:${minFin}`);
          });
        });

        this.fechaCreacion = ("" + this.actividad.fechaCreacion).slice(0,10);
        this.tarifas = result.__tarifas__;;
        this.imgUrl = environment.appUrl + environment.apiVersionUri + "/" + this.actividad.imgUrl;
      });
  });

  this.getTipoActividad();
  this.getFrecuencias();
  this.getEspacios();
  }

  async getTipoActividad () {
    return (await this.auth.getTipoActividad()).subscribe(res => {
      res.data.forEach(element => {
        this.tipoActividad.push(element);
      })
      this.load = true;
    })
  }

  async getFrecuencias() {
    return (await this.auth.getTarifaFrecuencias()).subscribe(res => {
      res.data.forEach(element => {
        this.frecuencias.push(element);
      })
      this.load = true;
    })
  }

  async getTarifas() {
    return (await this.auth.getTarifasActividad(this.actividadId)).subscribe(res => {
      this.tarifas = [];
      res.data.forEach(element => {
        this.tarifas.push(element);
      })
      this.load = true;
    })
  }

  async getEspacios() {
    return (await this.auth.getEspaciosOrganizacion()).subscribe(res => {
      res.data.forEach(element => {
        this.espacios.push(element);
      })
      this.load = true;
    })
  }

  handleForm() {

  }

  async handleTarifasForm() {
    const orgId = await this.auth.getOrgId();

    const body = {
      nombre: this.tarifasForm.value['nombreTarifa'],
      monto: this.tarifasForm.value['monto'],
      esOpcional: !!this.tarifasForm.value['tarifaOpcional'],
      nombreFrecuencia: this.tarifasForm.value['frecuencia'],
      idActividad: this.actividadId,
      idOrganizacion : orgId,
    }

    const newTarifa = await this.auth.createTarifa(body);
    this.getTarifas();
    return newTarifa;

  }

  async handleHorariosForm(){
    const horario = {
      dia: this.horariosForm.value['dia'],
      horaInicio: this.horariosForm.value['horaInicio'],
      minutosInicio: this.horariosForm.value['minutosInicio'],
      duracion: this.horariosForm.value['duracion'],
      espacio: this.horariosForm.value['espacio']
    }
    this.horariosArray.push( horario);
    this.horariosStrings.push(`${horario.dia}: de ${horario.horaInicio}:${horario.minutosInicio} a ${Math.floor(horario.horaInicio + horario.duracion/60)}:${horario.minutosInicio + horario.duracion%60}`)
  }

  async crearTurno() {
    const dto = {
      idActividad: this.actividadId,
      idEspacio: this.horariosArray[0].espacio,
      horarios: this.horariosArray
    }
    const result = await this.auth.createTurno(dto);
    this.horariosArray = [];
    this.horariosStrings = [];
  }

  isValid(field: string): boolean {
    return false
    return this.actividadForm.controls[field].errors !== null &&
    (this.actividadForm.controls[field].touched || this.actividadForm.controls[field].dirty);
  }

  isValidTarifa(field: string): boolean {
    return this.tarifasForm.controls[field].errors !== null &&
    (this.tarifasForm.controls[field].touched || this.tarifasForm.controls[field].dirty);
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

  openModalHorarios() {
    this.modal = new Modal(document.getElementById("modalHorarios") || "", {
      keyboard: false
    });
    this.modal.show();
  }

  closeModalHorarios() {
    this.modal = new Modal(document.getElementById("modalHorarios") || "", {
      keyboard: false
    });
    this.modal.hide();
  }

  async saveUpdate() {
    this.spinner = true;
    const form = this.actividadForm.value;

    const req: Partial<GetActividadDetail> = {
      id: this.actividadId,
    }

    form.nombre ? req.nombre = form.nombre : "";
    form.descripcion ? req.descripcion = form.descripcion : "";
    form.cupo ? req.cupo = form.cupo : "";
    form.tipo ? req.tipo = form.tipo : "";


    const res = this.auth.updateActividad(req);
    res.
      then( result => {
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
    if ( ! this.fileToUpload) throw new Error();
    this.upload.upload(this.fileToUpload)
    .then( result => {
      this.load = false;
      if (! this.actividad) throw new Error();
      this.actividad.imgUrl = result.data.path;
      this.auth.updateActividad(this.actividad);
      return window.location.reload();
    })
    .catch( error => console.log(error))
  }
}
