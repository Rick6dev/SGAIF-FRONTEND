import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/app/services/Message/message.service";
import { PlanificacionService } from "src/app/services/Planificacion/planificacion.service";
import { RequerimientoService } from "src/app/services/Requerimiento/requerimiento.service";

@Component({
  selector: "app-list-requerimiento",
  templateUrl: "./list-requerimiento.component.html",
  styleUrls: [
    "./list-requerimiento.component.css",
    "./buttonswr.component.css",
  ],
})
export class ListRequerimientoComponent implements OnInit {
  auditores: any = [];
  informes: any = [];
  requerimientos: any = [];
  allRequerimiento: any = [];
  checkedItem: string = "";
  flagEdit: boolean = false;
  searchTerm: any = {};
  updateData: any = {};
  flagReporte: boolean = false;
  constructor(
    private requerimientoService: RequerimientoService,
    private messageAlert: MessageService,
    private planificacionService: PlanificacionService
  ) {}

  ngOnInit(): void {
    this.getRequerimiento();
    this.getAuditores();
    this.getInformes();
  }

  public getRequerimiento() {
    this.requerimientoService.listRequerimiento().subscribe({
      next: (res) => {
        this.allRequerimiento = res;
        this.requerimientos = res;
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }
  extraerData(result: any, status: number) {
    this.updateData = result;
    this.updateData.id_estado_requerimiento = status;
    if (this.updateData.id_estado_requerimiento === 3) {
      this.updateData.cantidad_devoluciones =
        this.updateData.cantidad_devoluciones + 1;
      this.updateData.fecha_devolucion = new Date();
    }
    if (
      this.updateData.id_estado_requerimiento === 4 ||
      this.updateData.id_estado_requerimiento === 5
    ) {
      this.updateData.fecha_culminacion = new Date();
    }
  }
  actualizarRequerimiento() {
    this.requerimientoService.updateRequerimiento(this.updateData).subscribe({
      next: (res: any) => {
        this.messageAlert.MessageAlertFloatSucces(res.text);
        this.getRequerimiento();
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.message);
      },
    });
  }

  setActiveItem(id: string) {
    const buttonWraps = document.querySelectorAll(".hidden-trigger");
    buttonWraps.forEach((buttonWrap) => {
      if (buttonWrap.id === id) {
        buttonWrap!.classList.add("checked");
      } else {
        buttonWrap!.classList.remove("checked");
      }
    });
    this.checkedItem = this.checkedItem === id ? "" : id;
  }
  extraerRequerimiento(result: any) {
    this.updateData = result;
    this.flagEdit = true;
    this.requerimientoService.setData(result);
  }
  searchPlanificacionAuditor() {
    if (
      this.searchTerm.searchAuditor !== null &&
      this.searchTerm.searchAuditor !== "0"
    ) {
      this.searchTerm.informe = "0";
      const term = parseInt(this.searchTerm.searchAuditor);
      this.requerimientos = this.allRequerimiento.filter(
        (planificacion: any) => planificacion.id_auditor_responsable === term
      );
    } else {
      this.requerimientos = this.allRequerimiento;
    }
  }
  searchPlanificacionInformes() {
    if (this.searchTerm.informe !== null && this.searchTerm.informe !== "0") {
      this.searchTerm.searchAuditor = 0;
      const term = parseInt(this.searchTerm.informe);
      this.requerimientos = this.allRequerimiento.filter(
        (planificacion: any) => planificacion.id_informe_auditoria === term
      );
    } else {
      this.requerimientos = this.allRequerimiento;
    }
  }
  getAuditores() {
    this.planificacionService.getAuditor().subscribe({
      next: (res) => (this.auditores = res),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }
  getInformes() {
    this.requerimientoService.getInformesAuditoria().subscribe({
      next: (res) => {
        this.informes = res;
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }
  mostrarPanel() {
    this.flagReporte = true;
  }
}
