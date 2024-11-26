import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import jsPDF from "jspdf";
import { MessageService } from "src/app/services/Message/message.service";
import { PlanificacionService } from "src/app/services/Planificacion/planificacion.service";
import { utils, writeFile } from "xlsx";

@Component({
  selector: "app-generar-requerimiento",
  templateUrl: "./generar-requerimiento.component.html",
  styleUrls: ["./generar-requerimiento.component.css"],
})
export class GenerarRequerimientoComponent implements OnInit {
  constructor(
    public planificacionService: PlanificacionService,
    public messagePublic: MessageService
  ) {}
  @Input() flagReporte: boolean = false;
  @Input() requerimientos: any = [];
  @Output() flagReporteChange = new EventEmitter<boolean>();
  @ViewChild("content", { static: false }) el!: ElementRef;

  ngOnInit(): void {}

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
      const tabla = this.el.nativeElement.querySelector("#tabla");
      if (!tabla) {
        throw new Error("No se encontro la  tabla  solicitada");
      }
      const ventana = window.open("", "", "width=800,height=600");
      ventana!.document.write(`
        <html>
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
        </html>
      `);
      ventana!.document.close();
      ventana!.print();
    } catch (error: any) {
      this.messagePublic.MessageAlertError(
        "Estimado usuario Error al imprimir la tabla",
        error
      );
    }
  }

  generarExcel() {
    try {
      // Crear un nuevo objeto Date
      const fechaActual = new Date();
      // Obtener la fecha en formato YYYY-MM-DD
      const fechaLegible = fechaActual
        .toLocaleDateString("es-ES")
        .replace(/\//g, "-");
      // Seleccionar la tabla
      const element = document.querySelector("#tabla") as HTMLTableElement;
      if (!element) {
        throw new Error('No se encontró el elemento con id "tabla".');
      }
      // Generar la hoja de cálculo
      const ws = utils.table_to_sheet(element);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Placeholder", false);
      // Guardar el archivo Excel
      writeFile(wb, `Requerimietos-${fechaLegible}.xlsx`);
    } catch (error) {
      console.error("Error al generar el archivo Excel:", error);
    }
  }

  ocultar() {
    this.flagReporte = !this.flagReporte;
    this.flagReporteChange.emit(this.flagReporte);
  }
}
