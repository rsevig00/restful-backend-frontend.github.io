import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotesService } from 'src/app/services/notes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogEComponent } from '../shared/confirm-dialog-e/confirm-dialog-e.component';
import { CommonService } from 'src/app/services/share-service.service';
import { Subscription } from 'rxjs';
import { Notes } from 'src/app/interfaces/notes';
import { Router } from '@angular/router';
import { ConfirmDialogNComponent } from '../shared/confirm-dialog-N/confirm-dialog-n/confirm-dialog-n.component';
import { ConfirmDialogNEComponent } from '../shared/confirm-dialog-NE/confirm-dialog-ne/confirm-dialog-ne.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  messageReceived: any;
  private subscriptionName: Subscription;

  listnotes: Notes[] = [
    {id: 1, title: "Nota 1", body: "Descripcion 1", date: new Date("2021-01-01")},
    {id: 2, title: "Nota 2", body: "Descripcion 2", date: new Date("2021-01-02")},
    {id: 3, title: "Nota 3", body: "Descripcion 3", date: new Date("2021-01-03")},
    {id: 4, title: "Nota 4", body: "Descripcion 4", date: new Date("2021-01-04")},
    {id: 5, title: "Nota 5", body: "Descripcion 5", date: new Date("2021-01-05")},
    {id: 6, title: "Nota 6", body: "Descripcion 6", date: new Date("2021-01-06")},
  ];

  displayedColumns: string[] = ['id', 'title', 'body', 'date' ,'acciones'];	
  dataSource = new MatTableDataSource<Notes>();
  

  constructor(
    private _notesService: NotesService,
    public dialog: MatDialog,
    private _commonService: CommonService,
    private router: Router) { 
      this.subscriptionName= this._commonService.getUpdate().subscribe
        (message => { 
        this.messageReceived = message;
        console.log("Message received: ", this.messageReceived);
        //this.cargarNotes();
      });
    }

  ngOnInit(): void {
    // this._notesService.getNotes().subscribe((res: any) => {
    //   this.dataSource.data = res});
    this.dataSource.data = this.listnotes;
  }

  ngOnDestroy() { 
    this.subscriptionName.unsubscribe();
  }

  cargarNotas(){
    // console.log("Cargando Notes");
    // this._notesService.getNotes().subscribe(async (res: any) => {
    //   await new Promise(f => setTimeout(f, 100));
    //   this.dataSource.data = res});
    // console.log("data source", this.dataSource.data);
    this.dataSource.data = this.listnotes;
  }

  eliminarNotas(index: number){
    // console.log(index);
    
    // this._notesService.eliminarNotes(index).subscribe(
    //   async data => {
    //     console.log(data);
    //     await this.cargarNotas();
    //   })
    this.listnotes.splice(index, 1);
    this.cargarNotas();
  }


  openDialog(){

    const dialogRef = this.dialog.open(ConfirmDialogNComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      await this.cargarNotas();
    });
  }

  openDialogE(element: any){

    const dialogRef = this.dialog.open(ConfirmDialogNEComponent, {
      data: element,

    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      console.log("Formulario editar", this._notesService.getNotes());
      await this.cargarNotas();

    });
  }

  logOut(){
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  navigateToUsers(){
    this.router.navigate(['/home']);
  }

}
