import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsersComponent } from '../../users/users.component';

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
  ) { 
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    console.log(this.editData);

    if(this.editData){
      this.form.patchValue({
        nombre: this.editData.nombre,
        apellido: this.editData.apellido,
        correo: this.editData.correo
      })
    }
  }

  onClickCancelar(){
    this.dialogRef.close();
  }

  editarUsuario(){
    console.log(this.form.value);

    const usuario: Usuario = {
      numero: this.editData.numero,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      
    }
    this._usuarioService.editarUsuario(usuario, this.editData.numero);
    this.dialogRef.close();

  }

}
