import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsersComponent } from '../../users/users.component';
import { CommonService } from 'src/app/services/share-service.service';


@Component({
  selector: 'app-confirm-dialog-e',
  templateUrl: './confirm-dialog-e.component.html',
  styleUrls: ['./confirm-dialog-e.component.css']
})
export class ConfirmDialogEComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogEComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _commonService: CommonService
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    console.log(this.editData);

    if(this.editData){
      this.form.patchValue({
        name: this.editData.name,
        email: this.editData.email,
        password: this.editData.password
      })
    }
  }

  sendMessage(): void {
    
    this._commonService.sendUpdate('Message from Sender Component to Receiver Component!');
  }

  onClickCancelar(){
    this.dialogRef.close();
  }

  editarUsuario(){
    console.log(this.form.value);

    const usuario: Usuario = {
      id: this.editData.id,
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this._usuarioService.editarUsuario(usuario);
    this.dialogRef.close(1);

  }

}
