import { Component, Inject, HostListener, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { CadastroProdutoService } from './cadastro-produto.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


declare var $: any;

@Component({
    selector: 'cadastro-produto',
    templateUrl: './cadastro-produto.component.html',
    providers: [DatePipe]
})


export class CadastroProduto implements OnInit {

    // Avisa o componente pai que um novo registro foi inserido
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formCadastrar: FormGroup;

    // Variável para obter a imagem
    selectedFile: File = null;

    constructor(
        private formBuilder: FormBuilder,
        private CadastroProdutoService: CadastroProdutoService,
        private toastr: ToastrService,
        public datepipe: DatePipe
    ) { }

    // Dispara ao iniciar o componente
    ngOnInit(): void {
        this.formCadastrar = this.formBuilder.group({
            nome: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            imagem: ['']
        });
    }

    // Exibe o modal
    public abrirModal() {
        $('#modalCadastrar').modal('show');
        this.selectedFile = null;
    }

    // Oculta o modal
    public fecharModal() {
        $('#modalCadastrar').modal('hide');
    }

    // Detecta mudança no arquivo
    onSelectFile(fileInput: any) {
        this.selectedFile = <File>fileInput.target.files[0];
    }

    // Cadastra o produto no banco de dados
    public cadastrarProduto(event: FormGroup) {

        let produto: Produto;
        produto = event.getRawValue();

        // Envia os dados para o serviço chamar a API
        this.CadastroProdutoService
            .postProduto(produto, this.selectedFile)
            .subscribe((response) => {

                const httpResponse = response;

                if (httpResponse.status === 400 || httpResponse.status === 401) {
                    this.toastr.error('Não foi possível cadastrar o produto! Tente novamente em instantes.');
                } else if (httpResponse.status === 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else if (httpResponse.status === 200) {
                    this.toastr.success('Produto cadastrado com sucesso!');

                    this.fecharModal();
                    this.formCadastrar.reset();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error);
                this.toastr.error('Erro! Não foi possível cadastrar o produto.');
            });
    }

}


