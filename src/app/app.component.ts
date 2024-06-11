import { Component, Injectable, ViewChild } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    PrincipalComponent,
    FormsModule,
    NgFor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  
}
