import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { RequerimientoService } from 'src/app/services/Requerimiento/requerimiento.service';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css'],
})
export class ModalUpdateComponent implements OnInit {
  constructor(
    private requerimientoService: RequerimientoService,
    private messageAlert: MessageService
  ) {}
  @Output() datosActualizados = new EventEmitter<any>();
  @Input() UpdateFunc: any;
  @Input() updateData: any;
  ngOnInit(): void {}
  actualizarRequerimiento() {
    this.requerimientoService.updateRequerimiento(this.updateData).subscribe({
      next: (res: any) => {
        this.messageAlert.MessageAlertFloatSucces(res.text);
        this.getRequerimiento();
      },
      error: (err: any) => {
        this.messageAlert.MessageAlertFloatError(err.message);
      },
    });
  }
  requerimientosUpdate: any = [];
  public getRequerimiento() {
    this.requerimientoService.listRequerimiento().subscribe({
      next: (res) => {
        this.requerimientosUpdate = res;
        this.datosActualizados.emit(this.requerimientosUpdate);
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }
}
