import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(
        private userService: UserService,
        private router: Router
    ) {}


    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.userService.isLogged()) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }
}
