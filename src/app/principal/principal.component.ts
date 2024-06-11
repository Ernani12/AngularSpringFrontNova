import { Component, ViewChild } from '@angular/core';
import { Cliente } from '../Cliente';
import { ClienteService } from '../servico/cliente.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports:[  FormsModule,
    HttpClientModule, 
    NgFor, 
    CommonModule,
    FilterPipe 
  ],

    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  marker: google.maps.marker.AdvancedMarkerElement| undefined;
  map: google.maps.Map | undefined;
  lat: number = -16.69733339034803;
  lng: number = -49.22386701534048;
  address: string ='';

// Método para manejar el evento de clic en el mapa
  searchText = '';
  // variavel visibilidade
  tabela : Boolean=true;

  cliente= new Cliente();

  //visibilidade dos botoes
  btnCadastro:boolean= true;

  clientes: Cliente[]=[];

  constructor(private servico:ClienteService){}

    //ja no inicio traz esses clientes
    ngOnInit(){   
      this.selecionar();
      this.loadGoogleMapsScript(() => {
       this.initializeMap();
     });
   }

  loadGoogleMapsScript(callback: () => void): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAGFWBA1FqUs9EwRotXsehq6aDr_rD0Zxo&callback=initMap`;
    script.async = true;
    script.defer = true;
    (window as any).initMap = callback;
    document.head.appendChild(script);
  }

  initializeMap(): void {
    const mapElement = document.getElementById('map') as HTMLElement;
    const initialPosition = { lat: this.lat, lng: this.lng };
    this.map = new google.maps.Map(mapElement, {
      center: initialPosition,
      zoom: 8
    });

    this.marker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: initialPosition
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.lat = event.latLng.lat();
        this.lng = event.latLng.lng();
        console.log(`Coordenadas: ${this.lat}, ${this.lng}`);
        this.updateMarkerPosition();
        this.getGeocoding(this.lat, this.lng);

      }
    });
  }

  getGeocoding(lat: number, lng: number): void {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          this.address = results[0].formatted_address;
          console.log(`Endereço: ${this.address}`);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  updateMarkerPosition(): void {
    const newPosition = { lat: this.lat, lng: this.lng };
    if (this.marker && 'position' in this.marker) {
      (this.marker as google.maps.marker.AdvancedMarkerElement).position = newPosition;
      this.map?.setCenter(newPosition);
    }
  }
  
  //selecionar todos os clientes 
  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno =>this.clientes=retorno);
  }



  //cadastrar um cliente
  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno=>{
      this.clientes.push(retorno);
      
      //clean
      this.cliente = new Cliente();
    
      //menssagem cadastrado
      alert("cliente cadastrado com sucesso");
    });


  }
  //selecionar cliente especifico na tabela
  selecionarClienteE(posicao:number):void{
        this.cliente=this.clientes[posicao];
        this.btnCadastro=false;
        this.tabela=false;
  }

 
//editar um cliente
  update():void{
  this.servico.update(this.cliente)
    .subscribe(retorno=>{
    //obter vetor posicao do cliente
      let posicao= this.clientes.findIndex(obj=>{
        return obj.codigo == retorno.codigo;
      });
    //alterar dados do cliente
    this.clientes[posicao]=retorno;

    //visibilidade dos botoes
    this.btnCadastro= true;
    
    //visibilidade da  tabela
    this.tabela=true;
  
    //menssagem cadastrado
    alert("cliente atualizado  com sucesso");
  });
}

  //remover um cliente
  remover():void{
  this.servico.remover(this.cliente.codigo)
    .subscribe(retorno=>{
    //obter vetor posicao do cliente
      let posicao= this.clientes.findIndex(obj=>{
        return obj.codigo == this.cliente.codigo;
      });
    //excluir  e remover do vetor
    this.clientes.splice(posicao,1)

    //limpar do form
    this.cliente= new Cliente();

    //visibilidade dos botoes
    this.btnCadastro= true;
    
    //visibilidade da  tabela
    this.tabela=true;
  
    //menssagem cadastrado
    alert("cliente removido  com sucesso");
  });

}
  
  cancelar():void{
        //limpar do form
        this.cliente= new Cliente();

        //visibilidade dos botoes
        this.btnCadastro= true;
        
        //visibilidade da  tabela
        this.tabela=true;
  }


  

}
