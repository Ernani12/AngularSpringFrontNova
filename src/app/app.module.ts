import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import {  NgFor } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  imports: [
    BrowserModule,
    PrincipalComponent,
    FilterPipe,
    HttpClientModule,
    FormsModule,
    NgModel,
    GoogleMapsModule,
    AgmCoreModule,
    NgxSearchFilterModule,
    NgFor,
    
  ],

  providers: [],
  declarations: [ AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {}