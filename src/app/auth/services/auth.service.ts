import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl
  private _usuario!:User


  get usuario() {
    return {...this._usuario}
  }
  constructor(private http: HttpClient) {
  }
  Login(username: string, password: string) {
    const url = `${this.baseUrl}/Security/api/SEG`;
    const body: LoginRequest = {
      password,
      companyId: "10",
      username: username,
      desdeMs: true
    };
    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp =>{
        if (resp.token) {
          localStorage.setItem('token', resp.token);
          this._usuario = resp.usuario
        }
      } ),
      map(resp => resp),
      catchError(err => of(err.error.message))
    )
  }

  isAuthenticated():Observable<boolean>{
    return of(!!localStorage.getItem('token'))

  }
  logout(){
    localStorage.clear()
  }
  register(userRegister:RegisterRequest){
    const url = `${this.baseUrl}/Seleccion/api/SOL/RegistroInicialSolicitante`;

    return this.http.post<AuthResponse>(url, userRegister)
    .pipe(
      tap( resp =>{
        if (resp.token) {
          localStorage.setItem('token', resp.token);
          this._usuario = resp.usuario
        }
      } ),
      map(resp => resp),
      catchError(err => of(err.error.Message))
    )
  }
}
