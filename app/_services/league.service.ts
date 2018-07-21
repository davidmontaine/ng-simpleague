import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

import { AppComponent } from '../app.component';
import { AuthenticationService } from './authentication.service';
import { GlobalService } from './global.service';
import { Mainuser } from '../_models/mainuser';
import { User } from '../_models/user';
 
@Injectable()
export class LeagueService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService,
        private router: Router,
        private global: GlobalService) {}

    getLeagues(): Observable<string> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.authenticationService.token);
        headers.append('Accept', 'application/json');        

        var requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: this.global.url + '/leagues',
            headers: headers
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
