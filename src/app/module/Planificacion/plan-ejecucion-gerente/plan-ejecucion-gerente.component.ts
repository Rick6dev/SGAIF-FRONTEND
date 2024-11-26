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
  selector: 'app-plan-ejecucion-gerente',
  templateUrl: './plan-ejecucion-gerente.component.html',
  styleUrls: [
    './plan-ejecucion-gerente.component.css',
    '../styles/card.component.css',
    '../styles/form-comentario.component.css',
    '../styles/gradient.component.css',
  ],
})
export class PlanEjecucionGerenteComponent implements OnInit {
  public listNumbers1: any = [];
  public listNumbers2: any = [];
  public listNumbers3: any = [];
  public elementoArrastrado: any = {};
  public dataUnique: any = {};

  comentarios: any = [];
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

  // Boolean
  isDragEnabled: boolean = false;
  isDragEnabled2: boolean = false;
  isDragEnabled3: boolean = false;
  flagData: boolean = false;

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
    const area = this.user.areaTrabajo === 'GAT' ? 1 : 2;

    this.planificacionService
      .getPlanificacionRechazadosGerente(area)
      .subscribe({
        next: (res) => (this.listNumbers1 = res || []),
        error: (err) =>
          this.messageAlert.MessageAlertFloatError(err.error.message),
      });
  }

  getPlanificacionProcesos() {
    const area = this.user.areaTrabajo === 'GAT' ? 1 : 2;
    this.planificacionService
      .getPlanificacionCulminadosEntregaGerente(area)
      .subscribe({
        next: (res) => (this.listNumbers2 = res || []),
        error: (err) =>
          this.messageAlert.MessageAlertFloatError(err.error.message),
      });
  }

  getPlanificacionCulminados() {
    const area = this.user.areaTrabajo === 'GAT' ? 1 : 2;
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    this.planificacionService.getPlanificacionAprobadosGerente(area).subscribe({
      next: (res) => {
        this.listNumbers3 = res || [];
        console.log(this.listNumbers3);
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
  protect_Date: any = '';
  isComent: boolean = false;
  updateFlagsBasedOnContainer(containerId: string) {
    this.dataUnique.id_;
    this.dataUnique.flagDesaprobadoGerente = containerId === 'cdk-drop-list-3';
    this.dataUnique.flagCulminado = containerId === 'cdk-drop-list-4';
    this.dataUnique.flagAprobadoGerente = containerId === 'cdk-drop-list-5';

    if (containerId === 'cdk-drop-list-3') {
      this.dataUnique.flagProceso = true;

      this.dataUnique.estado = 'Rechazado por el Gerente';
    } else {
      this.dataUnique.flagCulminado = true;
      // this.dataUnique.flagProceso=false;
      // this.dataUnique.fecha_culminado_auditor = new Date(this.protect_Date);
      this.dataUnique.fecha_aprobado = null;
      this.dataUnique.estado = 'Culminado por el Auditor';
    }
    if (containerId === 'cdk-drop-list-5') {
      this.dataUnique.flagDesaprobadoVp = false;
      this.dataUnique.fecha_aprobado = new Date();
      this.dataUnique.estado = 'Aprobado por el Gerente';
    }

    this.crearFormulario();
    this.anularSeleccion();
    setTimeout(() => {
      this.isComent = true;
    }, 600);
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
  public anularSeleccion() {
    this.isDragEnabled = false;
    this.isDragEnabled = false;
    this.isDragEnabled2 = false;
    this.isDragEnabled3 = false;
  }

  getInfo(n: any) {
    this.data = n;
    this.planificacionService
      .getPlanificacionComentario(this.data.id_planificacion_auditoria)
      .subscribe(
        (res) => (this.comentarios = res),
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
    this.flagData = true;
  }
}
