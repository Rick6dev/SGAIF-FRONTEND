import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informe, TipoAuditoria } from 'src/app/models/interface';
import { environment } from '../../../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InformeAudService {
  API_INAUD = environment.apiUrl + '/api/informeAud';
  constructor(private http: HttpClient) {}
  private informeSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  // Metodo para enviar datos
  setData(data: any): void {
    this.informeSubject.next(data);
  }

  // Metodo para  obtener data
  getData(): Observable<any> {
    return this.informeSubject.asObservable();
  }

  createInforme(informe: Informe) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD, informe, { headers });
  }

  checkCode(code: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/check/' + code, { headers });
  }

  listInforme(pagina: any, yearInf: number, areaTrabajo: any) {
    //  const token = localStorage.getItem('token');

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      this.API_INAUD + '/list/' + pagina + '/' + yearInf + '/' + areaTrabajo,
      {
        headers,
      }
    );
  }

  getOneCod(code: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/getOneInforme/' + code, {
      headers,
    });
  }

  deleteInforme(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(this.API_INAUD + '/delete/' + id, { headers });
  }

  updateInforme(informe: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/update', informe, { headers });
  }
}
