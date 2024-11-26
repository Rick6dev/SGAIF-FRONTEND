import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ccr-sga',
  templateUrl: './ccr-sga.component.html',
  styleUrls: ['./ccr-sga.component.css'],
})
export class CcrSgaComponent implements OnInit {
  token: any = null;
  isLogged: boolean = false;
  constructor() {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    setInterval(() => {
      this.isLogged = this.token ? true : false;
    }, 200);
  }
}
