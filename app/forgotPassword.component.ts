import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'sl-league',
  templateUrl: 'forgotPassword.component.html'
})

export class ForgotPasswordComponent implements OnInit {
    form: any = {};
    model: any = {};
    loading = false;
    error = '';
 
    constructor(private router: Router, private userService: UserService) {}
 
    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            ]))
        });
    }
 
    onsubmit(user: any) {
        this.loading = true;
        this.model = user;
        
        this.userService.forgotPassword(this.model.email)
            .subscribe(result => {
                if (result === 'success') {
                    this.router.navigate(['/forgotPasswordSuccess']);
                } else if (result === 'failure') {
                    this.router.navigate(['/forgotPasswordError']);                    
                } else {
                    this.error = 'Email address does not exist';
                    this.loading = false;
                }
            });
    }
}
