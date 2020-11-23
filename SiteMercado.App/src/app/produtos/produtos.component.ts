import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroProduto } from './cadastro/cadastro-produto.component';
import { Produto } from '../models/produto';
import { EdicaoProduto } from './edicao/edicao-produto.component';
import { ProdutoService } from './produtos.service';
import { DetalhesProduto } from './detalhes/detalhes-produto.component';
import { ExclusaoProduto } from './exclusao/exclusao-produto.component';

@Component({
    selector: 'produtos',
    templateUrl: './produtos.component.html'
})

export class ProdutosComponent implements OnInit{

    InputProduto: Produto;

    @ViewChild(CadastroProduto) cadastro: CadastroProduto;
    @ViewChild(EdicaoProduto) edicao: EdicaoProduto;
    @ViewChild(DetalhesProduto) detalhes: DetalhesProduto;
    @ViewChild(ExclusaoProduto) exclusao: ExclusaoProduto;

    public produtos: Produto[];

    constructor(
        private ProdutoService: ProdutoService) {
    }

    ngOnInit(): void {
        this.BuscarProdutos();
    }

    public BuscarProdutos() {
        this.ProdutoService.getProdutos().subscribe(result => {

            if (result != null) {
              this.produtos = result;
            }

        }, error => console.error(error));
    }

    public CadastrarProduto() {
        this.cadastro.abrirModal();
    }

    public EditarProduto(produto: Produto) {
        this.InputProduto = produto;
        this.edicao.abrirModal();
    }

    public VisualizarProduto(produto: Produto) {
        this.InputProduto = produto;
        this.detalhes.abrirModal();
    }

    public ExcluirProduto(produto: Produto) {
        this.InputProduto = produto;
        this.exclusao.abrirModal();
    }



}




