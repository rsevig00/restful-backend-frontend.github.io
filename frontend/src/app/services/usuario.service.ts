import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [];
  // listUsuarios: Usuario[] = [
  //   {numero: 1, nombre: 'Daniel', apellido: 'Fernandez', correo: 'daniel@gmail.com'},
  //   {numero: 100, nombre: 'Juan', apellido: 'Perez', correo: 'juanperez@gmail.com'},
  //   {numero: 3, nombre: 'Maria', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
  //   {numero: 4, nombre: 'Pedro', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
  //   {numero: 5, nombre: 'Luis', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
  //   {numero: 6, nombre: 'Jose', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
  //   {numero: 7, nombre: 'Carlos', apellido: 'Gomez', correo: 'juanperez@gmail.com'}
  // ];
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
    // this.listUsuarios.splice(index, 1);
  }
  agregarUsuario(usuario: Usuario){
    console.log(usuario);
    this.listUsuarios.push(usuario);
  }

  editarUsuario(usuario: Usuario, index: number){
    
  }
    
      
}