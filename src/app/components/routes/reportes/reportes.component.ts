import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  selectedTab: string = 'Socios';

  constructor() { }

  ngOnInit(): void {
  }

  select(tab: string) {
    this.selectedTab = tab;
  }

}
