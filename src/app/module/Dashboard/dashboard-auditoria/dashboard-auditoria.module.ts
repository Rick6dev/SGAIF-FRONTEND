import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { DashboardAuditoriaRoutingModule } from './dashboard-auditoria-routing.module';
import { DashboardAuditoriaComponent } from './dashboard-auditoria.component';

@NgModule({
  declarations: [DashboardAuditoriaComponent],
  imports: [CommonModule, FormsModule, DashboardAuditoriaRoutingModule],
})
export class DashboardAuditoriaModule {}
