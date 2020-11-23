import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    user: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.userService.isLogged()) {
            this.router.navigate(['painel']);
            return false;
        }
        return true;
    }

}