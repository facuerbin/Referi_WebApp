import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDay, faChartPie, faEnvelope, faFileInvoiceDollar, faHandHoldingUsd, faRunning, faSitemap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenavToggle = true;
  permisos: Permisos = {
    reportes: false,
    socios: false,
    actividades:false,
    asistencia: false,
    tarifas: false,
    notificaciones: false,
    pagos: false,
    organizacion: false
  };

  constructor(private auth: AuthService) {
  }

  report = faChartPie;
  users = faUsers;
  activities = faRunning;
  attendance = faCalendarDay;
  tarifas = faHandHoldingUsd;
  notifications = faEnvelope;
  pagos = faFileInvoiceDollar;
  organization = faSitemap;

  async ngOnInit(): Promise<void> {
    (await this.auth.listEmployeeOrganizations()).subscribe(result => {
      try {
        (Object.keys(this.permisos) as (keyof typeof this.permisos)[]).forEach( (clave, i) => {
          const permiso = result.data[0].rol.permisos.forEach( permiso => {
            if (permiso.modulo === clave.toUpperCase()) {
              this.permisos[clave] = true;
            }
          });
        });
      }  catch (error) {
        console.log(error);
      }
    })
  }

}

interface Permisos {
  reportes: boolean,
  socios: boolean,
  actividades:boolean,
  asistencia: boolean,
  tarifas: boolean,
  notificaciones: boolean,
  pagos: boolean,
  organizacion: boolean
}
