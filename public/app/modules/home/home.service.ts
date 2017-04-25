import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {

    private getUrlPath = '/api/users/getUsers';
    private createUrlPath = '/api/users/createUser';
    private updateUrlPath = '/api/users/updateUser';
    private removeUrlPath = '/api/users/removeUser';

    constructor(private http: Http,
    private router: Router) {}

    getUsers(): Observable<any> {

        return this.http.get(this.getUrlPath)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(
                            error.json().error || 'Server error'));

     }

    createUser(userParams: any): Observable<any> {
        let bodyString  = JSON.stringify(userParams);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.createUrlPath, bodyString, options)
                .map((res: Response) => {
                let response = res.json(); // .json() on the response to return data
                if (response) {
                    return response;
                }
                }).catch((error: any) => Observable.throw(
                error || 'Server error')); // catch errors if any
    }

    updateUser(userParams: any): Observable<any> {
        let bodyString  = JSON.stringify(userParams);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.updateUrlPath + "/" + userParams.id, bodyString, options)
                .map((res: Response) => {
                let response = res.json(); // .json() on the response to return data
                if (response) {
                    return response;
                }
                }).catch((error: any) => Observable.throw(
                error || 'Server error')); // catch errors if any
    }

    removeUser(userParams: any): Observable<any> {

        return this.http.delete(this.removeUrlPath + '/' + userParams.id)
                .map((res: Response) => {
                let response = res.json(); // .json() on the response to return data
                if (response) {
                    return response;
                }
                }).catch((error: any) => Observable.throw(
                error || 'Server error')); // catch errors if any
    }
}
