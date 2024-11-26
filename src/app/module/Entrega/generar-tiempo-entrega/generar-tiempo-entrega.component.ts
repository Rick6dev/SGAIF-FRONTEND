import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import { GestionTiempoEntregaService } from 'src/app/services/Entrega/gestion-tiempo-entrega/gestion-tiempo-entrega.service';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-generar-tiempo-entrega',
  templateUrl: './generar-tiempo-entrega.component.html',
  styleUrls: ['./generar-tiempo-entrega.component.css'],
})
export class GenerarTiempoEntregaComponent implements OnInit {
  @Input() flagReporte: boolean = false;
  @Output() flagReporteChange = new EventEmitter<boolean>();
  @ViewChild('content', { static: false }) el!: ElementRef;
  constructor(
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public planificacionService: PlanificacionService,
    public gestionTiempoService: GestionTiempoEntregaService
  ) {}

  ngOnInit(): void {
    this.getPlanificacion();
  }
  results: any = [];

  getPlanificacion() {
    this.planificacionService.getPlanificacionAprobadoVp().subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        console.log(err);
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  generarPDF() {
    const pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback: (pdf: any) => {
        pdf.save();
      },
    });

    pdf.html;
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf;
      },
      x: 10,
      y: 10,
      width: 1900,
    });
  }

  imprimirTabla() {
    try {
      const tabla = this.el.nativeElement.querySelector('#tabla');
      if (!tabla) {
        throw new Error('No se encontro la  tabla  solicitada');
      }
      const ventana = window.open('', '', 'width=800,height=600');
      ventana!.document.write(`
        <html>
          <head>
            <title>Gesition Tiempo Vicepresidencia de Auditoría Interna ${this.fechaActual}</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              h3 {
                text-align: center;
              }
                s{
                  background:green;
                }
            </style>
          </head>
          <body>
            ${tabla.outerHTML}
          </body>
        </html>
      `);
      ventana!.document.close();
      ventana!.print();
    } catch (error: any) {
      this.messageAlert.MessageAlertError(
        'Estimado usuario Error al imprimir la tabla',
        error
      );
    }
  }

  generarExcel() {
    try {
      const element = document.querySelector('#tabla') as HTMLTableElement;
      if (!element) {
        throw new Error('No se encotro el elemento con id tabla ');
      }
      // Generar la hoja de calculo
      const ws = utils.table_to_sheet(element);
      const wb = utils.book_new();

      utils.book_append_sheet(wb, ws, 'Placeholder', false);
      // Guardar el archivo en  Excel
      writeFile(wb, `Gestion-Tiempo-Vp-Auditoria-${this.fechaActual}.xlsx`);
    } catch (error) {
      console.error('Error al generar el archivo en Excel ', error);
    }
  }

  ocultar() {
    this.flagReporte = !this.flagReporte;
    this.flagReporteChange.emit(this.flagReporte);
  }
  fechaActual: string = '';
  generarFecha() {
    // Crear im muevo objeto Date
    const fechaActual = new Date();
    // Obtener la  fecha en formato YY-MM-DD
    const fechaLegible = fechaActual
      .toLocaleDateString('es-ES')
      .replace(/\//g, '-');
    // Seleccionar la tabla
    this.fechaActual = fechaLegible;
  }
}
