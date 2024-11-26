import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-modal-proceso',
  templateUrl: './modal-proceso.component.html',
  styleUrls: [
    './modal-proceso.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalProcesoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public planificacionService: PlanificacionService
  ) {}
  macroprocesos: any = [];
  @Output() datosActualizados = new EventEmitter<any>();

  ngOnInit(): void {
    this.crearFormulario();
    this.getMacroProceso();
    this.getTipoProceso();
  }
  forma: any = [];

  crearFormulario() {
    this.forma = this.fb.group({
      id_macroproceso: [null, [Validators.required]],
      id_tipo_proceso: [null, [Validators.required]],
      proceso: [null, [Validators.required]],
    });
  }

  guardarProceso() {
    console.log(this.forma.value);
    this.planificacionService.postProceso(this.forma.value).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'Proceso creado correctamente'
        );

        // this.getMacroproceso()
        this.forma.reset();
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  getMacroProceso() {
    this.planificacionService.getMacroproceso().subscribe({
      next: (res) => {
        this.macroprocesos = res;
        // this.datosActualizados.emit(this.macroproceso);
        // console.log()
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  tipoProcesos: any = [];
  getTipoProceso() {
    this.planificacionService.getTipoProceso().subscribe({
      next: (res) => {
        this.tipoProcesos = res;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }

  get macroprocesoNoValido() {
    return (
      this.forma.get('id_macroproceso').invalid &&
      this.forma.get('id_macroproceso').touched
    );
  }
  get macroprocesoValido() {
    return (
      this.forma.get('id_macroproceso').valid &&
      this.forma.get('id_macroproceso').touched
    );
  }
  get procesoNoValido() {
    return (
      this.forma.get('proceso').invalid && this.forma.get('proceso').touched
    );
  }
  get procesoValido() {
    return this.forma.get('proceso').valid && this.forma.get('proceso').touched;
  }

  get TipoProcesoNoValido() {
    return (
      this.forma.get('id_tipo_proceso').invalid &&
      this.forma.get('id_tipo_proceso').touched
    );
  }
  get TipoProcesoValido() {
    return (
      this.forma.get('id_tipo_proceso').valid &&
      this.forma.get('id_tipo_proceso').touched
    );
  }
}
