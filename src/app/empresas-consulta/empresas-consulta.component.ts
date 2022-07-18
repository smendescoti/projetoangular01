import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {

  //atributos
  empresas: any[] = [];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + 'api/empresas')
      .subscribe({
        next: (result) => {
          this.empresas = result as any[];
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  onDelete(idEmpresa: number): void {

    if (window.confirm('Deseja realmente excluir esta empresa?')) {

      this.httpClient.delete(environment.apiUrl + 'api/empresas/' + idEmpresa,
        { responseType: 'text' })
        .subscribe({
          next: (result) => {
            this.mensagem = result;
            this.ngOnInit();
          },
          error: (e) => {
            this.mensagem = 'Não foi possível excluir a empresa, verifique se ela possui funcionários.';
          }
        })
    }
  }
}
