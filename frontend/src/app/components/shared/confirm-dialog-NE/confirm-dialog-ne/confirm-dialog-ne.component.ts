import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonService } from 'src/app/services/share-service.service';
import { Notes } from 'src/app/interfaces/notes';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-confirm-dialog-ne',
  templateUrl: './confirm-dialog-ne.component.html',
  styleUrls: ['./confirm-dialog-ne.component.css']
})
export class ConfirmDialogNEComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogNEComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
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
    console.log(this.editData);

    if(this.editData){
      this.form.patchValue({
        title: this.editData.title,
        body: this.editData.body,
        date: this.editData.date
      })
    }
  }

  sendMessage(): void {
    
    this._commonService.sendUpdate('Message from Sender Component to Receiver Component!');
  }

  onClickCancelar(){
    this.dialogRef.close();
  }

  editarNota(){
    console.log(this.form.value);

    const nota: Notes = {
      id: this.editData.id,
      title: this.form.value.title,
      body: this.form.value.body,
      date: this.form.value.date
    }
    this._noteservice.editarNotes(nota);
    this.dialogRef.close(1);

  }

}
