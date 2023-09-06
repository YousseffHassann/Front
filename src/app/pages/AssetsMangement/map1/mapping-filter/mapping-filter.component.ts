import { Component, OnInit } from '@angular/core';
import { AssetsServices } from '../../assets/assets.service';

@Component({
  selector: 'ngx-mapping-filter',
  templateUrl: './mapping-filter.component.html',
  styleUrls: ['./mapping-filter.component.scss']
})
export class MappingFilterComponent implements OnInit {
  name1 = 22 ; 
  filterCryteriaObject = {GovId:-1} ; 

  ClassificationName = "PhysicalStatus" ;

  constructor(private AssetsServices1 :AssetsServices) {



   }
  
  ngOnInit(): void {
  }

  doFilter( ){

//this.AssetsServices1.queryAssetsFilter(this.name1) ; 
this.AssetsServices1.queryAssetsFilter(this.name1 ,this.filterCryteriaObject ) ; 


  }

  doMapAssetsClassify(){

    this.AssetsServices1.classifyAssets(this.ClassificationName) ; 

  }


}
