import { Component, Input, OnInit } from '@angular/core';
import { faCalendarDay, faChartPie, faEnvelope, faFileInvoiceDollar, faHandHoldingUsd, faRunning, faSitemap, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenavToggle = false;
  constructor() {
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
