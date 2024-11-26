import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { DeterminarTrimestreService } from 'src/app/services/Register/timestre/determinar-trimestre.service';
@Component({
  selector: 'app-form-comentarios',
  templateUrl: './form-comentarios.component.html',
  styleUrls: ['./form-comentarios.component.css', './button-AE.component.css'],
})
export class FormComentariosComponent implements OnInit {
  @ViewChild('exampleModalToggle2') myElementRef: ElementRef | undefined;
  @Input() hllz: any = [];
  @Input() ismodal: boolean = false;
  @Input() cod_informe: string | null = '';
  flagError: boolean = false;

  user: any = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    role: '',
    token: '',
  };
  flagAuditorExt: boolean = false;

  hallazgo: any = {
    detalle: '',
    fecha_compromiso: 0,
    id_riesgo: 0,
    id_nivel: 0,
    estatus: 0,
    recomendacion: '',
    id_informe: '',
    id_gerencia: 0,
    id_auditor: 0,
  };
  @Output('results')
  results: EventEmitter<any[]> = new EventEmitter<any[]>();
  informe: any = {
    cod_informe: '',
    created_mounth: '',
    created_year: '',
    gerencia_encargada: '',
    id_informe_auditoria: 0,
    id_tipo_auditoria: 0,
    nombre_informe: '',
    trimestre: '',
  };
  estatus: any = [];
  noview: string = '';
  modalflag: boolean = false;

  updateHallazgo: any = {
    id_hallazgo: 0,
    hallazgo_reportado: '',
    fecha_compromiso: 0,
    fecha_cierre: null,
    accion_correctiva: '',
    cerrado: false,
    estatus_Plan_Accion: '',
    recomen: '',
    comentario: '',
    id_auditor_responsable: 0,
    fecha_comentario: null,
  };

  modal: string = '';

  informe_audit: any = {};
  nvl_rsg: any = {};
  id: number = 0;
  id_informe_auditoria: number = 1;
  rsg_asc: any = {};

  Nivel_Riesgo: any = {
    nombre_nivel_riesgo: '',
  };

  message: string = '';

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private userLogged: LoginGuard,
    private determineTrimestreService: DeterminarTrimestreService,
    private messageAlert: MessageService,
    private informeAudService: InformeAudService,
    private hallazgoService: HallazgoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.modal = 'my-modal';
  }

  ngOnInit(): void {
    this.flagAuditorExt = false;
    this.user = this.userLogged.extractUser();
    this.updateHallazgo.id_auditor_responsable = this.user.userId;
    this.estatus = ['0%', '25%', '50%', '75%', '99%', 'Cerrado'];
  }

  validarActualizacion() {
    this.validacion();
    this.updateHallazgo.id_auditor_responsable = this.flagAuditorExt
      ? 99
      : this.user.userId;
    this.updateHallazgo.id_hallazgo = this.hllz.id_hallazgo;

    this.fechaCierre();

    if (this.flagError) {
      this.message = 'Todos los campos son obligatorios';
      this.messageAlert.MessageAlertError(this.message, ` Estimado Usuario  ${this.user.userNombre} !`);
    } else {
      this.modal = 'modal';

      this.hallazgoService.updateHallazgo(this.updateHallazgo).subscribe(
        (res: any) => {
          this.resetAll();
          this.messageAlert.MessageAlertFloatInfo(
            'Hallazgo actualizado correctamente!'
          );
          setTimeout(() => {
            this.ismodal = false;
          }, 2000);
        },
        (err: any) =>
          this.messageAlert.MessageAlertFloatError(err.error.message)
      );
    }
  }


  fechaCierre() {
    const fechaActual = new Date();
    const formatoFecha = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')}`;
    
    this.updateHallazgo.fecha_comentario = formatoFecha;

    if (this.updateHallazgo.estatus_Plan_Accion === 'Cerrado') {
        this.updateHallazgo.cerrado = true;
        this.updateHallazgo.fecha_cierre = formatoFecha;
    }
}


validacion() {
    const campos = [
        { key: 'hallazgo_reportado', default: this.hllz.hallazgo_reportado },
        { key: 'recomen', default: this.hllz.recomendacion },
        { key: 'accion_correctiva', default: this.hllz.accion_correctiva },
        { key: 'estatus_Plan_Accion', default: this.hllz.estatus_Plan_Accion }
    ];

    campos.forEach(({ key, default: def }) => {
        if (this.updateHallazgo[key].trim() === '') {
            this.updateHallazgo[key] = def;
        }
    });

    if (this.updateHallazgo.fecha_compromiso === 0) {
        if (this.hllz.fecha_compromiso) {
            this.updateHallazgo.fecha_compromiso = this.hllz.fecha_compromiso;
        } else {
            this.flagError = true;
        }
    }

    this.flagError = [
        this.updateHallazgo.hallazgo_reportado.trim(),
        this.updateHallazgo.recomen.trim(),
        this.updateHallazgo.fecha_compromiso,
        this.updateHallazgo.accion_correctiva.trim(),
        this.updateHallazgo.estatus_Plan_Accion.trim(),
        this.updateHallazgo.comentario
    ].some(value => value === '' || value === 0);
}


  resetAlert() {
    this.flagError = false;
  }

  resetAll() {
    this.updateHallazgo.comentario = '';
    this.flagError = false;
  }
  validAudi() {
    this.flagAuditorExt = !this.flagAuditorExt;
  }

  closeModal() {
    this.ismodal = false;
  }
}
