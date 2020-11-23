import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../models/produto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class ProdutoService {

    constructor(private http: HttpClient) { }

    getProdutos(): Observable<any> {
        return this.http.get<any>(environment.ApiUrl + '/api/produto/');
    }

}


