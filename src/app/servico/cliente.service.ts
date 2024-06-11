import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../Cliente';
import { NgFor } from '@angular/common';
import { PrincipalComponent } from '../principal/principal.component';
import { FormsModule } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url api
  private url:string = 'http://localhost:8081/listar';
  private urlC:string = 'http://localhost:8081/cadastrar';
  private urlA:string = 'http://localhost:8081/alterar';
  private urlR:string = 'http://localhost:8081/remover';



  constructor(private http:HttpClient) { }


  selecionar (): Observable<Cliente[]>{
     return this.http.get<Cliente[]>(this.url);
  }


  cadastrar(obj:Cliente):Observable<Cliente> {
    return this.http.post<Cliente>(this.urlC,obj);
  }

  update(obj:Cliente):Observable<Cliente> {
    return this.http.put<Cliente>(this.urlA,obj);
  }

  remover(codigo:number):Observable<void> {
    return this.http.delete<void>(this.urlR +'/'+ codigo );
  }

}
