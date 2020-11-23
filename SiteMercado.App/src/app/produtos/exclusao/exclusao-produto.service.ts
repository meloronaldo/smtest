import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ExclusaoProdutoService {

    constructor(private http: HttpClient) {}

    deleteProduto(produto: Produto): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.delete<any>(environment.ApiUrl +
            `/api/produto/${produto.id}`, { headers: httpOptions.headers, observe: 'response'
        });
    }

}


