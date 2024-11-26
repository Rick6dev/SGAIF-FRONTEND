import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/Login/auth.service';
import { MessageService } from 'src/app/services/Message/message.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuard implements CanActivate {
  constructor(
    public loginService: AuthService,
    private router: Router,
    private messageAlert: MessageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.getToken();
    if (token) {
      this.router.navigate(['/inicio']);
      this.messageAlert.MessageAlertFloatSucces(
        'Usuario usted  cuenta con una sesión activa'
      );
      return false;
    }
    return true; // Permite el acceso si no hay token
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // O el método que uses para almacenar el token
  }
}
