import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from './data.service';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

 
  constructor(private service: DataService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.service.loggedIn()){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
