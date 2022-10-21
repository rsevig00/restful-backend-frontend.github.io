import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = '/api/auth';
  token: any;
 
  constructor(private http: HttpClient,private router: Router) { }


  login(username: string, password: string) {
    this.http.post(this.url + '/signin', {username: username, password: password})
    .subscribe((resp: any) => {
     
      this.router.navigate(['/home']);
      localStorage.setItem('auth_token', resp.accessToken);
      console.log(localStorage.getItem('auth_token'));
      
    },
    (err: any) => {
      alert("No existe ningún usuario con estos datos");
    });

    this.http.post(this.url + '/signin', {username: username, password: password})
  }
}
