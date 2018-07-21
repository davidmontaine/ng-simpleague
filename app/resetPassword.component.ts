import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { LeagueService } from './_services/league.service';
import { UserService } from './_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'sl-league',
  templateUrl: 'resetPassword.component.html'
})

export class ResetPasswordComponent implements OnInit {
    form: any = {};
    passwordForm: any = {};
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private appComponent: AppComponent,
        private leagueService: LeagueService) {}
 
    ngOnInit() {
        this.form = new FormGroup({
                passwordCurrent: new FormControl('', Validators.compose([
                    Validators.required
                ])),
                passwordNew: new FormControl('', Validators.compose([
                    Validators.required
                ])),            
                passwordVerify: new FormControl('', Validators.compose([
                    Validators.required
                ]))      
        }, this.validatePassword);

        this.leagueService.getLeagues()
            .subscribe(leagues => {
            });        
    }
 
    validatePassword(group: FormGroup) {
        if (group.value.passwordNew === '' || group.value.passwordVerify === '' || (group.value.passwordNew === group.value.passwordVerify && group.value.passwordNew.length > 7)) {
            return null;
        }
        return {
            'passwordNew': {
                verify: 'other'
            }
        }
    }

    onsubmit(formuser: any) {
        this.loading = true;
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        
        this.userService.resetPassword(user.email, formuser.passwordCurrent, formuser.passwordNew)
            .subscribe(result => {
                if (result === 'success') {
                    this.router.navigate(['/league']);
                } else {
                    this.error = 'Reset Password error';
                    this.loading = false;
                }
            });
    }
}
