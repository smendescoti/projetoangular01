import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-funcionarios-cadastro',
  templateUrl: './funcionarios-cadastro.component.html',
  styleUrls: ['./funcionarios-cadastro.component.css']
})
export class FuncionariosCadastroComponent implements OnInit {

  //atributos
  empresas: any[] = [];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  //criando a estrutura do formulário
  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    dataAdmissao: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl('', [Validators.required]),
  });

  //função para acessar os campos do formulário
  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + "api/empresas")
      .subscribe(
        {
          next: (result) => {
            this.empresas = result as any[];
          },
          error: (e) => {
            console.log(e);
          }
        }
      )
  }

  onSubmit(): void {
    this.httpClient.post(
      environment.apiUrl + "api/funcionarios",
      this.formCadastro.value,
      { responseType: 'text' }
    )
      .subscribe(
        {
          next: (result) => {
            this.mensagem = result;
            this.formCadastro.reset();
          },
          error: (e) => {
            console.log(e);
            this.mensagem = "Falha ao cadastrar funcionário.";
          }
        }
      )
  }
}
