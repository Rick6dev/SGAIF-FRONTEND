import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';

@Component({
  selector: 'app-plan-ejecucion-global',
  templateUrl: './plan-ejecucion-global.component.html',
  styleUrls: ['./plan-ejecucion-global.component.css'],
})
export class PlanEjecucionGlobalComponent implements OnInit {
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  constructor(public userLogged: LoginGuard) {}
  flagAuditor: boolean = false;
  flagGerente: boolean = false;
  flagVp: boolean = false;
  flagDev: boolean = false;
  isLoading: boolean = true;
  ngOnInit(): void {
    this.user = this.userLogged.extractUser() as User;

    setTimeout(() => {
      this.flagAuditor = this.user.role === 3 ? true : false;
      this.flagDev = this.user.role === 4 ? true : false;
      this.flagGerente = this.user.role === 2 ? true : false;
      this.flagVp = this.user.role === 1 ? true : false;
      this.isLoading = false;
    }, 100);
  }
}
