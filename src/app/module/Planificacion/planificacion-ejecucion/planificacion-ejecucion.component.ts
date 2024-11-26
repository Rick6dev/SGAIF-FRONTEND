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
  selector: 'app-planificacion-ejecucion',
  templateUrl: './planificacion-ejecucion.component.html',
  styleUrls: [
    './planificacion-ejecucion.component.css',
    './gradient.component.css',
    './card.component.css',
    './form-comentario.component.css',
  ],
})
export class PlanificacionEjecucionComponent implements OnInit {
  public listNumbers1: any = [];
  public listNumbers2: any = [];
  public listNumbers3: any = [];
  public elementoArrastrado: any = {};
  public dataUnique: any = {};
  statesPlanificacion: any = [];

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
    estado: '',
    created_year: 0,
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
    console.log(this.user);
    this.getPlanificacion();
    this.getPlanificacionCulminados();
    this.getPlanificacionProcesos();

    this.statesPlanificacion = [
      'Todos',
      'Asignados',
      'En Proceso',
      'Culminado por el Auditor',
      'Aprobado por el Gerente',
      'Rechazado por el Gerente',
      'Rechazado por el VP',
      'Culminado',
    ];
  }

  ngOnDestroy() {}

  getPlanificacion() {
    this.planificacionService
      .getPlanificacionAsignados(this.user.userId)
      .subscribe(
        (res) => {
          this.listNumbers1 = res || [];
          console.log(res);
        },
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
  }

  getPlanificacionProcesos() {
    this.planificacionService
      .getPlanificacionProcesos(this.user.userId)
      .subscribe(
        (res) => (this.listNumbers2 = res || []),
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
  }

  getPlanificacionCulminados() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    this.planificacionService
      .getPlanificacionCulminados(this.user.userId)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(mesActual);
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

  isComent: boolean = false;
  updateFlagsBasedOnContainer(containerId: string) {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    (this.dataUnique.flagAsignado = containerId === 'cdk-drop-list-0'),
      (this.dataUnique.flagProceso = containerId === 'cdk-drop-list-1');
    this.dataUnique.flagCulminado = containerId === 'cdk-drop-list-2';
    if (containerId === 'cdk-drop-list-1') {
      this.dataUnique.estado = 'En Proceso';
      this.dataUnique.flagAprobadoGerente = false;
      this.dataUnique.fecha_proceso = fechaActual;
    }
    if (containerId === 'cdk-drop-list-2') {
      this.dataUnique.entrega = 'En Proceso';
      this.dataUnique.estado = 'Culminado por el Auditor';
      this.dataUnique.flagDesaprobadoGerente = false;
      this.dataUnique.fecha_culminado_auditor = fechaActual;
    }
    this.crearFormulario();
    this.anularSeleccion();
    setTimeout(() => {
      this.isComent = true;
    }, 600);
  }
  updatePlanificacionStatus(data: any) {
    this.planificacionService.updatePlanificacionStatus(data).subscribe(
      (res: any) => this.messageAlert.MessageAlertFloatSucces(res.text),
      (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
    );
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
    this.planificacionService.postComentario(this.forma.value).subscribe(
      (res: any) => {
        this.messageAlert.MessageAlertFloatSucces(res.text);
        this.isComent = false;
      },
      (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
    );
  }
  anularSeleccion() {
    this.isDragEnabled = false;
    this.isDragEnabled = false;
    this.isDragEnabled2 = false;
    this.isDragEnabled3 = false;
  }

  comentarios: any = [];
  flagData: boolean = false;
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
