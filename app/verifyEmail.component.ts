import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'sl-verifyEmail',
  template: `
    <br />
    <h3>Verify Email</h3>
    <br />
    You will receive an email containing a link to verify your email. Open the email and click<br />
    the link. Then click here to <a routerLink="../league">continue</a>. 
    <br /><br />
    If you did not receive an email, click here to <a href="javascript:void(0)" (click)="onClick()">request another</a>.        
    `
})

export class VerifyEmailComponent {
  constructor(private appComponent: AppComponent, private userService: UserService) {}

  onClick() {
    this.userService.email(this.appComponent.email)
            .subscribe(result => {
                if (result === 'success') {
                } else {
                }
            });
  }
}
