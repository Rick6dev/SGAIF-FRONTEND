import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class TipoAuditService {
  API_ADMIN = environment.apiUrl + '/api/admin';
  constructor(private http: HttpClient) {}

  get_TipoAud() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_ADMIN + '/tipoAud', { headers });
  }

  exist(tipoAud: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_ADMIN + '/exist', tipoAud, { headers });
  }

  createTipoAud(tipoAud: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_ADMIN + '/tipoAud', tipoAud, { headers });
  }
}
