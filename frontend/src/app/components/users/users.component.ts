import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['numero', 'nombre', 'apellido', 'correo', 'acciones'];	
  dataSource! : MatTableDataSource<any>;


  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.listUsuarios = this._usuarioService.getUsuarios();
    this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  eliminarUsuario(index: number){
    console.log(index);
    
    this._usuarioService.eliminarUsuario(index);
    this.cargarUsuarios();
  }

}
