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

  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();


  constructor(
    private _usuarioService: UsuarioService,
    public dialog: MatDialog,
    private _commonService: CommonService) {
    this.subscriptionName = this._commonService.getUpdate().subscribe
      (message => {
        this.messageReceived = message;
        console.log("Message received: ", this.messageReceived);
        //this.cargarUsuarios();
      });
  }

  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((res: any) => {
      this.dataSource.data = res
    });
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  cargarUsuarios() {
    console.log("Cargando usuarios");
    this._usuarioService.getUsuarios().subscribe(async res => {
      await this.saveTableAsync(res);
    });
    console.log("data source", this.dataSource.data);
  }

  saveTableAsync(res: any) {
    console.log("Guardando tabla");
    this.dataSource.data = res;
  }


  eliminarUsuario(user: Usuario) {
    console.log(user.name)
    console.log(localStorage.getItem("activeUsername"))
    if (user.name != localStorage.getItem("activeUsername")) {
      this._usuarioService.eliminarUsuario(user.name).subscribe(
        async data => {
          console.log(data);
          await this.cargarUsuarios();
        })
    } else {
      alert("No puedes eliminar tu usuario");
    }

  }


  openDialog() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        console.log(`Dialog result: ${result}`);
        await this.cargarUsuarios();
      } else {
        console.log("No se ha aniadido nada");
      }
    });
  }

  openDialogE(element: any) {

    const dialogRef = this.dialog.open(ConfirmDialogEComponent, {
      data: element,

    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined) {
        console.log(`Dialog result: ${result}`);
        await this.cargarUsuarios();
      } else {
        console.log("No se ha modificado nada");
      }
    });
  }

}
