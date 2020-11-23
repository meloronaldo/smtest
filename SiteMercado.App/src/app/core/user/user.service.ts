import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    private user: User;

    constructor() {
     }


    isLogged(): boolean {

        if (localStorage.getItem('currentUser')) {
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            return this.user.success;
        }

        return false;
    }


    getUser(): User {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        return this.user;
    }
}
