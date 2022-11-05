import { Component, OnInit } from '@angular/core';
import { faFileInvoiceDollar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  searchIcon = faSearch;
  paymentIcon = faFileInvoiceDollar;

  tarifas: Tarifa[] = [];
  actividades: Actividad[] = [];

  constructor(private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    (await this.auth.getTarifasByOrg()).subscribe( result => {
      this.tarifas = result.data.map(tarifa => {
        return {
          actividad: tarifa.actividad.nombre,
          nombre: tarifa.nombre,
          monto: tarifa.monto,
          opcional: tarifa.esOpcional? 'Sí': 'No',
          fechaActualizacion: String(tarifa.fechaActualizacion).slice(0,10),
          frecuencia: tarifa.frecuencia.nombre
        }
      })
    });

    (await this.auth.getActividadesOrganizacion()).subscribe( result =>{
      this.actividades = result.data;
    });
  }

  search(event:Event) {
    return event;
  }
}

interface Tarifa {
  actividad: string,
  nombre: string,
  monto: number,
  opcional: string,
  fechaActualizacion: string,
  frecuencia: string
}
