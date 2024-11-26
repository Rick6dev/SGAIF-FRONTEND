import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  API_INAUD = environment.apiUrl + '/api/dashboard/';
  constructor(
    public http: HttpClient,
    private router: Router,
    public loginGuard: LoginGuard
  ) {}

  verificarUsuario() {
    this.loginGuard.isLoggedIn();
    this.loginGuard.canActivatefilter();
  }

  getRiesgoAsociadoGAOF() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso  expiro  ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/riesgoAsociadoGAOF', { headers });
  }

  getRiesgoAsociadoGAT() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/riesgoAsociadoGAT', { headers });
  }

  getTipoNivelRiesgoGAOF() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/tipoAuditoriaGAOF', { headers });
  }

  getTipoNivelRiesgoGAT() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/tipoAuditoriaGAT', { headers });
  }
}
