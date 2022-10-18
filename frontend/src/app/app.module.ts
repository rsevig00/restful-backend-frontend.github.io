import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MaterialExampleModule} from '../material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './components/users/users.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogEComponent } from './components/shared/confirm-dialog-e/confirm-dialog-e.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    UsersComponent,
    ConfirmDialogComponent,
    ConfirmDialogEComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MaterialExampleModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }