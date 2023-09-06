import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>


      <nb-sidebar    start class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>


      <!-- <nb-sidebar *ngIf="lang=='en'"   start class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar> -->


  




      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})


export class OneColumnLayoutComponent implements  OnInit { 
  lang:any
dir:any;
  ngOnInit(): void {

    this.lang=localStorage.getItem("lang");
   
    console.log(this.lang);
    
    if(this.lang=="en")
    {
       this.dir="start";
    }
    else
    {
      this.dir="end";
    }

   
  }


  

  
   

}


