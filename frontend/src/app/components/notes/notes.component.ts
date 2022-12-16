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

  listnotes: Notes[] = [];

  displayedColumns: string[] = ['id', 'title', 'body', 'date', 'acciones'];
  dataSource = new MatTableDataSource<Notes>();


  constructor(
    private _notesService: NotesService,
    public dialog: MatDialog,
    private _commonService: CommonService,
    private router: Router) {
    this.subscriptionName = this._commonService.getUpdate().subscribe
      (message => {
        this.messageReceived = message;
        //this.cargarNotes();
      });
  }

  ngOnInit(): void {
    this._notesService.getNotes().subscribe((res: any) => {
      this.dataSource.data = res
    });
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  cargarNotas() {
    this._notesService.getNotes().subscribe(async (res: any) => {
      await this.saveTableAsync(res);
    });

  }

  saveTableAsync(res: any) {
    this.dataSource.data = res;
  }

  eliminarNotas(index: number) {

    this._notesService.eliminarNotes(index).subscribe(
      async data => {
        await this.cargarNotas();
      })
  }


  openDialog() {

    const dialogRef = this.dialog.open(ConfirmDialogNComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined){
        await this.cargarNotas();
      } else {
      }
      
    });
  }

  openDialogE(element: any) {

    const dialogRef = this.dialog.open(ConfirmDialogNEComponent, {
      data: element,

    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result != undefined){
        await this.cargarNotas();
      } else {
      }

    });
  }

  logOut() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  navigateToUsers() {
    this.router.navigate(['/home']);
  }

}
