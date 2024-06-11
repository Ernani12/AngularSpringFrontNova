import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  NgFor } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  imports: [
    BrowserModule,
    PrincipalComponent,
    FilterPipe,
    FormsModule,
    GoogleMapsModule,  
    NgxSearchFilterModule,
    NgFor,
    
  ],

  providers: [],
  declarations: [ ],
  bootstrap: [  ]
})
export class AppModule {}