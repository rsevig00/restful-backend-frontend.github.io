import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogEComponent } from '../shared/confirm-dialog-e/confirm-dialog-e.component';
import { CommonService } from 'src/app/services/share-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  messageReceived: any;
  private subscriptionName: Subscription;

  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'password' ,'acciones'];	
  dataSource = new MatTableDataSource<Usuario>();
  

  constructor(
    private _usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _commonService: CommonService) { 
      this.subscriptionName= this._commonService.getUpdate().subscribe
        (message => { 
        this.messageReceived = message;
        console.log("Message received: ", this.messageReceived);
        //this.cargarUsuarios();
      });
    }

  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((res: any) => {
      this.dataSource.data = res});
  }

  ngOnDestroy() { 
    this.subscriptionName.unsubscribe();
  }

  cargarUsuarios(){
    console.log("Cargando usuarios");
    this._usuarioService.getUsuarios().subscribe(async (res: any) => {
      await new Promise(f => setTimeout(f, 100));
      this.dataSource.data = res});
    console.log("data source", this.dataSource.data);
  }

  eliminarUsuario(index: number){
    console.log(index);
    
    if(index !=  parseInt(localStorage.getItem("activeID")!)){
      console.log("Index a eliminar ", index, " id del usuario logueado ", localStorage.getItem("activeID"));
      this._usuarioService.eliminarUsuario(index).subscribe(
        async data => {
          console.log(data);
          await this.cargarUsuarios();
        })
    } else {
      alert("No puedes eliminar tu usuario");
    }
    
  }


  openDialog(){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      await this.cargarUsuarios();
    });
  }

  openDialogE(element: any){

    const dialogRef = this.dialog.open(ConfirmDialogEComponent, {
      data: element,

    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      console.log("Formulario editar", this._usuarioService.getUsuarios());
      await this.cargarUsuarios();

    });
  }

}
