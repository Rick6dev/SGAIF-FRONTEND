import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';
import { GestionTiempoEntregaService } from 'src/app/services/Entrega/gestion-tiempo-entrega/gestion-tiempo-entrega.service';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
@Component({
  selector: 'app-gestion-tiempo-entrega',
  templateUrl: './gestion-tiempo-entrega.component.html',
  styleUrls: [
    './gestion-tiempo-entrega.component.css',
    './semaforo-entrega.component.css',
  ],
})
export class GestionTiempoEntregaComponent implements OnInit {
  constructor(
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public planificacionService: PlanificacionService,
    public gestionTiempoService: GestionTiempoEntregaService,
    private cdr: ChangeDetectorRef
  ) {}

  flagReporte: boolean = false;
  results: any = [];
  resultadosConDiferencia: any = [];
  flagNoData: boolean = false;
  resultsAll: any = [];
  planificacionAuditoriaGAT: any = [];
  planificacionAuditoriaGAOF: any = [];
  dataGAOF: any = [];
  dataGAT: any = [];
  dataGAOFObject: any = {};
  dataGATObject: any = {};
  years: number[] = [];
  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    this.getPlanificacion();
    this.getPlanificacionGroup();
    this.getYearArray();
    this.getAuditores();
  }
  auditores: any = [];
  getAuditores() {
    this.planificacionService.getAuditor().subscribe({
      next: (res) => (this.auditores = res),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
    console.log();
  }

  getPlanificacion() {
    this.planificacionService.getPlanificacionAprobadoVp().subscribe({
      next: (res) => {
        this.results = res;
        this.resultsAll = this.results.filter(
          (planificacion: any) =>
            planificacion.created_year === this.currentYear
        );
        this.flagNoData = true;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.mesage);
      },
    });
  }

  toogleState() {
    this.flagReporte = !this.flagReporte;
  }

  getClasses(result: any) {
    const isRetraso = result.entrega === 'Retraso' ? true : false;
    const isTiempo = result.entrega === 'A tiempo' ? true : false;
    const isExcelente = result.entrega === 'Excelente' ? true : false;

    return {
      switch1: isRetraso,
      switch2: isExcelente,
      switch3: isTiempo,
    };
  }

  cargaInicial() {
    const fechaActual = new Date();
    this.currentYear = fechaActual.getFullYear();
  }

  currentYear: any = 2024;
  getPlanificacionGroup() {
    this.planificacionService.getPlanificacionGroup().subscribe({
      next: (res: any) => {
        this.planificacionAuditoriaGAT = res.planificacionAuditoriaGAT;
        this.planificacionAuditoriaGAOF = res.planificacionAuditoriaGAOF;
        this.clasification(
          this.planificacionAuditoriaGAT,
          this.planificacionAuditoriaGAOF
        );
      },
      error: (err) => {},
    });
  }

  clasification(GAT: any, GAOF: any) {
    GAT.forEach((planification: any) => {
      if (this.currentYear == planification.created_year) {
        this.dataGAT.push(planification);
      }
    });

    GAOF.forEach((planification: any) => {
      if (this.currentYear == planification.created_year) {
        this.dataGAOF.push(planification);
      }
    });
    this.dataGAOFObject = this.dataGAOF[0];
    this.dataGATObject = this.dataGAT[0];
  }

  flagDasboardGAT: boolean = true;
  flagDasboardGAOF: boolean = true;

  change_Year() {
    const fechaActual = parseInt(this.currentYear);
    this.resultsAll = this.results.filter(
      (planificacion: any) => planificacion.created_year === fechaActual
    );
  }
  getYearArray() {
    const añoActual = new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: añoActual - 2024 + 1 },
      (_, i) => i + 2024
    );
    this.years = years;
  }
  searchAuditor: any = 0;
  public searchPlanificacionAuditor() {
    if (this.searchAuditor !== '0') {
      const term = parseInt(this.searchAuditor);
      const fechaActual = parseInt(this.currentYear);
      this.resultsAll = this.results.filter(
        (planificacion: any) =>
          planificacion.id_auditor_responsable === term &&
          planificacion.created_year === fechaActual
      );
    } else {
      this.resultsAll = this.results;
    }
  }
}
