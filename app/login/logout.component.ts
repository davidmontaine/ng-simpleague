import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthenticationService } from '../_services/authentication.service';
 
@Component({
    moduleId: module.id,
    template: ''
})
 
export class LogoutComponent implements OnInit {
    form: any = {};
    model: any = {};
    loading = false;
    error = '';
    ac: AppComponent;
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private appComponent: AppComponent) { 

        this.ac = appComponent;
    }
 
    ngOnInit() {
        this.authenticationService.logout();
        this.appComponent.email = '';
        this.router.navigate(['/home']);
    }
}
