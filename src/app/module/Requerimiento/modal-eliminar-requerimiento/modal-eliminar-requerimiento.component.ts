import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessageService } from "src/app/services/Message/message.service";
import { RequerimientoService } from "src/app/services/Requerimiento/requerimiento.service";

@Component({
  selector: "app-modal-eliminar-requerimiento",
  templateUrl: "./modal-eliminar-requerimiento.component.html",
  styleUrls: ["./modal-eliminar-requerimiento.component.css"],
})
export class ModalEliminarRequerimientoComponent implements OnInit {
  @Input() deleteData: any = {};
  requerimiento: any = {};

  @Output() datosActualizados = new EventEmitter<any>();
  constructor(
    private requerimientoService: RequerimientoService,
    private messageAlert: MessageService
  ) {}

  deleteRequerimiento() {
    this.requerimientoService
      .deleteRequerimiento(this.deleteData.id_requerimiento)
      .subscribe({
        next: (res: any) => {
          this.getRequerimiento();
          this.messageAlert.MessageAlertFloatSucces(res.text);
        },
        error: (error) => {
          this.messageAlert.MessageAlertFloatError(error.message);
          console.log(error);
        },
      });
  }
  public getRequerimiento() {
    this.requerimientoService.listRequerimiento().subscribe({
      next: (res) => {
        this.requerimiento = res;
        this.datosActualizados.emit(this.requerimiento);
      },
      error: (erro) => {
        this.messageAlert.MessageAlertFloatError(erro.message);
      },
    });
  }

  ngOnInit(): void {}
}
