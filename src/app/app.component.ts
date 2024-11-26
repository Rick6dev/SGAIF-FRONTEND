import { Component, Optional, ViewChild } from '@angular/core';
import { NavigationComponent } from './module/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    this.navigationComponent = null;
  }

  @ViewChild('navigation') navigationComponent: NavigationComponent | null;
  title = 'ccr-frontend-auditoria';
  token: any = null;
  isLogged: boolean = false;
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    setTimeout(() => {}, 200);
  }
  someMethod() {
    if (this.navigationComponent) {
      this.navigationComponent.updateNav();
      this.navigationComponent.obtenerFecha();
    }
  }
}
