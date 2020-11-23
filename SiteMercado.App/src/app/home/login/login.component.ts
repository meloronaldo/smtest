import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/models/user';
import { ResponseModel } from 'src/app/models/response';
import { ToastrService } from 'ngx-toastr';

declare let Materialize: any;

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: User;
    @ViewChild('userIDInput') userIDInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private render: Renderer,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userID: ['',
                [
                    Validators.required,
                    Validators.pattern(/^[a-z-_.]+@+[a-z-]+\.[a-z]+\.?([a-z]+)?$/)
                ]
            ],
            accessKey: ['', Validators.required]
        });
    }

    loginSiteMercado() {

        const userID = this.loginForm.get('userID').value;
        const accessKey = this.loginForm.get('accessKey').value;

        this.authService
            .autenticacaoSiteMercado(userID, accessKey)
            .subscribe((response) => {
                const responseModel = response.body.valueOf();
                this.toastr.show(responseModel.toString());
            }, (error) => {
                console.log(error);
                this.toastr.error('Erro ao comunicar com a API.');
            });
    }

}
