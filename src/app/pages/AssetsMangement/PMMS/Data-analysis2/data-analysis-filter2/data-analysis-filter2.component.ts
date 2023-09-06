import { Component, OnInit } from '@angular/core';
import {AssetsSettingsService} from "../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { PmmsMdService } from "../../MD/pmmsMd.service";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import {GetStreetsIRI} from "../GetStreetsIRI.model"
@Component({
  selector: 'ngx-data-analysis-filter2',
  templateUrl: './data-analysis-filter2.component.html',
  styleUrls: ['./data-analysis-filter2.component.scss']
})
export class DataAnalysisFilter2Component implements OnInit {
  constructor(private assetsaettingsaervice :AssetsSettingsService,private pmmsMdService:PmmsMdService ) { }
  
  
  
  settings1 = {
    hideSubHeader: true,

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      index: {
        title: "Item",
        type: "text",
        width: "100px",
        valuePrepareFunction: (value, row, cell) => {
         return cell.row.index + 1;
        },
       },
      ARNAME: {
        title: "إسم الشارع ",
        type: "string",
      },
      COUNTSECTION: {
        title: "عدد  المقاطع",
        type: "number",
      },
     
      COUNTLANE: {
        title: "عدد الحارات ",
        type: "string",
      }
      
    },
  };

  settings2 = {
    hideSubHeader: true,

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
   
    columns: {
      index: {
        title: "Item",
        type: "text",
        width: "100px",
        valuePrepareFunction: (value, row, cell) => {
         return cell.row.index + 1;
        },
       },
       SECTION_NO: {
        title: "رقم المقطع  ",
        type: "string",
      },
      LEN: {
        title: "عدد  الحارات",
        type: "number",
      },
      LANE: {
        title: "الطول",
        type: "number",
      },
     
    
      
    },
    rowClassFunction: (row) => {
      if (row.data.TCOUNTLANE != row.data.TCOUNTIRI) {
        
        return "solved";
      } else {
        return "aborted";
      }
    },
 
  };

  settings3 = {
    hideSubHeader: true,

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
   
    columns: {
      index: {
        title: "Item",
        type: "text",
        width: "100px",
        valuePrepareFunction: (value, row, cell) => {
         return cell.row.index + 1;
        },
       },
       SECTION_NO: {
        title: "رقم المقطع  ",
        type: "string",
      },
      LEN: {
        title: "عدد  الحارات",
        type: "number",
      },
      LANE: {
        title: "الطول",
        type: "number",
      },
     
    
      
    },
    rowClassFunction: (row) => {
      if (row.data.TCOUNTLANE != row.data.TCOUNTIRI) {
        
        return "solved";
      } else {
        return "aborted";
      }
    },
 
  };
  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  SURVEY_NO:string
  StreetsIRI:GetStreetsIRI[];
  STREET_ID:string;
  ngOnInit(): void {
  
    this.pmmsMdService.
   GetStreetsIRI()
    .subscribe((data) => {
      this.StreetsIRI = data;
    });
 
    
 
 
  }
  
  selectedTeam = '';
  filtered: any

  onChange(value:string): void {
    this.filtered=  this.StreetsIRI.filter(function(hero) {
      return hero.STREET_ID == value;
    });   
    const MAIN_NO = this.filtered.map( data => (data.MAIN_NO) ); 
    const SURVEY_NO = this.filtered.map( data => (data.SURVEY_NO) ); 
    const STREET_ID = this.filtered.map( data => (data.STREET_ID) ); 
    this.STREET_ID =STREET_ID

    this.selectedTeam =SURVEY_NO
    this.pmmsMdService.
    GetStreetsInfo(value)
     .subscribe((data) => {
      this.source1.empty;
      this.source1.refresh;

      this.source1.load(data);     });
      this.pmmsMdService.
      GetStreetsSectionsIRI(STREET_ID)
       .subscribe((data4) => {
        this.source2.empty;
        this.source2.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data4));

        this.source3.load(parsedJSON); 
        this.source3.empty;
        this.source3.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data4));

        this.source3.load(parsedJSON); 
      
      
      });
     
  }

  onChangeSURVEY_NO(value:string): void {
    this.filtered=  this.StreetsIRI.filter(function(hero) {
      return hero.STREET_ID == value;
    });   

   

      this.pmmsMdService.
      GetStreetsSectionsLengthBySurvey2(this.selectedTeam,value)
       .subscribe((data3) => {
        this.source2.empty;
        this.source2.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data3));

           console.info(data3)
        this.source3.load(parsedJSON); 
        this.source3.empty;
        this.source3.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data3));

           console.info(data3)
        this.source2.load(parsedJSON); 
      
      
      });
  }
}
