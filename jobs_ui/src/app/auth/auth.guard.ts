import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { mapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var currentUser = this.authenticationService && this.authenticationService.currentUserValue;
        // need to remove once we found the solution
        if(!currentUser) {
            // as a fallback get the currentUser from local storage
            currentUser = JSON.parse(localStorage.getItem("currentUser"));
        }
        if (currentUser) {
          return true;
        } 
        else {
            // not logged in so redirect to login page with the return url
           this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
           return false;
        }
       // return false;
    }
}