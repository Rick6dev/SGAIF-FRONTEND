import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-todos',
  templateUrl: './tabla-todos.component.html',
  styleUrls: ['./tabla-todos.component.css'],
})
export class TablaTodosComponent implements OnInit {
  @Input() totales: any = [];
  constructor() {}

  ngOnInit(): void {}
}
