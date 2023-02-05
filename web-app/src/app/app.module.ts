import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/routes/login/login.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './components/layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './components/routes/home/home.component';
import { ReportesComponent } from './components/routes/reportes/reportes.component';
import { SociosComponent } from './components/routes/socios/socios.component';
import { TarifasComponent } from './components/routes/tarifas/tarifas.component';
import { NotificacionesComponent } from './components/routes/notificaciones/notificaciones.component';
import { OrganizacionComponent } from './components/routes/organizacion/organizacion.component';
import { ActividadesComponent } from './components/routes/actividades/actividades.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './components/routes/register/register.component';
import { AsistenciaComponent } from './components/routes/asistencia/asistencia.component';
import { MaintenanceComponent } from './components/routes/maintenance/maintenance.component';
import { IngresosComponent } from './components/routes/ingresos/ingresos.component';
import { DetalleSocioComponent } from './components/routes/detalle-socio/detalle-socio.component';
import { DetalleActividadComponent } from './components/routes/detalle-actividad/detalle-actividad.component';
import { VerificarComponent } from './components/routes/verificar/verificar.component';
import { PerfilUsuarioComponent } from './components/routes/perfil-usuario/perfil-usuario.component';
import { TablaComponent } from './components/shared/tabla/tabla.component';
import { RecuperarContraseniaComponent } from './components/routes/recuperar-contrasenia/recuperar-contrasenia.component';
import { PersonalComponent } from './components/routes/personal/personal.component';
import { EspaciosComponent } from './components/routes/espacios/espacios.component';
import { DownloadComponent } from './components/routes/download/download.component';
import { ReporteBarraComponent } from './components/routes/reporte-barra/reporte-barra.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GraficaReporteComponent } from './components/routes/grafica-reporte/grafica-reporte.component';
import { AsistenciaQRComponent } from './components/routes/asistencia-qr/asistencia.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ReportesComponent,
    SociosComponent,
    TarifasComponent,
    NotificacionesComponent,
    PerfilUsuarioComponent,
    OrganizacionComponent,
    ActividadesComponent,
    RegisterComponent,
    AsistenciaComponent,
    AsistenciaQRComponent,
    MaintenanceComponent,
    IngresosComponent,
    DetalleSocioComponent,
    DetalleActividadComponent,
    VerificarComponent,
    TablaComponent,
    RecuperarContraseniaComponent,
    PersonalComponent,
    EspaciosComponent,
    DownloadComponent,
    ReporteBarraComponent,
    GraficaReporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    LayoutModule,
    FormsModule,
    FontAwesomeModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
