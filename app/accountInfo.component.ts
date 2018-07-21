import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { Maincred } from './_models/maincred';
import { Mainuser } from './_models/mainuser';
import { AuthenticationService } from './_services/authentication.service';
import { LeagueService } from './_services/league.service';
import { UserService } from './_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'sl-league',
  templateUrl: 'accountInfo.component.html'
})

export class AccountInfoComponent implements OnInit {
    form: any = {};
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private userService: UserService,
        private appComponent: AppComponent,
        private leagueService: LeagueService) {}        
 
    ngOnInit() {
        this.form = new FormGroup({
                name: new FormControl('', Validators.compose([
                        Validators.required
                ])),
                email: new FormControl('', Validators.compose([
                        Validators.required,
                        Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
                ])),
                emailCurrent: new FormControl('')
        });                    
        this.userService.getUser(this.appComponent.email)
                .subscribe(user => {
                    this.form.controls['name'].setValue(user['name']);
                    this.form.controls['email'].setValue(user['email']);                
                    this.form.controls['emailCurrent'].setValue(user['email']);                            
        });        
    }

    onsubmit(formuser: any) {
        this.loading = true;
        let user = new Mainuser();
        user.name = formuser.name;
        let cred = new Maincred();
        user.credentials = cred;
        user.credentials.email = formuser.email;        
        user.emailCurrent = formuser.emailCurrent;                
        this.model = user;
        
        this.userService.update(user)
            .subscribe(result => {
                if (result === 'success') {
                    if (this.appComponent.email != user.credentials.email) {
                        this.appComponent.email = user.credentials.email;
                        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                        sessionStorage.setItem('currentUser', JSON.stringify({ email: user.credentials.email, token: currentUser.token, verified: 'N' }));
                    }
                    this.router.navigate(['/league']);
                } else {
                    this.error = 'Error creating user';
                    this.loading = false;
                }
            });
    }
}
