import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
export class EmpresasCadastroComponent implements OnInit {

  //atributo
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  //criando a estrutura do formulário
  formCadastro = new FormGroup({
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });

  //função para acessar os campos do formulário
  get form(): any {
    return this.formCadastro.controls;
  }

  //função para ser executada no SUBMIT do formulário
  onSubmit(): void {

    this.httpClient.post( //Requisição HTTP POST (cadastro)
      environment.apiUrl + 'api/empresas', //ENDPOINT da API
      this.formCadastro.value, //dados que serão enviados
      { responseType: 'text' } //tipo de resposta que será obtida
    )
      .subscribe({ //capturar a resposta obtida da API
        next: (result) => { //retorno de sucesso da API
          this.mensagem = result;
          this.formCadastro.reset();
        },
        error: (e) => { //retorno de erro da API
          this.mensagem = "Falha ao cadastrar empresa.";
        }
      })
  }
}
