import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogoutGuard } from './guards/logout/logout.guard';
import { RoleGuardGuard } from './guards/role-guard/role-guard.guard';
import { FormLoginComponent } from './module/Login/form-login/form-login.component';
import { FormInformeComponent } from './module/Register/form-informe/form-informe.component';
import { LoginGuard } from './guards/login.guards';
import { ListInformeComponent } from './module/Register/list-informe/list-informe.component';
import { ListHallazgoComponent } from './module/Register/list-hallazgo/list-hallazgo.component';
import { FormHallazgoComponent } from './module/Register/form-hallazgo/form-hallazgo.component';
import { FormReporteComponent } from './module/Reporte/form-reporte/form-reporte.component';
import { HomeComponent } from './module/Home/home/home.component';
import { GestionVacacionComponent } from './module/Vacacion/gestion-vacacion/gestion-vacacion.component';
import { PlanificacionComponent } from './module/Planificacion/planificacion/planificacion.component';
import { CalendarPlanificacionComponent } from './module/Planificacion/calendar-planificacion/calendar-planificacion.component';
import { GestionPlanificacionComponent } from './module/Planificacion/gestion-planificacion/gestion-planificacion.component';
import { PlanEjecucionGlobalComponent } from './module/Planificacion/plan-ejecucion-global/plan-ejecucion-global.component';
import { GestionTiempoEntregaComponent } from './module/Entrega/gestion-tiempo-entrega/gestion-tiempo-entrega/gestion-tiempo-entrega.component';
import { ListRequerimientoComponent } from './module/Requerimiento/list-requerimiento/list-requerimiento.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: FormLoginComponent, canActivate: [LogoutGuard] },
  {
    path: 'register/FormInforme',
    component: FormInformeComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'register/informes',
    component: ListInformeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register/hallazgos',
    component: ListHallazgoComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'register/FormHallazgo/:cod',
    component: FormHallazgoComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register/FormHallazgo/edit/:cod/:id_hllz',
    component: FormHallazgoComponent,
    canActivate: [LoginGuard],
  },
  { path: 'redirect', redirectTo: 'register/hallazgos', pathMatch: 'full' },

  { path: 'register/hallazgos/:cod_informe', component: ListHallazgoComponent },
  {
    path: 'report/informe',
    component: FormReporteComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'vacacion',
    component: GestionVacacionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'planificacion',
    component: PlanificacionComponent,
    canActivate: [LoginGuard, RoleGuardGuard],
  },
  {
    path: 'calendar',
    component: CalendarPlanificacionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'gestion-planificacion',
    component: GestionPlanificacionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'ejecucion-planificacion',
    component: PlanEjecucionGlobalComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'gestion-tiempo-planificacion',
    component: GestionTiempoEntregaComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'gestion-requerimiento',
    component: ListRequerimientoComponent,
    canActivate: [LoginGuard],
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import(
  //       './modules/Dashboard/dashboard-auditoria/dashboard-auditoria.module'
  //     ).then((m) => m.DashboardAuditoriaModule),
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import(
        './module/Dashboard/dashboard-auditoria/dashboard-auditoria.module'
      ).then((m) => m.DashboardAuditoriaModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
