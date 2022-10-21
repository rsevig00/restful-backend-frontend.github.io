import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
 
@Injectable()
export class AuthGuard implements CanActivate {



    constructor(private authService: AuthService, private router: Router) { }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> 
        | Promise<boolean | UrlTree> | boolean | UrlTree
         {
        return this.isAuthenticated()
      }
      isAuthenticated():Observable<boolean | UrlTree> 
      |Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise( 
            (resolve, reject) =>{ 
                setTimeout(()=>{ 
                    resolve(localStorage.getItem('auth_token') != null);
                },800); 
            }
        ).then(
          (authenticated :any) => { 
            if(authenticated){
                return true; 
            }else{
                this.router.navigate(['/']); 
                return false
            }
        }
        )
    }
}