import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/routes/actividades/actividades.component';
import { AsistenciaComponent } from './components/routes/asistencia/asistencia.component';
import { CrearActividadComponent } from './components/routes/crear-actividad/crear-actividad.component';
import { DetalleActividadComponent } from './components/routes/detalle-actividad/detalle-actividad.component';
import { DetalleSocioComponent } from './components/routes/detalle-socio/detalle-socio.component';
import { HomeComponent } from './components/routes/home/home.component';
import { IngresosComponent } from './components/routes/ingresos/ingresos.component';
import { InscribirSocioComponent } from './components/routes/inscribir-socio/inscribir-socio.component';
import { LoginComponent } from './components/routes/login/login.component';
import { MaintenanceComponent } from './components/routes/maintenance/maintenance.component';
import { NotificacionesComponent } from './components/routes/notificaciones/notificaciones.component';
import { OrganizacionComponent } from './components/routes/organizacion/organizacion.component';
import { PagosComponent } from './components/routes/pagos/pagos.component';
import { PerfilUsuarioComponent } from './components/routes/perfil-usuario/perfil-usuario.component';
import { PersonalComponent } from './components/routes/personal/personal.component';
import { RegisterComponent } from './components/routes/register/register.component';
import { ReportesComponent } from './components/routes/reportes/reportes.component';
import { SociosComponent } from './components/routes/socios/socios.component';
import { TarifasComponent } from './components/routes/tarifas/tarifas.component';
import { VerificarComponent } from './components/routes/verificar/verificar.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

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
    path: "", component:ReportesComponent
    ,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "reportes",
    component:ReportesComponent
  },
  {
    path: "socios",
    // component:MaintenanceComponent
    component:SociosComponent
  },
  {
    path: "socios/detalle/:id",
    // component:MaintenanceComponent
    component:DetalleSocioComponent
  },
  {
    path: "socios/inscribir",
    // component:MaintenanceComponent
    component:InscribirSocioComponent
  },
  {
    path: "actividades", component:ActividadesComponent
  },
  {
    path: "actividades/crear", component:CrearActividadComponent
  },
  {
    path: "actividades/detalle/:id", component:DetalleActividadComponent
  },
  {
    path: "tarifas",
    // component:MaintenanceComponent
    component:TarifasComponent
  },
  {
    path: "asistencia",
    component:MaintenanceComponent
    // component:AsistenciaComponent
  },
  {
    path: "notificaciones",
    // component:MaintenanceComponent
    component:NotificacionesComponent
  },
  {
    path: "pagos",
    component:IngresosComponent
  },
  {
    path: "pagos/registrar",
    component:PagosComponent
  },
  {
    path: "organizacion",
    component:OrganizacionComponent
  },
  {
    path: "organizacion/personal",
    component:PersonalComponent
  },
  {
    path: "perfil",
    component:PerfilUsuarioComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
