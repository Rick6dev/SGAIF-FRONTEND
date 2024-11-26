import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-modal-macroproceso',
  templateUrl: './modal-macroproceso.component.html',
  styleUrls: [
    './modal-macroproceso.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalMacroprocesoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public planificacionService: PlanificacionService
  ) {}
  @Input() macroproceso: any = [];
  @Output() datosActualizados = new EventEmitter<any>();

  ngOnInit(): void {
    this.crearFormulario();
  }
  forma: any = [];

  crearFormulario() {
    this.forma = this.fb.group({
      macroproceso: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  guardarMacroproces() {
    this.planificacionService.postMacroproceso(this.forma.value).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'Macroproceso creado correctamente'
        );

        this.getMacroproceso();
        this.forma.reset();
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  getMacroproceso() {
    this.planificacionService.getMacroproceso().subscribe(
      (res) => {
        this.macroproceso = res;
        this.datosActualizados.emit(this.macroproceso);
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  get MacroprocesoNoValido() {
    return (
      this.forma.get('macroproceso').invalid &&
      this.forma.get('macroproceso').touched
    );
  }
  get MacroprocesoValido() {
    return (
      this.forma.get('macroproceso').valid &&
      this.forma.get('macroproceso').touched
    );
  }
}
