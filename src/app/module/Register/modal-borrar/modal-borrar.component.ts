import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';

@Component({
  selector: 'app-modal-borrar',
  templateUrl: './modal-borrar.component.html',
  styleUrls: [
    './modal-borrar.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
  ],
})
export class ModalBorrarComponent implements OnInit {
  @Input() results: any = [];
  @Output() datosEliminados = new EventEmitter<any>();
  @Input() id_element: number = 0;
  @Input() isHllz: boolean = false;
  @Input() pagina: number = 1;
  @Input() yearInf: number = 0;
  @Input() areaTrabajo: any = 0;
  message: string = '';
  constructor(
    private hallazgoService: HallazgoService,
    private informeAudService: InformeAudService,
    public messageAlert: MessageService
  ) {}

  ngOnInit(): void {}

  deleteHllz(id: number) {
    this.hallazgoService.deleteHllz(id).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'Hallazgo eliminado con exito!'
        );
        this.getHallazgo();
        // window.location.reload();
      },
      (err) => {
        this.message = err.error.message;
        this.messageAlert.MessageAlertError(
          this.message,
          'Estimado Usuario,lo sentimos!'
        );
      }
    );
  }
  deleteInf(id: number) {
    this.informeAudService.deleteInforme(id).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          'Hallazgo eliminado con exito!'
        );
        this.getInforme(this.pagina, this.yearInf);
      },
      (err) => {
        this.message = err.error.message;
        this.messageAlert.MessageAlertError(
          this.message,
          'Estimado Usuario,lo sentimos!'
        );
      }
    );
  }

  getInforme(pagina: number, yearInf: number) {
    this.informeAudService
      .listInforme(pagina, this.yearInf, this.areaTrabajo)
      .subscribe(
        (res) => {
          setTimeout(() => {
            this.results = res;

            if (this.results.data) {
              this.results = this.results.data;
              this.datosEliminados.emit(this.results);
            }
          }, 50);
        },
        (err) => console.log(err)
      );
  }

  public getHallazgo() {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    this.yearInf = this.yearInf ? this.yearInf : año;
    this.hallazgoService.listHallazgo(1, this.yearInf).subscribe(
      (res) => {
        this.results = res;
        console.log(res);
        this.pagina = this.results.pagina;
        console.log(this.results);

        if (this.results.data) {
          this.results = this.results.data;
          this.datosEliminados.emit(this.results);
        }
      },
      (err) => {
        this.messageAlert.MessageAlertFloatInfo(err.error.message);
        window.location.reload();
      }
    );
  }
}
