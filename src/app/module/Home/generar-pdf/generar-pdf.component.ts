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
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-generar-pdf',
  templateUrl: './generar-pdf.component.html',
  styleUrls: ['./generar-pdf.component.css'],
})
export class GenerarPdfComponent implements OnInit {
  constructor(
    public planificacionService: PlanificacionService,
    public hallazgoService: HallazgoService
  ) {}
  @Input() flagReporte: boolean = false;
  @Output() flagReporteChange = new EventEmitter<boolean>();
  @ViewChild('content', { static: false }) el!: ElementRef;

  results: any = [];

  ngOnInit(): void {
    this.getHallazgo();
  }
  public getHallazgo() {
    this.hallazgoService.groupHallazgo().subscribe({
      next: (res: any) => {
        this.results = res.totales;
      },
      error: (err) => {},
    });
  }

  ocultar() {
    this.flagReporte = !this.flagReporte;
    this.flagReporteChange.emit(this.flagReporte);
  }
  generarExcel() {
    const element = document.querySelector('#tabla') as HTMLTableElement;
    const ws = utils.table_to_sheet(element);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, '', false);
    writeFile(wb, 'Hallazgo-Anules.xlsx');
  }

  generarPDF() {
    const pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback: (pdf: any) => {
        pdf.save();
      },
      x: 10,
      y: 10,
      width: 1900,
    });
  }

  imprimirTabla() {
    const tabla = document.querySelector('#tabla') as HTMLTableElement;
    const ventana: any = window.open('', '', 'width=2480 height=3508');

    ventana!.document.write(
      `        <html>
          <head>
            <title>Vicepresidencia de Auditoría Interna</title>
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
            </style>
          </head>
          <body>
            ${tabla.outerHTML}
          </body>
        </html>`
    );

    ventana!.document.close();
    ventana!.print();
    const pdf = new jsPDF();
    pdf.html(ventana, {
      callback: (pdf: any) => {
        pdf.save();
      },
    });
  }
}
