import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MessageService } from 'src/app/services/Message/message.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardGuard implements CanActivate {
  constructor(public messageAlert: MessageService, private router: Router) {}
  user: any = {};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.getToken();
    this.extractUser();
    const role = this.user.role;
    if (role === 1 || role == 2 || role == 4) {
      return true;
    } else {
      this.router.navigate(['/gestion-planificacion']);
      this.messageAlert.MessageAlertWarning(
        'No tienes permiso para acceder a la Planificación de la Auditoría Anual. Te invitamos a revisar tu gestión.',
        `Estimado usuario ${this.user.userNombre}`
      );
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  extractUser() {
    const storedTokenString = this.getToken();
    if (storedTokenString && typeof storedTokenString === 'string') {
      try {
        const decodedUser = jwtDecode(storedTokenString);
        this.user = decodedUser; // Asigna el usuario decodificado aquí
        return this.user;
      } catch (error) {
        throw new Error('Invalid token');
      }
    } else {
      return undefined;
    }
  }
}
