import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAuditoriaComponent } from './dashboard-auditoria.component';

const routes: Routes = [{ path: '', component: DashboardAuditoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAuditoriaRoutingModule {}
