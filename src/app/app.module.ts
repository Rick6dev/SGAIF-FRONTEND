import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SelectAdminService } from "./services/Register/select-Admin/select-admin.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InformeAudService } from "./services/Register/Informe/informe-aud.service";

import { FechaFormat2Pipe } from "./Pipe/fecha_format2/fecha-format2.pipe";
import { FechaComparePipe } from "./Pipe/fechaCompare/fecha-compare.pipe";
import { FechaInformePipe } from "./Pipe/fechaInfome/fecha-informe.pipe";

import { FechaNormalPipe } from "./Pipe/fecha-normal/fecha-normal.pipe";
import { FechaNormal2Pipe } from "./Pipe/fecha-normal2/fecha-normal2.pipe";

import { BackgroundPipe } from "./Pipe/background/background.pipe";
import { FormInformeComponent } from "./module/Register/form-informe/form-informe.component";
import { FormHallazgoComponent } from "./module/Register/form-hallazgo/form-hallazgo.component";
import { FormComentariosComponent } from "./module/Register/form-comentarios/form-comentarios.component";
import { NavigationComponent } from "./module/navigation/navigation.component";
import { ListInformeComponent } from "./module/Register/list-informe/list-informe.component";
import { ListHallazgoComponent } from "./module/Register/list-hallazgo/list-hallazgo.component";
import { ListComentComponent } from "./module/Register/list-coment/list-coment.component";
import { GenerarTiempoEntregaComponent } from "./module/Entrega/generar-tiempo-entrega/generar-tiempo-entrega.component";
import { GestionTiempoEntregaComponent } from "./module/Entrega/gestion-tiempo-entrega/gestion-tiempo-entrega/gestion-tiempo-entrega.component";
import { CcrSgaComponent } from "./module/ccr-sga/ccr-sga.component";
import { GenerarPdfComponent } from "./module/Home/generar-pdf/generar-pdf.component";
import { GenerarPlanificacionComponent } from "./module/Planificacion/generar-planificacion/generar-planificacion.component";
import { PlanEjecucionGlobalComponent } from "./module/Planificacion/plan-ejecucion-global/plan-ejecucion-global.component";
import { PlanEjecucionVpComponent } from "./module/Planificacion/plan-ejecucion-vp/plan-ejecucion-vp.component";
import { PlanEjecucionGerenteComponent } from "./module/Planificacion/plan-ejecucion-gerente/plan-ejecucion-gerente.component";
import { PlanificacionEjecucionComponent } from "./module/Planificacion/planificacion-ejecucion/planificacion-ejecucion.component";
import { FormEditPlanificacionComponent } from "./module/Planificacion/form-edit-planificacion/form-edit-planificacion.component";
import { ModalPlanificacionComponent } from "./module/Planificacion/modal-planificacion/modal-planificacion.component";
import { ModalSubprocesosComponent } from "./module/Planificacion/modal-subprocesos/modal-subprocesos.component";
import { ModalProcesoComponent } from "./module/Planificacion/modal-proceso/modal-proceso.component";
import { ModalMacroprocesoComponent } from "./module/Planificacion/modal-macroproceso/modal-macroproceso.component";
import { ModalEliminarPlanificacionComponent } from "./module/Planificacion/modal-eliminar-planificacion/modal-eliminar-planificacion.component";
import { GestionPlanificacionComponent } from "./module/Planificacion/gestion-planificacion/gestion-planificacion.component";
import { CalendarPlanificacionComponent } from "./module/Planificacion/calendar-planificacion/calendar-planificacion.component";
import { PlanificacionComponent } from "./module/Planificacion/planificacion/planificacion.component";
import { FormPlanificacionComponent } from "./module/Planificacion/form-planificacion/form-planificacion.component";
import { GestionVacacionComponent } from "./module/Vacacion/gestion-vacacion/gestion-vacacion.component";
import { TablaTodosComponent } from "./module/Home/tabla-todos/tabla-todos.component";
import { TablaCerradosComponent } from "./module/Home/tabla-cerrados/tabla-cerrados.component";
import { TablaAbiertosComponent } from "./module/Home/tabla-abiertos/tabla-abiertos.component";
import { HomeComponent } from "./module/Home/home/home.component";
import { GenerarReporteComponent } from "./module/Reporte/generar-reporte/generar-reporte.component";
import { LoaderBarraComponent } from "./module/Reporte/loader-barra/loader-barra.component";
import { FormReporteGrcComponent } from "./module/Reporte/form-reporte-grc/form-reporte-grc.component";
import { FormReporteVPComponent } from "./module/Reporte/form-reporte-vp/form-reporte-vp.component";
import { FormReporteVPEComponent } from "./module/Reporte/form-reporte-vpe/form-reporte-vpe.component";
import { FormReporteComponent } from "./module/Reporte/form-reporte/form-reporte.component";
import { SaltoLineaPipe } from "./Pipe/salto_linea/salto-linea.pipe";
import { ListModalhllzComponent } from "./module/Register/list-modalhllz/list-modalhllz.component";
import { MessageComponent } from "./module/Register/message/message.component";
import { ListOnehallazgoComponent } from "./module/Register/list-onehallazgo/list-onehallazgo.component";
import { FormLoginComponent } from "./module/Login/form-login/form-login.component";
import { ModalNivelAsociadoComponent } from "./module/Register/modal-nivel-asociado/modal-nivel-asociado.component";
import { ModalRiesgoAsociadoComponent } from "./module/Register/modal-riesgo-asociado/modal-riesgo-asociado.component";
import { ModalTipoAuditoriaComponent } from "./module/Register/modal-tipo-auditoria/modal-tipo-auditoria.component";
import { PaginacionComponent } from "./module/Tool/paginacion/paginacion.component";
import { LoaderComponent } from "./module/Tool/loader/loader.component";
import { SeveralPipe } from "./Pipe/several/several.pipe";
import { CapitalizePipe } from "./Pipe/capitalize/capitalize.pipe";
import { ModalBorrarComponent } from "./module/Register/modal-borrar/modal-borrar.component";
import { FechaFormatPipe } from "./Pipe/fechaFormat/fecha-format.pipe";
import { DiferenciaFechaPipe } from "./Pipe/diferenciaFecha/diferencia-fecha.pipe";
import { FullCalendarModule } from "@fullcalendar/angular";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormRequerimientoComponent } from "./module/Register/form-requerimiento/form-requerimiento.component";
import { ListRequerimientoComponent } from "./module/Requerimiento/list-requerimiento/list-requerimiento.component";
import { ModalUpdateComponent } from "./module/Requerimiento/modal-update/modal-update.component";
import { ListModalRequrimientoComponent } from "./module/Requerimiento/list-modal-requrimiento/list-modal-requrimiento.component";
import { FormModalUpdateComponent } from "./module/Requerimiento/form-modal-update/form-modal-update.component";
import { ModalEliminarRequerimientoComponent } from './module/Requerimiento/modal-eliminar-requerimiento/modal-eliminar-requerimiento.component';
import { GenerarRequerimientoComponent } from './module/Requerimiento/generar-requerimiento/generar-requerimiento.component';

// import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,

    FormInformeComponent,
    FormHallazgoComponent,
    FormComentariosComponent,
    NavigationComponent,
    ListInformeComponent,
    ListHallazgoComponent,
    ListComentComponent,
    FechaFormatPipe,
    ModalBorrarComponent,
    CapitalizePipe,
    SeveralPipe,
    LoaderComponent,
    PaginacionComponent,
    ModalTipoAuditoriaComponent,
    ModalRiesgoAsociadoComponent,
    ModalNivelAsociadoComponent,
    FormLoginComponent,
    FechaFormat2Pipe,
    FechaComparePipe,
    ListOnehallazgoComponent,
    MessageComponent,
    ListModalhllzComponent,
    SaltoLineaPipe,
    FormReporteComponent,
    FormReporteVPEComponent,
    FormReporteVPComponent,
    FormReporteGrcComponent,
    LoaderBarraComponent,
    GenerarReporteComponent,
    HomeComponent,
    TablaAbiertosComponent,
    TablaCerradosComponent,
    TablaTodosComponent,
    GestionVacacionComponent,
    FechaNormalPipe,
    FechaNormal2Pipe,
    FormPlanificacionComponent,
    PlanificacionComponent,
    CalendarPlanificacionComponent,
    GestionPlanificacionComponent,
    ModalEliminarPlanificacionComponent,
    ModalMacroprocesoComponent,
    ModalProcesoComponent,
    ModalSubprocesosComponent,
    ModalPlanificacionComponent,
    FormEditPlanificacionComponent,
    BackgroundPipe,
    PlanificacionEjecucionComponent,
    PlanEjecucionGerenteComponent,
    PlanEjecucionVpComponent,
    PlanEjecucionGlobalComponent,
    GenerarPlanificacionComponent,
    GenerarPdfComponent,
    CcrSgaComponent,
    GestionTiempoEntregaComponent,
    DiferenciaFechaPipe,
    GenerarTiempoEntregaComponent,
    FormRequerimientoComponent,
    ListRequerimientoComponent,
    ModalUpdateComponent,
    ListModalRequrimientoComponent,
    FormModalUpdateComponent,
    ModalEliminarRequerimientoComponent,
    GenerarRequerimientoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [SelectAdminService, InformeAudService],
  bootstrap: [AppComponent],
})
export class AppModule {}
