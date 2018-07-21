import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { AuthenticationService } from '../_services/authentication.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
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
        this.clear();
        this.authenticationService.logout();

        this.form = new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required
            ])),
        });
    }

    onsubmit(user: any) {
        this.loading = true;
        this.model = user;

        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.ac.email = this.model.email;
                    this.router.navigate(['/league']);
                } else {
                    this.error = 'Login error';
                    this.loading = false;
                }
            });
    }

    clear() {
        this.ac.email = '';
    }
}
