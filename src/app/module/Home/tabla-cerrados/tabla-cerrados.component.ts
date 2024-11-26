import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-cerrados',
  templateUrl: './tabla-cerrados.component.html',
  styleUrls: ['./tabla-cerrados.component.css'],
})
export class TablaCerradosComponent implements OnInit {
  @Input() cerrados: any = [];
  constructor() {}

  ngOnInit(): void {}
}
