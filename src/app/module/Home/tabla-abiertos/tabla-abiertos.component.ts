import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-abiertos',
  templateUrl: './tabla-abiertos.component.html',
  styleUrls: ['./tabla-abiertos.component.css'],
})
export class TablaAbiertosComponent implements OnInit {
  @Input() abiertos: any = [];
  constructor() {}

  ngOnInit(): void {}
}
