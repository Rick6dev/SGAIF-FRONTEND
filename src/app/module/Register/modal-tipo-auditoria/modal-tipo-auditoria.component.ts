import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { TipoAuditService } from 'src/app/services/Register/tipoAuditoria/tipo-audit.service';

@Component({
  selector: 'app-modal-tipo-auditoria',
  templateUrl: './modal-tipo-auditoria.component.html',
  styleUrls: [
    './modal-tipo-auditoria.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalTipoAuditoriaComponent implements OnInit {
  @Input() tiposAud: any = [];
  @Output() datoActualizado = new EventEmitter<any>();
  flagSuccess: boolean = false;
  flagError: boolean = false;
  tipoAuditoria: any = {
    nombre: '',
    codigo: '',
  };
  message: string = '';

  constructor(
    public tipoAuditService: TipoAuditService,
    public messageAlert: MessageService
  ) {}

  ngOnInit(): void {}

  validarFormualrio() {
    if (this.tipoAuditoria.nombre === '' || this.tipoAuditoria.codigo == '') {
      this.messageAlert.MessageAlertFloatError(
        'Todos los campos son obligatorios'
      );
    } else {
      this.guardarFormulario();
    }
  }

  guardarFormulario() {
    this.tipoAuditService.createTipoAud(this.tipoAuditoria).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'La tipo deAuditoría fue Creada Correctamente'
        );
        this.getTipoAuditoria();
        this.resetForm();
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  resetForm() {
    this.tipoAuditoria.nombre = '';
    this.tipoAuditoria.codigo = '';
  }

  resetAlert() {
    this.flagError = false;
    this.flagSuccess = true;
  }
  getTipoAuditoria() {
    this.tipoAuditService.get_TipoAud().subscribe(
      (res) => {
        this.tiposAud = res;
        this.datoActualizado.emit(this.tiposAud);
      },
      (err) => {
        this.message = err.error.message;
        this.messageAlert.MessageAlertError(this.message, 'Estimado usuario!');
      }
    );
  }
}
