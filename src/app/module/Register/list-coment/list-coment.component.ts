import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-coment',
  templateUrl: './list-coment.component.html',
  styleUrls: ['./list-coment.component.css'],
})
export class ListComentComponent implements OnInit {
  @Input() coment: any = {};
  constructor() {}

  // Numeros
  idCollapse: number = 0;
  idItem: number = 0;
  i: number = 0;
  // Banderas
  mostrar: boolean = false;

  ngOnInit(): void {}

  toggle() {
    this.mostrar = !this.mostrar;
  }
}
