import { Component, Inject, HostListener, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class CadastroProdutoService {

    constructor(private http: HttpClient) { }

    postProduto(produto: Produto, imagem: File): Observable<any> {

        const formData = new FormData();

        for (var key in produto) {
            formData.append(key, produto[key]);
        }

        const httpOptions = {
            headers: new HttpHeaders({ 'Accept': 'application/json, */*' })
        }

        // Monta a requisição
        const uploadReq = new HttpRequest('POST', environment.ApiUrl + 'api/produto/', formData, {
            headers: httpOptions.headers,
            reportProgress: true
        });

        // Chama a API enviando os parâmetros
        return this.http.request(uploadReq);

    }

}


