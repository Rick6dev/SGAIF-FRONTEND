import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {

  API_INAUD = environment.apiUrl + '/api/vacacion';
  constructor(private http: HttpClient, public loginGuard: LoginGuard) {}
  verificarUsuario() {
    this.loginGuard.isLoggedIn();
    this.loginGuard.canActivatefilter();
  }
  getVacacion() {
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD+'/getAll', { headers });
  }
  getSingleVacation(id:number){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD+'/getOneVacation/'+id, { headers });
  }

  getfilterSingleVacation(fechasInicio:any,fechasCul:any){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD+'/filterVacation/'+fechasInicio+"/"+fechasCul, { headers });
  }
  getCountVacation(id:number){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD+'/countVacation/'+id, { headers });
  }
  createVacation(data: any) {
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.API_INAUD+"/createVacation", data, { headers });
  }

  deleteVacation(id:number){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(this.API_INAUD+"/deleteVacation/"+id , { headers });

  }

  UpdateVacation(data:any){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(this.API_INAUD+"/updateVacation/",data, { headers });

  }

  getIntraVacacion(cedula:number,id:any){
    const token = localStorage.getItem('token');
    this.loginGuard.canActivatefilter();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.API_INAUD+"/intravacation/"+cedula+"/"+id , { headers });
  }


}
