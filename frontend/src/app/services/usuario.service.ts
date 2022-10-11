import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [
    {id: 1, name: 'Daniel', email: 'daniel@gmail.com'},
    {id: 100, name: 'Juan', email: 'juanperez@gmail.com'},
    {id: 3, name: 'Maria', email: 'juanperez@gmail.com'},
    {id: 4, name: 'Pedro', email: 'juanperez@gmail.com'},
    {id: 5, name: 'Luis', email: 'juanperez@gmail.com'},
    {id: 6, name: 'Jose', email: 'juanperez@gmail.com'},
    {id: 7, name: 'Carlos', email: 'juanperez@gmail.com'}
  ];

  constructor() { }

  getUsuarios(){
    return this.listUsuarios.slice();
  }
  eliminarUsuario(index: number){
    this.listUsuarios.splice(index, 1);
  }
  agregarUsuario(usuario: Usuario){
    console.log(usuario);
    this.listUsuarios.push(usuario);
  }

  editarUsuario(usuario: Usuario, index: number){
    this.listUsuarios.forEach((element, i) => {
      if(element.id == index){
        this.listUsuarios[i] = usuario;
      }
    });
  }
    
      
}
