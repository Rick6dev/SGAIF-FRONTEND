import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { RiesgoService } from 'src/app/services/Register/riesgo/riesgo.service';

@Component({
  selector: 'app-modal-nivel-asociado',
  templateUrl: './modal-nivel-asociado.component.html',
  styleUrls: [
    './modal-nivel-asociado.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalNivelAsociadoComponent implements OnInit {
  @Input() nvlRsg: any = [];
  @Output() datoActualizado = new EventEmitter<any>();
  nivelRiesgo: any = {
    nombre: '',
  };

  constructor(
    private riesgoAsociado: RiesgoService,
    public messageAlert: MessageService
  ) {}

  ngOnInit(): void {}

  validarFormualrio() {
    if (this.nivelRiesgo.nombre.trim() == '') {
      this.messageAlert.MessageAlertFloatInfo(
        'Todos los campos son Obligatorios'
      );
    } else {
      this.registrarNivel();
    }
  }

  registrarNivel() {
    this.riesgoAsociado.createNivelRiesgo(this.nivelRiesgo).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'El nivel de Riesgo creado exitosamente'
        );
        this.getRsg();
      },
      (err) => {
        this.messageAlert.MessageAlertFloatInfo(err.error.message);
      }
    );
  }

  getRsg() {
    this.riesgoAsociado.getNivelRiesgo().subscribe(
      (res) => {
        this.nvlRsg = res;
        this.datoActualizado.emit(this.nvlRsg);
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
}
