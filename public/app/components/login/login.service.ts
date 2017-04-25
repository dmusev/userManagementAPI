import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { SharedService } from './../../shared/shared.service';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  private postUrlPath = '/api/users/authenticate';
  private logoutUrlPath = '/api/users/logout';

  constructor(private http: Http,
    private router: Router,
    private sharedService: SharedService) {
        sharedService.isUserLogged = this.isUserLoggedIn();
    } // Resolve http using constructor

  login(userCred: any): Observable<any> {
    let bodyString  = JSON.stringify({ emailAddress: userCred.email, password: userCred.password });
    let headers     = new Headers({ 'Content-Type': 'application/json' });
    let options     = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.postUrlPath, bodyString, options)
                         .map((res: Response) => {
                            this.router.navigateByUrl('/home');
                            let user = res.json(); // .json() on the response to return data
                            if (user) {
                                sessionStorage.setItem('currentUser', JSON.stringify(user));
                            }
                         }).catch((error: any) => Observable.throw(
                         error || 'Server error')); // catch errors if any
  }

  logout() {
      let headers     = new Headers({ 'Content-Type': 'application/json' });
      let options     = new RequestOptions({ headers: headers }); // Create a request option
      return this.http.post(this.logoutUrlPath, {}, options)
                         .map((res: Response) => {
                            // remove user from local storage to log user out
                            sessionStorage.removeItem('currentUser');
                            this.router.navigateByUrl('/login');
                            this.sharedService.isUserLogged = false;
                         }).catch((error: any) => Observable.throw(
                         error || 'Server error')); // catch errors if any
  }

  isUserLoggedIn() {
    let userInfo = JSON.parse(sessionStorage.getItem('currentUser'));

    if (userInfo) {
        return true;
    } else {
        return false;
    }
  }
}
