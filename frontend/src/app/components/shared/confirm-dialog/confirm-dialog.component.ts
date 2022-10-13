import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonService } from 'src/app/services/share-service.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _commonService: CommonService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
  
  

  ngOnInit(): void {
    
  }

  sendMessage(): void {
    
    this._commonService.sendUpdate('Message from Sender Component to Receiver Component!');
  }

  onClickCancelar(){
    this.dialogRef.close();
  }

  agregarUsuario(){
    console.log(this.form.value);

    const usuario: Usuario = {
      id: Math.floor(Math.random() * 1000),
      name: this.form.value.name,
      email: this.form.value.email,
      
    }

    this._usuarioService.agregarUsuario(usuario);
    this.sendMessage();

    this.dialogRef.close();

  }

}
