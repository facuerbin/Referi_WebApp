import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleChartType } from 'ng2-google-charts';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-grafica-reporte',
  templateUrl: './grafica-reporte.component.html',
  styleUrls: ['./grafica-reporte.component.css']
})
export class GraficaReporteComponent implements OnInit {

  key= "";
  value = "";
  data = { }
  title = ""
  render = false;
  chartType = GoogleChartType.PieChart;
  constructor(private router: Router, private auth: AuthService) { }

  async ngOnInit(): Promise<void> {
    const route = this.router.url;
    if (route.includes('rango-etario-socios')) {
      this.key= "Rango etario";
      this.value = "Cantidad";
      this.title = "Distribución de Rango Etarios de Socios";
      this.chartType = GoogleChartType.PieChart;
      this.data = await this.getDataRangoEtarioSocios();
    }

    if (route.includes('socios-por-estado')) {
      this.key= "Estado";
      this.value = "Cantidad de socios por Estado";
      this.title = "Distribución de Socios por Estado";
      this.chartType = GoogleChartType.PieChart;
      this.data = await this.getDataSociosPorEstado();
    }

    if (route.includes('cant-inscriptos-mes')) {
      this.key= "Año-Mes";
      this.value = "Cantidad de Inscriptos por Mes";
      this.title = "Distribución Inscriptos por Mes";
      this.chartType = GoogleChartType.BarChart;
      this.data = await this.getDataInscriptosMes();
    }

    this.render = true;
  }

  async getDataRangoEtarioSocios() {
    return await this.auth.reporteRangoEtarioSocios();
  }

  async getDataSociosPorEstado() {
    return await this.auth.reporteSociosPorEstado();
  }

  async getDataInscriptosMes() {
    return await this.auth.reporteInscriptosMes();
  }

}
