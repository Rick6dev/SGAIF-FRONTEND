import { Component, OnInit } from '@angular/core';
import { RequerimientoService } from 'src/app/services/Requerimiento/requerimiento.service';

@Component({
  selector: 'app-list-modal-requrimiento',
  templateUrl: './list-modal-requrimiento.component.html',
  styleUrls: ['./list-modal-requrimiento.component.css'],
})
export class ListModalRequrimientoComponent implements OnInit {
  constructor(private requriemientoService: RequerimientoService) {}
  requerimiento: any = {};
  ngOnInit(): void {
    this.getRequerimiento();
  }

  getRequerimiento() {
    this.requriemientoService.getData().subscribe((data) => {
      this.requerimiento = data;
    });
  }
}
