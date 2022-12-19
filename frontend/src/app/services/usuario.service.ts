import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [];
  usuarioActivo: String | undefined;

  private usersUrl: string;
  private headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);


  constructor(private http: HttpClient) {
    //this.usersUrl = 'http://localhost:8080/users/users'; //Ejecucion en local
    this.usersUrl = '/users/users'; //ejecucion en docker
  }

  getUsuarios(): Observable<Usuario[]> {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.get<Usuario[]>(this.usersUrl, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  eliminarUsuario(userName: string) {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.delete<string>(this.usersUrl + "/" + userName, { headers: this.headers }).pipe(
      catchError(this.handleError));
  }
  agregarUsuario(user: Usuario) {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.post(this.usersUrl, user, { headers: this.headers, observe: 'response' }).pipe(
      catchError(this.handleError),
      map(res => {
        if (res.body != 0) {
          alert(res.body)
        }
      })).subscribe();
  }

  editarUsuario(usuario: Usuario) {
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("auth_token")}`);
    return this.http.put(this.usersUrl, usuario, { headers: this.headers, observe: 'response' }).pipe(
      catchError(this.handleError),
      map(res => {
        if (res.body != 0) {
          alert(res.body)
        }
      })).subscribe();
  }

  actualizarUsuarioActivo(usuarioName: String) {
    this.usuarioActivo = usuarioName;
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      alert("El servicio de usuarios no esta disponible");
    } else if (error.status == 500) {
    } else {
      alert(error.message);
    }
    return throwError(error);
  }
}