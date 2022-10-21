import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth-guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {path: 'home', canActivate:[AuthGuard], component: HomeComponent},
  {path: '', component: LoginComponent},
  { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
