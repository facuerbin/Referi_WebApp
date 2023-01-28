import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAddressCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { PlanillaAsistencia } from 'src/app/interfaces/planilla.asistencia.dto';
import { RegistrarAsistencia } from 'src/app/interfaces/registrar.asistencia.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
    searchIcon = faSearch;
    detailIcon = faAddressCard;
    modal: bootstrap.Modal | undefined;
    modalError = false;
    load = false;
    spinner = false;
    search: string = "";
    date: string = (new Date()).toISOString().slice(0,10);
    selectedDate: string = this.date;
    planillaVacia: boolean = false;

    planillaAsistencia: PlanillaAsistencia | null = null;
    planillaAsistenciaFiltered: PlanillaAsistencia | null = null;


    constructor(private formBuilder: FormBuilder, private auth: AuthService) { }


    ngOnInit(): void {
      this.getPlanillaAsistencia(new Date())
    }

    async getPlanillaAsistencia (fecha: Date) {
      const orgId = await this.auth.getOrgId();
      return (await this.auth.getPlanillaAsistencia(orgId, fecha.toISOString())).subscribe(result => {
        this.planillaAsistencia = result;
        this.planillaVacia =  !this.planillaAsistencia?.asistentes?.length;
        if (!this.planillaVacia) this.planillaAsistencia.asistentes = this.planillaAsistencia.asistentes.sort((asistenteA, asistenteB) => {
          if (asistenteA.hora > asistenteB.hora) return -1;
          if (asistenteA.hora < asistenteB.hora) return 1;
          return 0
        });
        this.planillaAsistenciaFiltered = this.planillaAsistencia
        this.load = true;
      })
    }

    filterSearch() {
      if (! this.planillaAsistencia?.asistentes) return null;
      const result = this.planillaAsistencia?.asistentes.filter(asistente => {
        return asistente.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
            || asistente.apellido.toLowerCase().search(this.search.toLowerCase()) !== -1
            || (asistente.dni + "").search(this.search) !== -1
        ;
      });
      this.planillaAsistenciaFiltered = {
        ...this.planillaAsistencia,
        asistentes: result
      };

      return "";
    }

    filterDate() {
      this.getPlanillaAsistencia(new Date(this.selectedDate));
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


    asistenciaForm: FormGroup = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
      apellido: ["", [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)], Validators.minLength(2), Validators.maxLength(120)],
      dni: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    });

    async handleForm() {
      this.spinner = true;
      const form = this.asistenciaForm.value;

      const req: RegistrarAsistencia = {
        ...form,
        idOrg: await this.auth.getOrgId(),
        hora: (new Date()).toISOString()
      };

      (await this.auth.registrarAsistencia(req)).subscribe(result => {
        this.getPlanillaAsistencia(new Date())
        this.asistenciaForm.reset();
        this.spinner = false;
        this.closeModal();
      });
    }

    isValidActividad(field: string): boolean {
      return this.asistenciaForm.controls[field].errors !== null &&
        (this.asistenciaForm.controls[field].touched || this.asistenciaForm.controls[field].dirty);
    }

  }
