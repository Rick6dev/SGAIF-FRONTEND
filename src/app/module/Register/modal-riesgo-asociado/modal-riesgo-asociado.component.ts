import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { RiesgoService } from 'src/app/services/Register/riesgo/riesgo.service';

@Component({
  selector: 'app-modal-riesgo-asociado',
  templateUrl: './modal-riesgo-asociado.component.html',
  styleUrls: [
    './modal-riesgo-asociado.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalRiesgoAsociadoComponent implements OnInit {
  @Input() riesgo: any = [];
  @Input() nvlRsg: any = [];
  @Output() datoActualizado = new EventEmitter<any>();
  rsgAsociado: any = {
    nombre: '',
  };
  constructor(
    public riesgoAsociado: RiesgoService,
    public messageAlert: MessageService
  ) {}

  ngOnInit(): void {}

  validarFormualrio() {
    if (this.rsgAsociado.nombre.trim() == '') {
      this.messageAlert.MessageAlertFloatInfo(
        'Todos los campos son obligatorios'
      );
    } else {
      this.guardarRegistro();
    }
  }
  respuesta: any = '';
  guardarRegistro() {
    this.riesgoAsociado.createRiesgoAsociado(this.rsgAsociado).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'El Riesgo Asociado fue agregado exitosamente'
        );
        setTimeout(() => {
          location.reload();
        }, 200);
      },
      (err) => {
        this.messageAlert.MessageAlertFloatInfo(err.error.message);
      }
    );
  }

  getRsg() {
    this.riesgoAsociado.getNivelRiesgo().subscribe(
      (res) => {
        this.riesgo = res;
        this.datoActualizado.emit(this.riesgo);
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
}
