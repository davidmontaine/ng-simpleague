import { Component, OnInit } from '@angular/core';

import { LeagueService } from './_services/league.service';

@Component({
  moduleId: module.id,
  selector: 'sl-league',
  template: `
    <br />
    <h3>League</h3>
    <br />
    Manage League
    `
})

export class LeagueComponent implements OnInit {
    leagues: string = '';
 
    constructor(private leagueService: LeagueService) {}
 
    ngOnInit() {
        this.leagueService.getLeagues()
            .subscribe(leagues => {
                this.leagues = leagues;
            });
        return 'leagues';
    }
}
