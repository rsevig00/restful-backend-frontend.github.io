import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  userComponent = new UsersComponent(this._usuarioService);
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
  ) { 
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  onClickCancelar(){
    this.dialogRef.close();
  }

  agregarUsuario(){
    console.log(this.form.value);

    const usuario: Usuario = {
      numero: Math.floor(Math.random() * 1000),
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      
    }

    this._usuarioService.agregarUsuario(usuario);
    this.userComponent.cargarUsuarios();

    this.dialogRef.close();

  }

}
