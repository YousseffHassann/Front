import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit {


  constructor() { }

lang:any =localStorage.getItem("lang");

  Selected:any;
  Selections:any=["Area","Street","Section","Intersection"]

  KIND(e): any {
    this.Selected = e.target.value;
    console.log(this.Selected);
  }

  ngOnInit(): void {

    
  }

}
