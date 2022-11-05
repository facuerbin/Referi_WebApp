import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faFileInvoiceDollar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  searchIcon = faSearch;
  paymentIcon = faFileInvoiceDollar;

  ingresos: Pago[] = [];

  // @ViewChild('modal') modal : ElementRef;
  constructor(private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    (await this.auth.getPagosByOrg()).subscribe( result => {
      this.ingresos = result.data.map( pago => {
        return {
          fecha: pago.fechaPago.slice(0,10),
          email: pago.usuario.email,
          socio: pago.usuario.nombre + " " + pago.usuario.apellido,
          actividad: pago.cuotas[0].tarifa.actividad.nombre,
          monto: pago.cuotas.reduce( (montoTotal, cuota) => montoTotal + cuota.monto, 0 ),
          medioDePago: pago.medioDePago
        }
      });
    });
  }

  search(event:Event) {
    return event;
  }
}

interface Pago {
  fecha: string,
  email: string,
  socio: string,
  actividad: string,
  monto: number,
  medioDePago: string
}
