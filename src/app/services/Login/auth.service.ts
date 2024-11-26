import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import {
  BehaviorSubject,
  Observable,
  of,
  tap,
  interval,
  timer,
  filter,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isLogged: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  API_USER = environment.apiUrl + '/login';
  constructor(private http: HttpClient) {
    this._isLogged = new BehaviorSubject<any>(false);
  }
  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.API_USER, user).pipe(
      tap((response) => {
        if (response.noAccess) {
          this._isLogged.next(false);
        } else {
          this._isLogged.next(true);
        }
      })
    );
  }
  isexpired(): Observable<any> {
    return timer(3599940).pipe(
      tap(() => {
        this._isLogged.next(false);
        this.loginUserGet();
      }),
      takeUntil(this._isLogged.pipe(filter((isLogged: any) => !isLogged)))
    );
  }
  loginUserGet(): Observable<any> {
    return this._isLogged.asObservable();
  }
}
