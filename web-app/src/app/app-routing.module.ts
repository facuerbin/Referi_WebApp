import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesComponent } from './components/routes/actividades/actividades.component';
import { AsistenciaComponent } from './components/routes/asistencia/asistencia.component';
import { CrearActividadComponent } from './components/routes/crear-actividad/crear-actividad.component';
import { DetalleActividadComponent } from './components/routes/detalle-actividad/detalle-actividad.component';
import { DetalleSocioComponent } from './components/routes/detalle-socio/detalle-socio.component';
import { EspaciosComponent } from './components/routes/espacios/espacios.component';
import { HomeComponent } from './components/routes/home/home.component';
import { IngresosComponent } from './components/routes/ingresos/ingresos.component';
import { InscribirSocioComponent } from './components/routes/inscribir-socio/inscribir-socio.component';
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
    path: "", component:HomeComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "reportes",
    component:ReportesComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "socios",
    component:SociosComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "socios/detalle/:id",
    component:DetalleSocioComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "socios/inscribir",
    component:InscribirSocioComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "actividades", component:ActividadesComponent
  },
  {
    path: "actividades/crear", component:CrearActividadComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "actividades/detalle/:id", component:DetalleActividadComponent
    ,canActivate:[AuthGuardGuard]
  },
  {
    path: "tarifas",
    component:TarifasComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "asistencia",
    // component,:MaintenanceComponent
    component:AsistenciaComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "notificaciones",
    component:NotificacionesComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "pagos",
    component:IngresosComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "organizacion",
    component:OrganizacionComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "organizacion/personal",
    component:PersonalComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path: "organizacion/espacios",
    component:EspaciosComponent,
    canActivate:[AuthGuardGuard]
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
