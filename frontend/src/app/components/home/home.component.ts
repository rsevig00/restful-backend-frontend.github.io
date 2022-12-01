import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Formulario ususario"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logOut() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  navigateToNotes() {
    this.router.navigate(['note']);
  }


}
