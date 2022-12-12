import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reporte-barra',
  templateUrl: './reporte-barra.component.html',
  styleUrls: ['./reporte-barra.component.css']
})
export class ReporteBarraComponent implements OnInit{
  @Input('title') title = '';
  @Input('key') key = '';
  @Input('value') value = '';
  @Input('data') data = {};
  @Input() chartType!: GoogleChartType;

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    console.log(this.chartType)
      const range = Object.keys(this.data);
      const values = Object.values(this.data);
      this.chart.dataTable = [
        [this.key, this.value],
      ]
      range.forEach((rango, index) => {
        this.chart.dataTable.push([rango , values[index]]);
      })
      this.chart.chartType = this.chartType
      this.chart.options.title = this.title
  }

  public chart: GoogleChartInterface = {
    chartType: this.chartType,
    dataTable: [
      [this.key, this.value],
    ],
    //firstRowIsData: true,
    options: {
      'title': this.title,
      width: 1000,
      height: 1000,
      chartArea: {left: 50, top: 50, right: 0, bottom: 0},
  },
  };
}
