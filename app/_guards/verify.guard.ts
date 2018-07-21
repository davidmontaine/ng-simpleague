import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
 
@Injectable()
export class VerifyGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
 
    canActivate() {
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser) {
            if (currentUser.verified == 'Y') {
                return true;
            } else {
                this.userService.getUser(currentUser.email)
                    .subscribe(result => {
                        currentUser = result;

                        if (currentUser && currentUser.verified == 'Y') {   
                            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                            this.router.navigate(['/league']);
                        } else {
                            this.router.navigate(['/verifyEmail']);
                        }
                        return false;
                    });                                    
            }
        }
        this.router.navigate(['/verifyEmail']);
        return false;
    }
}
