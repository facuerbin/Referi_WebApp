import { CDK_DESCRIBEDBY_HOST_ATTRIBUTE } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFileInvoiceDollar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'bootstrap';
import { CreatePagoDto } from 'src/app/interfaces/create.pago.dto';
import { Inscripto } from 'src/app/interfaces/get.inscriptos.organizacion.dto';
import { Cuota } from 'src/app/interfaces/get.pagos.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  searchIcon = faSearch;
  paymentIcon = faFileInvoiceDollar;
  modal: bootstrap.Modal | undefined;
  modalError = false;
  load = false;
  spinner = false;

  pagoForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    medioDePago: ["", [Validators.required]],
  });

  ingresos: Pago[] = [];
  cuotas: Cuota[] = [];
  search: string = "";
  nombre: string = "";
  dni: number = 0;
  socios: Inscripto[] = [];
  idCuotas: string[] = [];
  mediosDePago = {
    EFECTIVO: 'Efectivo',
    TRANSFERENCIA: 'Transferencia Bancaria',
    PASARELADEPAGO: 'MercadoPago'
  }

  // @ViewChild('modal') modal : ElementRef;
  constructor(private auth: AuthService, private formBuilder: FormBuilder, public helper: HelperService) { }

  async ngOnInit(): Promise<void> {
    this.getPagos();
  }

  async getPagos() {
    (await this.auth.getPagosByOrg()).subscribe( result => {
      this.ingresos = result.data.map( pago => {
        return {
          fecha: pago.fechaPago.slice(0,10),
          email: pago.usuario.email,
          socio: pago.usuario.nombre + " " + pago.usuario.apellido,
          // actividad: pago.cuotas[0].tarifa.actividad.nombre,
          monto: pago.cuotas.reduce( (montoTotal, cuota) => montoTotal + cuota.monto, 0 ),
          medioDePago: pago.medioDePago
        }
      });
    });
  }

  filterSearch() {
    // const result = this.actividades.filter(actividad => {
    //   return actividad.nombre.toLowerCase().search(this.search.toLowerCase()) !== -1
    //       || actividad.tipo.toLowerCase().search(this.search.toLowerCase()) !== -1
    //   ;
    // });

    // this.actividadesFiltered = result;


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

  isValid(field: string) {
    return this.pagoForm.controls[field].errors !== null &&
    (this.pagoForm.controls[field].touched || this.pagoForm.controls[field].dirty);
  }


  async handleForm() {
    const body: CreatePagoDto = {
      medioDePago: this.pagoForm.controls['medioDePago'].value.toUpperCase(),
      idsCuota: [...this.idCuotas],
      numeroDeComprobante: '0'
    };

    const result = await this.auth.createPago(body);
    this.getPagos()

  }

  async searchEmail() {
    const email = this.pagoForm.controls['email'].value;
    (await this.auth.getSociosByOrg()).subscribe(async result => {
      this.socios = result.data;
      const user = this.socios.find(socio => socio.usuario.email === email);
      this.nombre = user?.usuario.nombre + " " + user?.usuario.apellido;
      if (user?.id) (await this.auth.getCuotasByUsr(user?.id)).subscribe(result => {
        this.cuotas = result.data.filter(cuota => ! cuota.pago);
      })
    })

  }

  checkbox(idCuota: string) {
    if (this.idCuotas.includes(idCuota)) {
      this.idCuotas.splice(this.idCuotas.indexOf(idCuota), 1);
    } else {
      this.idCuotas.push(idCuota);
    }

  }

  async getSocios () {
    return (await this.auth.getSociosByOrg()).subscribe(result => {
      this.socios = result.data;
    })
  }
}

interface Pago {
  fecha: string,
  email: string,
  socio: string,
  // actividad: string,
  monto: number,
  medioDePago: string
}
