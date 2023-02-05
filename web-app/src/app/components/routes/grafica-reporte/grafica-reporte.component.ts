import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleChartType } from 'ng2-google-charts';
import { Actividad } from 'src/app/interfaces/get.actividades.organizacion.dto';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-grafica-reporte',
  templateUrl: './grafica-reporte.component.html',
  styleUrls: ['./grafica-reporte.component.css']
})
export class GraficaReporteComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService, private formBuilder: FormBuilder) { }

  key= "";
  value = "";
  data = { };
  title = "";
  render = false;
  noData = false;
  dateQuery = false;
  activityQuery = false;
  chartType = GoogleChartType.PieChart;
  currentYear = parseInt(new Date().getFullYear().toString().slice(2));
  currentMonth = new Date().getMonth() + 1;
  idActividad: string = '';
  activities: Actividad[] = [];

  queryForm: FormGroup = this.formBuilder.group({
    anioDesde: [this.currentYear - 1, [Validators.required, Validators.pattern(/^\d{2}$/), Validators.max(this.currentYear)]],
    mesDesde: [this.currentMonth, [Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.max(12), Validators.min(1)]],
    anioHasta: [this.currentYear, [Validators.required, Validators.pattern(/^\d{2}$/), Validators.max(this.currentYear)]],
    mesHasta: [this.currentMonth, [Validators.required, Validators.pattern(/^\d{1,2}$/), Validators.max(12), Validators.min(1)]],
    idActividad: [this.idActividad, []]
  });


  async ngOnInit(): Promise<void> {
    this.render = false;
    this.noData = false;
    this.dateQuery = false;
    this.activityQuery = false;
    const route = this.router.url;

    // Reportes Socios
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
      this.dateQuery = true;
      this.key= "Año-Mes";
      this.value = "Cantidad de Inscriptos por Mes";
      this.title = "Distribución Inscriptos por Mes";
      this.chartType = GoogleChartType.BarChart;
      this.data = await this.getDataInscriptosMes();
    }

    // Reportes Actividades
    if (route.includes('cant-inscriptos-actividad-mes')) {
      await this.getActividades();
      const actividad = this.activities.find(activity => {
        return activity.id == this.queryForm.controls['idActividad'].value
      });
      this.idActividad = this.queryForm.controls['idActividad'].value
      this.dateQuery = true;
      this.activityQuery = true;
      this.key= "Año-Mes";
      this.value = "Cantidad de Inscriptos por Actividad por Mes";
      this.title = `Distribución de Inscriptos en ${actividad?.nombre ? actividad.nombre : 'una actividad'} por Mes`;
      this.chartType = GoogleChartType.BarChart;
      this.data = await this.getDataInscriptosActividadMes();
    }

    if (route.includes('rango-etario-actividad')) {
      await this.getActividades();
      const actividad = this.activities.find(activity => {
        return activity.id == this.queryForm.controls['idActividad'].value
      });
      this.idActividad = this.queryForm.controls['idActividad'].value
      this.activityQuery = true;
      this.key= "Rango etario";
      this.value = "Cantidad";
      this.title = `Distribución de Rango Etarios de Socios de ${ actividad?.nombre ? actividad.nombre: 'una actividad' }`;
      this.chartType = GoogleChartType.PieChart;
      this.data = await this.getDataRangoEtarioSociosActividad();
    }

    // Reportes Ingresos


    if (Object.keys(this.data).length > 0) {
      this.render = true;
    } else {
      this.noData = true;
    }
  }


  isValid(field: string): boolean {
    return this.queryForm.controls[field].errors !== null &&
    (this.queryForm.controls[field].touched || this.queryForm.controls[field].dirty);
  }


  async getDataRangoEtarioSocios() {
    return await this.auth.reporteRangoEtarioSocios();
  }

  async getDataRangoEtarioSociosActividad() {
    return await this.auth.reporteRangoEtarioSociosActividad(this.queryForm.controls['idActividad'].value);
  }

  async getDataSociosPorEstado() {
    return await this.auth.reporteSociosPorEstado();
  }

  async getDataInscriptosMes() {
    const form = this.queryForm.value;
    return await this.auth.reporteInscriptosMes(form.anioDesde, form.mesDesde, form.anioHasta, form.mesHasta);
  }

  async getDataInscriptosActividadMes() {
    const form = this.queryForm.value;
    return await this.auth.reporteInscriptosActividadMes(form.idActividad, form.anioDesde, form.mesDesde, form.anioHasta, form.mesHasta);
  }

  async getActividades() {
    (await this.auth.getActividadesOrganizacion()).subscribe(result => {
      this.activities = result.data;
    });
  }

  filter() {
    this.ngOnInit();
  }

}
