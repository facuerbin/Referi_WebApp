import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/routes/actividades/actividades.component';
import { AsistenciaComponent } from './components/routes/asistencia/asistencia.component';
import { DetalleActividadComponent } from './components/routes/detalle-actividad/detalle-actividad.component';
import { DetalleSocioComponent } from './components/routes/detalle-socio/detalle-socio.component';
import { DownloadComponent } from './components/routes/download/download.component';
import { EspaciosComponent } from './components/routes/espacios/espacios.component';
import { HomeComponent } from './components/routes/home/home.component';
import { IngresosComponent } from './components/routes/ingresos/ingresos.component';
import { LoginComponent } from './components/routes/login/login.component';
import { NotificacionesComponent } from './components/routes/notificaciones/notificaciones.component';
import { OrganizacionComponent } from './components/routes/organizacion/organizacion.component';
import { PerfilUsuarioComponent } from './components/routes/perfil-usuario/perfil-usuario.component';
import { PersonalComponent } from './components/routes/personal/personal.component';
import { RegisterComponent } from './components/routes/register/register.component';
import { ReportesComponent } from './components/routes/reportes/reportes.component';
import { SociosComponent } from './components/routes/socios/socios.component';
import { TarifasComponent } from './components/routes/tarifas/tarifas.component';
import { VerificarComponent } from './components/routes/verificar/verificar.component';
import { ActividadesGuard } from './guards/actividades.guard';
import { AsistenciaGuard } from './guards/asistencia.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { NotificacionesGuard } from './guards/notificaciones.guard';
import { OrganizacionGuard } from './guards/organizacion.guard';
import { PagosGuard } from './guards/pagos.guard';
import { ReportesGuard } from './guards/reportes.guard';
import { SociosGuard } from './guards/socios.guard';
import { TarifasGuard } from './guards/tarifas.guard';

const routes: Routes = [
  {
    path: "login", component:LoginComponent
  },
  {
    path: "register", component:RegisterComponent
  },
  {
    path: "verify", component:VerificarComponent
  },
  {
    path: "download", component:DownloadComponent
  },
  {
    path: "", component:HomeComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard]
  },
  {
    path: "reportes",
    component:ReportesComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, ReportesGuard]
  },
  {
    path: "socios",
    component:SociosComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, SociosGuard]
  },
  {
    path: "socios/detalle/:id",
    component:DetalleSocioComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, SociosGuard]
  },
  {
    path: "actividades", component:ActividadesComponent
    ,canActivate:[AuthGuardGuard, EmployeeGuard, ActividadesGuard]
  },
  {
    path: "actividades/detalle/:id", component:DetalleActividadComponent
    ,canActivate:[AuthGuardGuard, EmployeeGuard, ActividadesGuard]
  },
  {
    path: "tarifas",
    component:TarifasComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, TarifasGuard]
  },
  {
    path: "asistencia",
    component:AsistenciaComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, AsistenciaGuard]
  },
  {
    path: "notificaciones",
    component:NotificacionesComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, NotificacionesGuard]
  },
  {
    path: "pagos",
    component:IngresosComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, PagosGuard]
  },
  {
    path: "organizacion",
    component:OrganizacionComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, OrganizacionGuard]
  },
  {
    path: "organizacion/personal",
    component:PersonalComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, OrganizacionGuard]
  },
  {
    path: "organizacion/espacios",
    component:EspaciosComponent,
    canActivate:[AuthGuardGuard, EmployeeGuard, OrganizacionGuard]
  },
  {
    path: "perfil",
    component:PerfilUsuarioComponent,
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
