import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDay, faChartPie, faEnvelope, faFileInvoiceDollar, faHandHoldingUsd, faRunning, faSitemap, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenavToggle = false;

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

  ngOnInit(): void {
  }

}
