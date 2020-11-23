import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';

import { ResponseModel } from '../../models/response';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

const URL_API = environment.ApiUrl;

export class InterceptorMetaOptions {
    constructor(
        public skipIncerceptor: boolean = false,
        public skipJson: boolean = false,
        public skipAuthorization: boolean = false,
        public Accept: String = ''
    ) { }
}

@Injectable()
export class RequestInterceptor implements HttpInterceptor {


    isRefreshingToken = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private http: HttpClient
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error) => {

            if (error.status === 401 && error.statusText === 'OK') {

                this.router.navigate(['/not-authorized']);
                throw error;
            } else {
                throw error;
            }
        }));
    }
}
