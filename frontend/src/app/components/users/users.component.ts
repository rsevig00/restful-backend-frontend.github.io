import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogEComponent } from '../shared/confirm-dialog-e/confirm-dialog-e.component';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['numero', 'nombre', 'apellido', 'correo', 'acciones'];	
  dataSource! : MatTableDataSource<any>;


  constructor(
    private _usuarioService: UsuarioService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.listUsuarios = this._usuarioService.getUsuarios();
    console.log("Usuarios cargados: ", this.listUsuarios);
    this.dataSource = new MatTableDataSource(this.listUsuarios);
  }

  eliminarUsuario(index: number){
    console.log(index);
    
    this._usuarioService.eliminarUsuario(index);
    this.cargarUsuarios();
  }

  agregarUsuario(usuario: Usuario){
    this._usuarioService.agregarUsuario(usuario);
    this.cargarUsuarios();
  }


  openDialog(){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(this._usuarioService.getUsuarios());
      this.cargarUsuarios();
    });
  }

  openDialogE(element: any){

    const dialogRef = this.dialog.open(ConfirmDialogEComponent, {
      data: element,

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log("Formulario editar", this._usuarioService.getUsuarios());
      this.cargarUsuarios();
    });
  }

}
