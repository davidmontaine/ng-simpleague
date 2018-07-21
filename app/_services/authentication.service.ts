import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { GlobalService } from './global.service';
 
@Injectable()
export class AuthenticationService {
    public token: string;
    public verified: string;
 
    constructor(private http: Http, private global: GlobalService) {
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.verified = currentUser && currentUser.verified;        
    }
 
    login(email: string, password: string): Observable<boolean> {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: this.global.url + '/user/login',
            headers: headers,
            body: JSON.stringify({ email: email, password: password, passwordText: password })
        })
        return this.http.request(new Request(requestoptions))
            .map((response: Response) => {
                let result = response.json() && response.json().result;
                let token = response.json() && response.json().token;
                let verified = response.json() && response.json().verified;                

                if (result === 'success') {
                    this.token = token;
                    this.verified = verified;                    
                    sessionStorage.setItem('currentUser', JSON.stringify({ email: email, token: token, verified: verified }));
                    return true;
                }
                return false;
            });
    }
 
    logout(): void {
        this.token = null;
        sessionStorage.removeItem('currentUser');
    }
}
