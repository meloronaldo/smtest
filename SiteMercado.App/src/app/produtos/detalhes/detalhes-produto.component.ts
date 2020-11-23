import { Component, Inject, HostListener, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';
import { ToastrService } from 'ngx-toastr';


declare var $: any;

@Component({
    selector: 'detalhes-produto',
    templateUrl: './detalhes-produto.component.html'
})


export class DetalhesProduto implements OnInit {

    @Input() produto: Produto;

    @Output() atualizarGrid = new EventEmitter<string>();

    formDetalhes: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.formDetalhes = this.formBuilder.group({
            id: ['', [Validators.required]],
            nome: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            imagem: [''],
        });
    }

    public abrirModal() {
        $('#modalDetalhes').modal('show');
    }

    public fecharModal() {
        $('#modalDetalhes').modal('hide');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.produto !== undefined) {
            this.setarCampos();
        }
    }

    // Preenche os campos do formulário e os desabilita
    setarCampos() {
        this.formDetalhes.get('id').setValue(this.produto.id);
        this.formDetalhes.get('id').disable();
        this.formDetalhes.get('nome').setValue(this.produto.nome);
        this.formDetalhes.get('nome').disable();
        this.formDetalhes.get('valor').setValue(this.produto.valor);
        this.formDetalhes.get('valor').disable();
        if (this.produto.imagem != null) {
            this.formDetalhes.get('imagem').setValue(this.produto.imagem);
            this.formDetalhes.get('imagem').disable();
        }
    }
}


