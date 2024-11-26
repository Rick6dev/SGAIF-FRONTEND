import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';
import { VacacionesService } from 'src/app/services/Vacaciones/vacaciones/vacaciones.service';

@Component({
  selector: 'app-gestion-planificacion',
  templateUrl: './gestion-planificacion.component.html',
  styleUrls: [
    './gestion-planificacion.component.css',
    './buttonswr.component.css',
  ],
})
export class GestionPlanificacionComponent implements OnInit {
  results: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userLogged: LoginGuard,
    public messageAlert: MessageService,
    public planificacionService: PlanificacionService,
    public navigationService: NavigationService,
    public vacation: VacacionesService,
    public selectOptionAdminComponent: SelectAdminService
  ) {}
  comentarios: any = [];

  data = {
    id_planificacion_auditoria: 0,
    cantidad_subprocesos: 0,
    created_year: 0,
    fecha_culminacion: '0',
    fecha_inicio: '0',
    flagAS400: false,
    flagDA: false,
    flagFULL: false,
    flagIST73: false,
    flagIST77: false,
    flagISTCLEAR: false,
    flagNAIGUATA: false,
    flagSAP: false,
    id_auditor_responsable: 0,
    id_auditor_secundario: 0,
    id_auditor_terciario: 0,
    id_gerencia_encargada: 0,
    id_subproceso: 0,
    mount_end: 0,
    auditorResponsable: {
      id_auditor_responsable: 0,
      nombre: '',
      apellido: '',
      ci_empleado: 0,
      mail: '0',
    },
    auditorSecundario: {
      id_auditor_responsable: 0,
      nombre: '',
      apellido: '',
      ci_empleado: 0,
      mail: '',
    },
    auditorTerciario: {
      id_auditor_responsable: 0,
      nombre: '',
      apellido: '',
      ci_empleado: 0,
      mail: '0',
      status: false,
    },
    subproceso: {
      id_subproceso: 0,
      nombre_subproceso: '',
      id_proceso: 0,
      proceso: {
        id_proceso: 0,
        nombre_proceso: '',
        id_tipo_proceso: 0,
        id_macroproceso: 0,
        macroproceso: {
          id_macroproceso: 0,
          nombre_macroproceso: '',
        },
        tipo_proceso: {
          id_tipo_proceso: 0,
          nombre_tipo_proceso: '',
        },
      },
    },
  };

  filtersStatus = [
    'Asignado',
    'En Proceso',
    'Culminado por  el Auditor',
    'Rechazado por el Gerente',
    'Aprobado por el Gerente',
    'Culminada',
    'Rechazado por el VP',
  ];
  user: any = [];
  ngOnInit(): void {
    this.getPlanificacion();
    this.user = this.userLogged.extractUser();

    this.getYearArray();
    this.getAuditores();
    this.gerenciaEncargada();
    this.searchTerm.searchAuditor =
      this.user.role === 3 ? this.user.userId : '0';
    setTimeout(() => {
      this.searchPlanificacionYear();
      this.searchPlanificacionAuditor();
    }, 200);
  }
  years: any = [];
  yearInf: any = null;

  edit: number = 0;
  gerenciaEncargada() {
    if (this.user.areaTrabajo === 'GAT') {
      this.edit = 1;
    } else if (this.user.areaTrabajo === 'GAOF') {
      this.edit = 2;
    } else {
      this.edit = 0;
    }
  }
  getYearArray() {
    const fecha = new Date();
    const currentYear = new Date().getFullYear();
    this.yearInf = currentYear;
    this.searchTerm.searchYear = this.yearInf;
    this.searchPlanificacionYear();
    const years = Array.from(
      { length: this.yearInf - 2024 + 1 },
      (_, i) => i + 2024
    );
    this.years = years;
  }

  searchTerm: any = {
    searchPlanificacion: '',
    searchAuditor: '',
    searchNivel: '',
    searchRiesgo: '',
    search: '',
    searchYear: '',
  };
  allPlanificacion: any = [];
  public searchPlanificacion(event: any) {
    this.searchTerm.searchAuditor = '';
    this.searchTerm.searchNivel = '';
    this.searchTerm.searchRiesgo = '';
    const searchTerm = this.searchTerm.searchPlanificacion.toLowerCase();
    this.searchTerm.search = searchTerm;

    if (searchTerm.length > 2) {
      this.results = this.allPlanificacion.filter((planificacion: any) =>
        planificacion.estado.toLowerCase().includes(searchTerm)
      );
    } else {
      this.results = this.allPlanificacion;
    }
  }
  empty: any = null;

  public searchPlanificacionAuditor() {
    if (
      this.searchTerm.searchAuditor !== null &&
      this.searchTerm.searchAuditor !== '0'
    ) {
      const term = parseInt(this.searchTerm.searchAuditor);
      this.results = this.allPlanificacion.filter(
        (planificacion: any) => planificacion.id_auditor_responsable === term
      );
    } else {
      this.results = this.allPlanificacion;
    }
  }

  public searchPlanificacionYear() {
    if (this.searchTerm.searchYear !== '') {
      const term = parseInt(this.searchTerm.searchYear);
      this.results = this.allPlanificacion.filter(
        (planificacion: any) => planificacion.created_year === term
      );
    }
  }
  getPlanificacion() {
    this.planificacionService.getProceso();

    this.planificacionService.getPlanificacion().subscribe(
      (res) => {
        this.results = res;
        this.allPlanificacion = res;
        if (this.edit === 1) {
          this.results.sort((a: any, b: any) => {
            return a.id_gerencia_encargada - b.id_gerencia_encargada;
          });
        }
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
  // Strings
  checkedItem: string = '';

  setActiveItem(id: string) {
    const buttonWraps = document.querySelectorAll('.hidden-trigger');

    buttonWraps.forEach((buttonWrap) => {
      if (buttonWrap.id === id) {
        buttonWrap!.classList.add('checked');
      } else {
        buttonWrap!.classList.remove('checked');
      }
    });
    this.checkedItem = this.checkedItem === id ? '' : id;
  }

  deletePlanificacion(data: any) {
    const result: any = data;
    this.data = data;
  }

  seguimiento(result: any) {
    this.data = result;

    this.planificacionService
      .getPlanificacionComentario(this.data.id_planificacion_auditoria)
      .subscribe(
        (res) => (this.comentarios = res),
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
  }
  auditores: any = [];

  getAuditores() {
    this.planificacionService.getAuditor().subscribe({
      next: (res) => (this.auditores = res),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  flagEdit: boolean = false;
  editar(result: any) {
    this.data = result;
    this.flagEdit = true;
    this.navigationService.toggleSidebar(true);
  }

  flagReporte: boolean = false;
  generarPDF() {
    this.flagReporte = true;
  }
}
