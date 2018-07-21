import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sl-about',
  template: `
    <br />
    <h3>About</h3>
    <br />
    SimpLeague is an online sports league manager that's free and easy to use.  Use 
    SimpLeague to "Manage your League <s>Simply</s> SimpLeague".  Manage seasons and
    teams as well.  Provide members, their families and friends, with a single place
    to go and get everything they need to know about your league.  SimpLeague currently
    only supports baseball however, more sports are planned for the future.  To help
    SimpLeague evolve, users are encouraged to contact us at <a href="mailto:admin@simpleague.com">admin@simpleague.com</a>.
    `
})

export class AboutComponent {}
