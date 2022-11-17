import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonService } from 'src/app/services/share-service.service';
import { Notes } from 'src/app/interfaces/notes';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-confirm-dialog-n',
  templateUrl: './confirm-dialog-n.component.html',
  styleUrls: ['./confirm-dialog-n.component.css']
})
export class ConfirmDialogNComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogNComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private fb: FormBuilder,
    private _noteservice: NotesService,
    private _commonService: CommonService
  ) { 
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      date: ['', Validators.required]
    });
  }
  
  

  ngOnInit(): void {
    
  }

  sendMessage(): void {
    
    this._commonService.sendUpdate('Message from Sender Component to Receiver Component!');
  }

  onClickCancelar(){
    console.log("Se ha cerrado")
    this.dialogRef.close();
  }

  agregarNota(){
    console.log("eSTO ESTA ENTRANDO");

    
    const nota: Notes = {
      id: -1,
      title: this.form.value.title,
      body: this.form.value.body,
      date: this.form.value.date
    }

    let responsePost = this._noteservice.agregarNotes(nota);
    

    this.sendMessage();

    this.dialogRef.close(1);
  }

}
