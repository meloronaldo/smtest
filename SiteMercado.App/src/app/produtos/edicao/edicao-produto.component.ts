import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { EdicaoProdutoService } from './edicao-produto.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


declare var $: any;

@Component({
    selector: 'edicao-produto',
    templateUrl: './edicao-produto.component.html',
    providers: [DatePipe]
})


export class EdicaoProduto implements OnInit {

    @Input() produto: Produto;

    @Output() atualizarGrid = new EventEmitter<string>();

    formEditar: FormGroup;

    selectedFile: File = null;

    constructor(
        private formBuilder: FormBuilder,
        private EdicaoProdutoService: EdicaoProdutoService,
        private toastr: ToastrService,
        public datepipe: DatePipe
    ) { }


    ngOnInit(): void {

        // Inicializa o formulário
        this.formEditar = this.formBuilder.group({
            id: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            imagem: ['']
        });
    }

    public abrirModal() {
        $('#modalEditar').modal('show');
        this.selectedFile = null;
    }

    public fecharModal() {
        $('#modalEditar').modal('hide');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto !== undefined) {
            this.setarCampos();
        }
    }

    setarCampos() {
        this.formEditar.get('id').setValue(this.produto.id);
        this.formEditar.get('nome').setValue(this.produto.nome);
        this.formEditar.get('valor').setValue(this.produto.valor);
        this.formEditar.get('imagem').setValue(this.produto.imagem);
    }

    onSelectFile(fileInput: any) {
        this.selectedFile = <File>fileInput.target.files[0];
    }

    public editarProduto(event: FormGroup) {

        let produto: Produto;
        produto = event.getRawValue();

        this.EdicaoProdutoService
            .putProduto(produto)
            .subscribe((response) => {

                const httpResponse = response;

                if (httpResponse.status === 400 || httpResponse.status === 401) {
                    this.toastr.error('Não foi possível editar o produto! Tente novamente em instantes.');
                } else if (httpResponse.status === 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else if (httpResponse.status === 200) {
                    this.toastr.success('Produto editado com sucesso!');

                    this.fecharModal();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error)
                this.toastr.error('Erro! Não foi possível editar o produto.');
            });



    }


}


