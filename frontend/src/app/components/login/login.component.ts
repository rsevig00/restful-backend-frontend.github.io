import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup;

  private usersUrl: string;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private _authService: AuthService,

  ) {
    this.usersUrl = 'http://localhost:8082/auth/users';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  submit() {
    console.log("username is " + this.form.value.username);
    console.log("password is " + this.form.value.password);
    console.log("form is " + this.form.value);
    this._authService.login(this.form.value.username, this.form.value.password);
  }
  clear() {
    this.form.value.username = "";
    this.form.value.password = "";
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
