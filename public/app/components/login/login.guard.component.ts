import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router,
    private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userInfo = JSON.parse(sessionStorage.getItem('currentUser'));
        if (userInfo && userInfo.user) {
            this.router.navigateByUrl('/home');
            return false;
        } else {
            return true;
        }
    }
}
