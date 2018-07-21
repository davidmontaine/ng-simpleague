import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
 
import { AuthenticationService } from './authentication.service';
import { GlobalService } from './global.service';
import { Mainuser } from '../_models/mainuser';
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        private global: GlobalService,
        private router: Router) {}

    email(email: string): Observable<string> {
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.global.url + '/user/email',
            headers: headers,
            body: JSON.stringify({ email: email})
        });
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {
                let result = response.json() && response.json().result;
            }).catch(err => {
                if (err.status === 401) {
                    this.authenticationService.logout();
                    this.router.navigate(['/login']);                
                    return 'Unauthorized';
                }
            });
    }        

    forgotPassword(email: string): Observable<string> {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.global.url + '/user/forgotPassword',
            headers: headers,
            body: JSON.stringify({ email: email, password: '', passwordText: '' })
        });
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {
                let result = response.json() && response.json().result;
                return result;
            });            
    }    

    getUser(email: string): Observable<Object> {
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        headers.append('Accept', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: this.global.url + '/user/' + email,
            headers: headers
        });
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {
                let email = response.json() && response.json().credentials.email;
                let token = response.json() && response.json().uuid;                
                let verified = response.json() && response.json().verified;                
                let name = response.json() && response.json().name;                                
                let user = {email: email, token: token, verified: verified, name: name};
                return user;
            }).catch(err => {
                if (err.status === 401) {
                    this.authenticationService.logout();
                    this.router.navigate(['/login']);                
                    return 'Unauthorized';
                }
            });            
    }

    resetPassword(email: string, password: string, passwordNew: string): Observable<string> {
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });        
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.global.url + '/user/resetPassword',
            headers: headers,
            body: JSON.stringify({ email: email, passwordText: passwordNew, passwordCurrent: password })
        });
        let req = this.http.request(new Request(requestoptions));
        
        return req.map((response: Response) => {        
            let result = response.json() && response.json().result;
            return result;
        }).catch(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                this.router.navigate(['/login']);                
                return 'Unauthorized';
            }
        });
    }            

    signup(user: Mainuser): Observable<boolean> {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.global.url + '/user',
            headers: headers,
            body: JSON.stringify( user )
        });
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {      
                let result = response.json() && response.json().result;

                if (result === 'success') {
                    return true;
                }
                return false;
            });            
    }        

    update(user: Mainuser): Observable<string> {
        var headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });        
        headers.append('Accept', 'application/json');  
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: this.global.url + '/user',
            headers: headers,
            body: JSON.stringify( user )
        });
        let req = this.http.request(new Request(requestoptions));
        
        return req.map((response: Response) => {        
            let result = response.json() && response.json().result;
            return result;
        }).catch(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                this.router.navigate(['/login']);                
                return 'Unauthorized';
            }            
        });            
    }            
}
