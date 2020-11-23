import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { ResponseModel } from '../../models/response';
import { environment } from 'src/environments/environment';

const URL_API = environment.ApiUrl;

// Define o cabeçalho da chamada
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }


    // autenticacaoSiteMercado(userID: string, accessKey: string) {

    //     // tslint:disable-next-line:no-shadowed-variable
    //     // const httpOptions = {
    //     //     headers: new HttpHeaders({
    //     //         'Content-Type': 'application/json, charset=utf-8',
    //     //         'Authorization': 'Basic ' + btoa(userID + ':' + accessKey)
    //     //     })
    //     // };

    //     // return this.http
    //     //     .post('https://dev.sitemercado.com.br/api/login',
    //     //         { 'Username': userID, 'Password': accessKey },
    //     //         { headers: httpOptions.headers, observe: 'response' })
    //     //     .pipe(tap(res => {
    //     //         return  res.body.valueOf();
    //     //     }));
    // }


    autenticacaoSiteMercado(username: string, password: string) {

        // tslint:disable-next-line:no-shadowed-variable
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json, charset=utf-8',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            })
        };

        return this.http.post<any>(`https://dev.sitemercado.com.br/api/login`,
                           { username, password },
                           { headers: httpOptions.headers})
            .pipe(map(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                console.log(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }


}
