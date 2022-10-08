import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [
    {numero: 1, nombre: 'Daniel', apellido: 'Fernandez', correo: 'daniel@gmail.com'},
    {numero: 2, nombre: 'Juan', apellido: 'Perez', correo: 'juanperez@gmail.com'},
    {numero: 3, nombre: 'Maria', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
    {numero: 4, nombre: 'Pedro', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
    {numero: 5, nombre: 'Luis', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
    {numero: 6, nombre: 'Jose', apellido: 'Gomez', correo: 'juanperez@gmail.com'},
    {numero: 7, nombre: 'Carlos', apellido: 'Gomez', correo: 'juanperez@gmail.com'}
  ];

  constructor() { }

  getUsuarios(){
    return this.listUsuarios.slice();
  }
  eliminarUsuario(index: number){
    this.listUsuarios.splice(index, 1);
  }
}
