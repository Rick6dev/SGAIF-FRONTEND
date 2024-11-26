import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { environment } from '../../../../src/environments/environment.prod';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ReportAdminService {
  API_INAUD = environment.apiUrl + '/api/hallazgo';
  constructor(private http: HttpClient, public loginGuard: LoginGuard,private router: Router) {}

  reportGerencia(idgrc: number) {
    this.loginGuard.canActivatefilter();
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      throw new  Error('El Token de acceso expirto ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/reportGrc/' + idgrc, { headers });
  }
  reportVPE(idVpe: number) {
    this.loginGuard.canActivatefilter();
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      throw new  Error('El Token de acceso expirto ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/reportVpe/' + idVpe, { headers });
  }
  reportVP(idVp: number) {
    this.loginGuard.canActivatefilter();
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
      throw new  Error('El Token de acceso expirto ingresa nuevamente');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/reportVp/' + idVp, { headers });
  }
}
