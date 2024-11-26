import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { decode } from 'jsonwebtoken';
import { Observable, of } from 'rxjs';

import jwtDecode from 'jwt-decode';
import { MessageService } from '../services/Message/message.service';
import { AuthService } from '../services/Login/auth.service';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  flagAlert: boolean = false;
  constructor(
    private router: Router,
    private messageAlert: MessageService,
    public loginService: AuthService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (this.loginService._isLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  public canRegisterActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!this.loginService._isLogged) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
  canActivatefilter() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  notCanActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!this.loginService._isLogged) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn() {
    if (!this.loginService._isLogged) {
      this.router.navigate(['/login']);
    }
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      const decodedUser: any = jwtDecode(token);
      const diferencia =
        decodedUser.exp - Math.floor(new Date().getTime() / 1000);
      this.loginService.isexpired();
      const haPasadoUnaHora = diferencia < 0;
      if (!this.flagAlert) {
        if (diferencia < 600) {
          this.messageAlert.MessageAlertWarning(
            'El acceso al sistema esta por agotarse',
            'Estimado usuario !'
          );
          this.flagAlert = true;
        }
      }
      if (!this.flagAlert) {
        if (diferencia < 300) {
          this.messageAlert.MessageAlertWarning(
            'El acceso al sistema esta por agotarse',
            'Estimado usuario !'
          );
          this.flagAlert = true;
        }
      }
      if (haPasadoUnaHora) {
        localStorage.removeItem('token');
        this.loginService.isexpired();
        this.messageAlert.MessageAlertError(
          'El token de acceso expiro',
          'Estimado usuario !'
        );
        this.router.navigate(['/login']);
      }
    }
    if (token) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }
  extractUser() {
    const storedTokenString = localStorage.getItem('token');
    if (storedTokenString && typeof storedTokenString === 'string') {
      try {
        const decodedUser = jwtDecode(storedTokenString);
        return decodedUser;
      } catch (error) {
        throw new Error('Invalid token');
      }
    } else {
      return undefined;
    }
  }

  getUserRole(): Observable<number> {
    // Simulando una llamada a un API
    const user: any = this.extractUser();
    const userRole = user.role; // Cambia esto según la lógica real
    return of(userRole);
  }
}
