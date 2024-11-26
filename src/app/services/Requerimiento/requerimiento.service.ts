import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoginGuard } from "src/app/guards/login.guards";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class RequerimientoService {
  API_INAUD = environment.apiUrl + "/api/requerimiento";

  constructor(private http: HttpClient, public loginGuard: LoginGuard) {}

  verificardUsuario() {
    this.loginGuard.isLoggedIn();
    this.loginGuard.canActivatefilter();
  }

  private requerimientoSubject: BehaviorSubject<any> = new BehaviorSubject(
    null
  );

  // Metodo  para enviar  datos
  setData(data: any): void {
    this.requerimientoSubject.next(data);
  }
  // Metodo  para  obtener  datos
  getData(): Observable<any> {
    return this.requerimientoSubject.asObservable();
  }

  listEstadoRequerimiento() {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + "/getEstadoRequerimiento", {
      headers,
    });
  }
  listRequerimiento() {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD + "/getRequerimiento", {
      headers,
    });
  }
  createRequerimiento(data: any) {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD + "/postRequerimiento", data, {
      headers,
    });
  }
  updateRequerimiento(data: any) {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();

    if (!token) {
      this.loginGuard.canActivatefilter();
      throw new Error("El Token de acceso expiro ingresa nuevamente.");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(this.API_INAUD + "/updateRequerimiento", data, {
      headers,
    });
  }

  updateRequerimientoSolicitud(data: any) {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();

    if (!token) {
      this.loginGuard.canActivatefilter();
      throw new Error("El Token de acceso expiro ingresa nuevamente.");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(this.API_INAUD + "/updateRequerimientoStatus", data, {
      headers,
    });
  }

  deleteRequerimiento(id: any) {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();
    if (!token) {
      this.loginGuard.canActivatefilter();
      throw new Error("El Token de acceso expiro ingrese nuevamente");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(this.API_INAUD + "/deleteRequerimiento/" + id, {
      headers,
    });
  }

  getInformesAuditoria() {
    this.verificardUsuario();
    const token = localStorage.getItem("token");
    this.loginGuard.canActivatefilter();
    if (!token) {
      this.loginGuard.canActivatefilter();
      throw new Error("El token de acceso expirto ingrese nuevamente");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.API_INAUD + "/getInformesAuditoria");
  }
}
