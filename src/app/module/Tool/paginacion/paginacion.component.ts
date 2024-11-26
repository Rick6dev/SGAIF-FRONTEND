import { Component, Input, OnInit } from '@angular/core';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css'],
})
export class PaginacionComponent implements OnInit {
  @Input() nrmPaginas: any = [];
  @Input() elemento: boolean = false;
  constructor(
    private hallazgoService: HallazgoService,
    private informeAudService: InformeAudService
  ) {}

  ngOnInit(): void {}

  getElement(page: number, year: number, areaTrabajo: any) {
    console.log(page);
    if (this.elemento) {
      this.informeAudService.listInforme(page, year, areaTrabajo);
    }
  }
}
