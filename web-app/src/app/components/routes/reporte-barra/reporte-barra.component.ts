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
  width: number = window.innerWidth * 0.7;
  height: number = window.innerHeight * 0.8;

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
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
      this.chart.component?.draw()
    }

    ngOnChanges() {
      this.ngOnInit()
  }

  public chart: GoogleChartInterface = {
    chartType: this.chartType,
    dataTable: [
      [this.key, this.value],
    ],
    refreshInterval: 10,
    //firstRowIsData: true,
    options: {
      'title': this.title,
      width: this.width,
      height: this.height,
      is3D: true,
      chartArea: {width: '80%', height: '80%'},
      legend: {position: 'bottom'}
  },
  };
}
