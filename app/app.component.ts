import { Component } from '@angular/core';

import { AuthenticationService } from './_services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'sl-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  email = '';

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.logout();
  }
}
