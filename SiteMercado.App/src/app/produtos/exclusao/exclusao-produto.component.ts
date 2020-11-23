import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ExclusaoProdutoService } from './exclusao-produto.service';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'exclusao-produto',
    templateUrl: './exclusao-produto.component.html'
})


export class ExclusaoProduto implements OnInit {

    // Recebe os dados do componente pai
    @Input() produto: Produto;

    // Avisa o componente pai que um registro foi editado
    @Output() atualizarGrid = new EventEmitter<string>();

    // Instancia um formulário
    formExcluir: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private ExclusaoProdutoService: ExclusaoProdutoService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.formExcluir = this.formBuilder.group({
            id: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            valor: ['', [Validators.required]],
        });
    }

    public abrirModal() {
        $('#modalExcluir').modal('show');
    }

    public fecharModal() {
        $('#modalExcluir').modal('hide');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto !== undefined) {
            this.setarCampos();
        }
    }

    setarCampos() {
        this.formExcluir.get('id').setValue(this.produto.id);
        this.formExcluir.get('id').disable();
        this.formExcluir.get('nome').setValue(this.produto.nome);
        this.formExcluir.get('nome').disable();
        this.formExcluir.get('valor').setValue(this.produto.valor);
        this.formExcluir.get('valor').disable();
    }

    public excluirProduto(event: FormGroup) {

        let produto: Produto;
        produto = event.getRawValue();

        this.ExclusaoProdutoService
            .deleteProduto(produto)
            .subscribe((response) => {

                const httpResponse = response;

                if (httpResponse.status === 400 || httpResponse.status === 401) {
                    this.toastr.error('Não foi possível excluir o produto! Tente novamente em instantes.');
                } else if (httpResponse.status === 500) {
                    this.toastr.error('Falha na comunicação com o servidor! Tente novamente em instantes.');
                } else {
                    this.toastr.success('Produto excluido com sucesso!');

                    this.fecharModal();
                    this.atualizarGrid.next();
                }
            }, (error) => {
                console.log(error);
                this.toastr.error('Erro! Não foi possível excluir o produto.');
            });

        console.log('teste');
    }




}


