import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { environment } from 'src/environments/environment.prod';
// import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class PlanificacionService {
  API_INAUD = environment.apiUrl + '/api/planificacion';
  API_USER = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loginGuard: LoginGuard
  ) {}
  verificarUsuario() {
    this.loginGuard.isLoggedIn();
    this.loginGuard.canActivatefilter();
  }

  getTipoProceso() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/tipoproceso', { headers });
  }

  getMacroproceso() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/macroproceso', { headers });
  }
  postMacroproceso(macroproceso: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/macroproceso', macroproceso, {
      headers,
    });
  }

  getProceso() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/proceso', { headers });
  }

  getAuditor() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingrsa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/auditores', { headers });
  }

  postProceso(proceso: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/proceso', proceso, { headers });
  }

  getProcesoGroup(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/procesoGroup/' + id, { headers });
  }

  getSubProcesoGroup(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/subprocesoGroup/' + id, {
      headers,
    });
  }

  postSubProceso(subproceso: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/subprocesoPost', subproceso, {
      headers,
    });
  }

  postPlanificacion(data: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/postplanificacion/', data, {
      headers,
    });
  }

  getPlanificacion() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getplanificacion/', { headers });
  }

  getPlanificacionInforme() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getplanificacionInforme/', {
      headers,
    });
  }

  getPlanificacionGroup() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getplanificacionGroupEjecutada');
  }

  getAllPlanificacion() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getAllplanificacion/', { headers });
  }

  getPlanificacionAsignados(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionAsignados/' + id, {
      headers,
    });
  }

  getPlanificacionProcesos(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionProceso/' + id, {
      headers,
    });
  }

  getPlanificacionCulminados(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionCulminado/' + id, {
      headers,
    });
  }

  getPlanificacionCulminadosEntregaGerente(id_area: number) {
    const id = 1;
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD + '/getPlanificacionCulminadoEntregaGerente/' + id_area,
      { headers }
    );
  }

  getPlanificacionAprobadosGerente(id_area: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD + '/getPlanificacionAprobado/gerente/' + id_area,
      { headers }
    );
  }

  getPlanificacionRechazadosGerente(id_area: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD + '/getPlanificacionRechazado/gerente/' + id_area,
      { headers }
    );
  }

  getPlanificacionAprobadoEntregaVp() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD + '/getPlanificacionAprobadoEntregaVp/',
      { headers }
    );
  }

  getPlanificacionAprobadoVp() {
    this.verificarUsuario();
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionAprobado/vp', {
      headers,
    });
  }

  getPlanificacionAprobadoVpCondicional() {
    this.verificarUsuario();
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD + '/getPlanificacionAprobado/vp/condicinal',
      { headers }
    );
  }
  getPlanificacionRechazadosVp() {
    const id = 1;
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionRechazado/vp', {
      headers,
    });
  }

  getPlanificacionCalendar() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/calendar/', { headers });
  }

  getPlanificacionComentario(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getPlanificacionComentario/' + id, {
      headers,
    });
  }

  updatePlanificacion(data: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        'El Token de acceso expiro ingresa nuevamente al sistema'
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(this.API_INAUD + '/upadateplanificacion/', data, {
      headers,
    });
  }

  updatePlanificacionStatus(data: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        'El Token de acceso expiro ingresa nuevamente al sistema'
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(this.API_INAUD + '/upadateplanificacionStatus', data, {
      headers,
    });
  }

  deletePlanificacion(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error(
        `El Token de acceso expiro ingresa nuevamente al  sistema`
      );
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(this.API_INAUD + '/deleteplanificacion/' + id, {
      headers,
    });
  }

  postComentario(data: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      this.API_INAUD + '/postComentarioPlanificacion',
      data,
      { headers }
    );
  }
  logOut() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      throw new Error('El Token de acceso expiro ingresa nuevamente.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_USER + '/logout/' + token);
  }
}
