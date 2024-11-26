import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-modal-eliminar-planificacion',
  templateUrl: './modal-eliminar-planificacion.component.html',
  styleUrls: [
    './modal-eliminar-planificacion.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalEliminarPlanificacionComponent implements OnInit {
  constructor(
    public planificacionService: PlanificacionService,
    public userLogged: LoginGuard,
    public messageAlert: MessageService
  ) {}
  @Input() data: any = [];
  @Output() datosEliminados = new EventEmitter<any>();

  ngOnInit(): void {}

  deletePlanificacion() {
    this.planificacionService
      .deletePlanificacion(this.data.id_planificacion_auditoria)
      .subscribe(
        (res) => {
          const message: any = res;
          this.messageAlert.MessageAlertFloatSucces(message.text);
          this.getPlanificacion();
        },
        (err) => {
          this.messageAlert.MessageAlertFloatError(err.error.message);
        }
      );
  }
  results: any = [];
  getPlanificacion() {
    this.planificacionService.getProceso();

    this.planificacionService.getPlanificacion().subscribe(
      (res) => {
        this.results = res;
        console.log(res);
        this.datosEliminados.emit(this.results);
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
}
