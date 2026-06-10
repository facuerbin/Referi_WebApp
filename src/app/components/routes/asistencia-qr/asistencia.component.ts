import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  standalone: false,
  selector: 'app-asistencia-qr',
  templateUrl: './asistencia.qr.component.html',
  styleUrls: ['./asistencia.qr.component.css']
})
export class AsistenciaQRComponent implements OnInit {
    orgName: string = '';
    url: string = '';

    constructor(private auth: AuthService, private cdr: ChangeDetectorRef) {
    }

    async ngOnInit(): Promise<void> {
      const org = await this.auth.getOrganizationDetail();
      this.url = this.auth.getAsistenciaUrl() + org.id;
      this.orgName = org.nombre;
      this.cdr.detectChanges();
    }

    print() {
      window.print();
    }
}
