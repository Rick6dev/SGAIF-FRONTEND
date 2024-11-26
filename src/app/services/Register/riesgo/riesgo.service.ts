import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class RiesgoService {
  API_RIESGO = environment.apiUrl + '/api/admin';
  constructor(private http: HttpClient) {}
  getNivelRiesgo() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_RIESGO + '/nivelRiesgo/', { headers });
  }
  createNivelRiesgo(nvlRiesgo: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_RIESGO + '/nivelRiesgo/', nvlRiesgo, {
      headers,
    });
  }
  getRiesgoAsociado() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_RIESGO + '/riesgoAsociado/', { headers });
  }
  createRiesgoAsociado(rsgAsociado: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_RIESGO + '/riesgoAsociado', rsgAsociado, {
      headers,
    });
  }
}
