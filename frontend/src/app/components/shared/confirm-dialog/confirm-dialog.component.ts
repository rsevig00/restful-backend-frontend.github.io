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
      email: ['', Validators.required],
      password: ['', Validators.required]
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

    let status = this.validarPassword();


    if(status.length > 0){
      alert(status);
      return;
    }
    
    const usuario: Usuario = {
      id: Math.floor(Math.random() * 1000),
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    let responsePost = this._usuarioService.agregarUsuario(usuario);
    

    this.sendMessage();

    this.dialogRef.close(1);
  }

  validarPassword() {

    const password = this.form.value.password;
    var numeros = new RegExp('^(?=.*[0-9])');
    var minusculas = new RegExp('^(?=.*[a-z])');
    var mayusculas = new RegExp('^(?=.*[A-Z])');
    var caracteres = new RegExp('^(?=.*[!@#$%^&*])');
    let mensaje = new String("");

    if (8 > password.length && password.length <= 32) {
      mensaje = mensaje.concat("La contraseña debe tener entre 8 y 32 caracteres.\n");
    }

    if(!numeros.test(password)){
      mensaje = mensaje.concat("La contraseña debe tener al menos un número.\n");
    }

    if(!minusculas.test(password)){
      mensaje = mensaje.concat("La contraseña debe tener al menos una minúscula.\n");
    }

    if(!mayusculas.test(password)){
      mensaje = mensaje.concat("La contraseña debe tener al menos una mayúscula.\n");
    }

    if(!caracteres.test(password)){
      mensaje = mensaje.concat("La contraseña debe tener al menos un caracter especial.\n");
    }
    return mensaje;

  }

}
