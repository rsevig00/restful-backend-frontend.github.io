import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [];

  private usersUrl: string;
  
  constructor(private http: HttpClient) { 
    this.usersUrl = 'http://localhost:8080/users';
  }

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.usersUrl);
  }
  eliminarUsuario(id: number){
    let params = new HttpParams();
    params = params.append('_id', id);
    return this.http.delete(this.usersUrl, {params: params});
  }
  agregarUsuario(user: Usuario){
    console.log("Usuario del serevicio", user)
    return this.http.post(this.usersUrl, user).subscribe();
  }

  editarUsuario(usuario: Usuario){
    let params = new HttpParams();
    return this.http.put(this.usersUrl, usuario).subscribe();
  }
    
      
}