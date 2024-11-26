import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-plan-ejecucion-vp',
  templateUrl: './plan-ejecucion-vp.component.html',
  styleUrls: [
    './plan-ejecucion-vp.component.css',
    '../styles/card.component.css',
    '../styles/form-comentario.component.css',
    '../styles/gradient.component.css',
  ],
})
export class PlanEjecucionVpComponent implements OnInit {
  public listNumbers1: any = [];
  public listNumbers2: any = [];
  public listNumbers3: any = [];
  public elementoArrastrado: any = {};
  public dataUnique: any = {};
  isComent: boolean = false;
  comentarios: any = [];
  flagData: boolean = false;

  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };

  data = {
    id_planificacion_auditoria: 0,
    cantidad_subprocesos: 0,
    created_year: 0,
    estado: '',
    entrega: '',
    fecha_culminacion: '0',
    fecha_proceso: null,
    fecha_avalado: null,
    fecha_aprobado: null,
    fecha_finalizado: null,
    fecha_culminado_auditor: null,
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
  // Boolean
  isDragEnabled: boolean = false;
  isDragEnabled2: boolean = false;
  isDragEnabled3: boolean = false;
  constructor(
    public messageAlert: MessageService,
    public planificacionService: PlanificacionService,
    private fb: FormBuilder,
    public userLogged: LoginGuard
  ) {}

  ngOnInit() {
    this.user = this.userLogged.extractUser() as User;
    this.getPlanificacion();
    this.getPlanificacionCulminados();
    this.getPlanificacionProcesos();
  }

  getPlanificacion() {
    this.planificacionService.getPlanificacionRechazadosVp().subscribe({
      next: (res) => (this.listNumbers1 = res || []),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  getPlanificacionProcesos() {
    this.planificacionService.getPlanificacionAprobadoEntregaVp().subscribe({
      next: (res) => (this.listNumbers2 = res || []),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  getPlanificacionCulminados() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    this.planificacionService.getPlanificacionAprobadoVp().subscribe({
      next: (res) => {
        this.listNumbers3 = res || [];
        this.listNumbers3 = this.listNumbers3.filter(
          (planificacion: any) =>
            planificacion.mount_end >= mesActual && planificacion.flagAprobadoVp
        );
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  drop($event: CdkDragDrop<any[]>) {
    const draggedItem = $event.item.data;
    this.elementoArrastrado = draggedItem;

    if ($event.previousContainer !== $event.container) {
      this.updateFlagsBasedOnContainer($event.container.id);
      this.updatePlanificacionStatus(this.dataUnique);
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    } else {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }
    this.anularSeleccion();
  }

  getInfo(n: any) {
    this.data = n;
    this.planificacionService
      .getPlanificacionComentario(this.data.id_planificacion_auditoria)
      .subscribe({
        next: (res) => (this.comentarios = res),
        error: (err) =>
          this.messageAlert.MessageAlertFloatError(err.error.message),
      });
    this.flagData = true;
  }
  fechaCulminadoAuditor: any = '';
  fechaAprobadoGerente: any = '';

  updateFlagsBasedOnContainer(containerId: string) {
    this.fechaCulminadoAuditor = new Date(
      this.dataUnique.fecha_culminado_auditor
    );
    this.fechaAprobadoGerente = new Date(this.dataUnique.fecha_aprobado);
    // this.dataUnique.id_
    if (containerId === 'cdk-drop-list-10') {
      this.dataUnique.flagCulminado = false;
      this.dataUnique.flagProceso = true;
      this.dataUnique.flagAprobadoGerente = false;
      this.dataUnique.flagDesaprobadoVp = true;

      this.dataUnique.fecha_culminado_auditor = null;
      this.dataUnique.fecha_aprobado = null;
      this.dataUnique.estado = 'Rechazado por el VP';
      this.dataUnique.entrega = 'En Proceso';
    }
    if (containerId === 'cdk-drop-list-11') {
      this.dataUnique.fecha_aprobado = new Date(this.fechaAprobadoGerente);
      this.dataUnique.flagCulminado = true;
      this.dataUnique.flagProceso = false;
      this.dataUnique.flagAprobadoGerente = true;
      this.dataUnique.flagDesaprobadoVp = false;
      this.dataUnique.fecha_finalizado = null;
      this.dataUnique.fecha_avalado = null;
      this.dataUnique.estado = 'Aprobada por el Gerente';
      this.dataUnique.entrega = 'En Proceso';
    }
    this.dataUnique.flagAprobadoVp = containerId === 'cdk-drop-list-12';
    if (containerId === 'cdk-drop-list-12') {
      const fechaActual = new Date();
      this.dataUnique.fecha_finalizado = new Date();
      this.dataUnique.fecha_avalado = new Date();
      this.dataUnique.estado = 'Culminada';
      this.dataUnique.mount_end = fechaActual.getMonth() + 1;
      console.log(this.dataUnique);
      this.determinarEstado();
    }

    this.crearFormulario();
    this.anularSeleccion();
    setTimeout(() => {
      this.isComent = true;
    }, 600);
  }

  determinarEstado() {
    // Definir las fechas
    const fecha1: any = new Date(this.dataUnique.fecha_culminacion);
    const fecha2: any = this.dataUnique.fecha_avalado;

    // Restar las fechas y obtener la diferencia en milisegundos
    const diferenciaEnMilisegundos = fecha1 - fecha2;

    // Convertir la diferencia a días
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );

    // Variable para almacenar el estado
    let estado;

    if (diferenciaEnDias + 1 > 0) {
      estado = 'Excelente';
    } else if (diferenciaEnDias + 1 === 0) {
      estado = 'A tiempo';
    } else {
      estado = 'Retraso';
    }

    this.dataUnique.entrega = estado;
  }
  updatePlanificacionStatus(data: any) {
    this.planificacionService.updatePlanificacionStatus(data).subscribe({
      next: (res: any) => this.messageAlert.MessageAlertFloatSucces(res.text),
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  extractData(n: any, isDrag: number) {
    if (!this.isDragEnabled && !this.isDragEnabled2 && !this.isDragEnabled3) {
      this.isDragEnabled = isDrag === 1;
      this.isDragEnabled2 = isDrag === 2;
      this.isDragEnabled3 = isDrag === 3;
      this.dataUnique = n;
    }
  }
  forma: any = {};

  crearFormulario() {
    this.forma = this.fb.group({
      id_planificacion_auditoria: [
        this.dataUnique.id_planificacion_auditoria,
        [Validators.required],
      ],
      comentario: [null, [Validators.required]],
      id_auditor_responsable: [this.user.userId],
      role: [this.user.role],
    });
  }

  guardarInforme() {
    if (this.forma.invalid) {
      this.messageAlert.MessageAlertFloatError(
        'Estimado Usuario ingrese un comentario valido!'
      );
      return;
    }
    this.planificacionService.postComentario(this.forma.value).subscribe({
      next: (res: any) => {
        this.messageAlert.MessageAlertFloatSucces(res.text);
        this.isComent = false;
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }
  anularSeleccion() {
    this.isDragEnabled = false;
    this.isDragEnabled = false;
    this.isDragEnabled2 = false;
    this.isDragEnabled3 = false;
  }
}
