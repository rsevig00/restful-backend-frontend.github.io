import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'

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
    this.usersUrl = 'http://localhost:8080/users';
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
    //Llama al http authenticate
    let params = new HttpParams();
    params = params.append('username', this.form.value.username);
    params = params.append('password', this.form.value.password);
    this.http.post(this.usersUrl, {params: params}).subscribe(
      response => {
        console.log("Response", response);
      },
      error => {
        console.log("Error", error);
      }
    );
    this.router.navigate(['/home']);
  }
  clear(){
    this.form.value.username = "";
    this.form.value.password = "";
  }

}
