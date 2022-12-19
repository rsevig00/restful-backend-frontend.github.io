import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url = 'http://localhost:8082/auth'; // Ejecucion en local
  url = '/auth'; // Ejecucion en docker
  token: any;

  constructor(private http: HttpClient, private router: Router, private _userService: UsuarioService) { }


  login(username: string, password: string) {
    this.http.post(this.url + '/signin', { username: username, password: password }).pipe(
      catchError(this.handleError)
    )
      .subscribe(async resp => {

        await this.navigateAndTokenAsync(resp);
      });
    // this.http.post(this.url + '/signin', {username: username, password: password})

  }

  navigateAndTokenAsync(resp: any) {
    localStorage.setItem('activeUsername', resp.username);
    localStorage.setItem('auth_token', resp.accessToken);
    this.router.navigate(['/home']);
  }

  handleError(error: HttpErrorResponse) {
    if(error.status == 0) {
      alert("El servicio de login no esta disponible");
    } else if(error.status == 401) {
      alert("Usuario o contraseña incorrectos");

    } else {
      alert(error.message);
    }
    return throwError(error.message);
  }
}
