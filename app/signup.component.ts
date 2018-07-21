import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { Maincred } from './_models/maincred';
import { Mainuser } from './_models/mainuser';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'sl-league',
  templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
    form: any = {};
    passwordForm: any = {};
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private appComponent: AppComponent) {}
 
    ngOnInit() {
        this.passwordForm = new FormGroup({
            password: new FormControl('', Validators.compose([
                Validators.required
            ])),
            passwordVerify: new FormControl('', Validators.compose([
                Validators.required
            ]))      
            }, this.validatePassword);

        this.form = new FormGroup({
            name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            ])),
            passwordForm: this.passwordForm
        });
    }
 
    validatePassword(group: FormGroup) {
        if (group.value.password === '' || group.value.passwordVerify === '' || (group.value.password === group.value.passwordVerify && group.value.password.length > 7)) {
            return null;
        }
        return {
            'password': {
                verify: 'other'
            }
        }
    }

    onsubmit(formuser: any) {
        this.loading = true;
        let mainuser = new Mainuser();
        mainuser.name = formuser.name;
        let cred = new Maincred();
        cred.email = formuser.email;        
        cred.passwordText = formuser.passwordForm.password;        
        mainuser.credentials = cred;
        this.model = mainuser;
        
        this.userService.signup(mainuser)
            .subscribe(result => {
                if (result === true) {
                    this.authenticationService.login(mainuser.credentials.email, mainuser.credentials.passwordText)
                        .subscribe(result => {
                            if (result === true) {
                                this.appComponent.email = mainuser.credentials.email;
                                this.router.navigate(['/league']);
                            } else {
                                this.error = 'Login error';
                                this.loading = false;
                            }
                        })
                } else {
                    this.error = 'Error creating user';
                    this.loading = false;
                }
            });
    }
}
