import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  form: FormGroup;

  private usersUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) { 
    this.usersUrl = 'http://localhost:8080/api/users';
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }
  submit(){
    console.log("username is " + this.form.value.username);
    console.log("password is " + this.form.value.password);
    console.log("form is " + this.form.value);
    const user = {
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.http.post('http://localhost:8080/login', user).subscribe(
      response => {
        console.log(response);
      },
    );
    this.router.navigate(['/home']);
  }
  clear(){
    this.form.value.username = "";
    this.form.value.password = "";
  }

}
