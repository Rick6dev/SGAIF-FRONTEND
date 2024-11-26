import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class SelectAdminService {
  API_ADMIN = environment.apiUrl + '/api/admin';
  constructor(private http: HttpClient) {}

  getVPE() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_ADMIN, { headers });
  }

  getGrcAud() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_ADMIN + '/grcAudit', { headers });
  }

  getVP(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.API_ADMIN + '/VPE/' + id, { headers });
  }

  getGrc(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_ADMIN + '/VP/' + id, { headers });
  }
}
