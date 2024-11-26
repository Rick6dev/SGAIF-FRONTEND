import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import { utils, writeFile } from 'xlsx';
@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css'],
})
export class GenerarReporteComponent implements OnInit {
  @Input() flagReporte: boolean = false;
  @Input() name: string = '';
  @Input() nameVpe: string = '';
  @Input() results: any = [];
  @Output() flagReporteChange = new EventEmitter<boolean>();
  @ViewChild('content', { static: false }) el!: ElementRef;

  toggleFlagReporte() {
    this.flagReporte = !this.flagReporte;
  }
  VPE: string = '';
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nameVpe']) {
    }
    if (changes['name']) {
    }
  }

  ocultar() {
    this.flagReporte = !this.flagReporte;
    this.flagReporteChange.emit(this.flagReporte);
  }

  generarPdf() {
    const pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback: (pdf: any) => {
        pdf.save(`${this.name}.pdf`);
      },
    });
  }
  generarExcel() {
    const element = document.querySelector('#tabla') as HTMLTableElement;
    const ws = utils.table_to_sheet(element);
    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, 'Placeholder', false);
    writeFile(wb, `${this.name}.xlsx`);
  }
}
