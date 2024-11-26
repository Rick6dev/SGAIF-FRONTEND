import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { Hallazgo } from 'src/app/models/interface';
import { environment } from '../../../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class HallazgoService {
  API_INAUD = environment.apiUrl + '/api/hallazgo';
  constructor(private http: HttpClient, public loginGuard: LoginGuard) {}
  verificarUsuario() {
    this.loginGuard.isLoggedIn();
    this.loginGuard.canActivatefilter();
  }
  createHallazgo(hallazgo: Hallazgo) {
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD, hallazgo, { headers });
  }
  updateHallazgo(updateHallazgo: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/updateHallazgo', updateHallazgo, {
      headers,
    });
  }
  listHallazgo(pagina: number, yearInf: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/list/' + pagina + '/' + yearInf, {
      headers,
    });
  }
  groupHallazgo() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/group/', {
      headers,
    });
  }
  listComent(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/listcoment/' + id, { headers });
  }
  getOneHllz(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/' + id, { headers });
  }
  deleteHllz(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(this.API_INAUD + '/delete/' + id, { headers });
  }
  listHallazgoAll() {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/listAll/', { headers });
  }
  listHallazgofilter(id: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + '/listfilter/' + id, { headers });
  }
  aprobarHllz(hllz: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/aprobar', hllz, { headers });
  }

  aperturarHllz(hllz: any) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + '/aperturar', hllz, { headers });
  }
  filterHallazgoEstatus(estatus: string, pagina: number, yearInf: number) {
    this.verificarUsuario();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD +
        '/listfilterEstatus/' +
        pagina +
        '/' +
        estatus +
        '/' +
        yearInf,
      { headers }
    );
  }
  filterHallazgoArea(GrcAud: number, pagina: number, yearInf: number) {
    this.verificarUsuario();

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('El token de acceso expiro logueate de nuevo.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      this.API_INAUD +
        '/listfilterGrcsAud/' +
        GrcAud +
        '/' +
        pagina +
        '/' +
        yearInf,
      { headers }
    );
  }
}
