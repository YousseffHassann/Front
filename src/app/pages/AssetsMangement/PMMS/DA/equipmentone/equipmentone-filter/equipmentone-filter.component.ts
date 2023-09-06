import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { PmmsMdService } from "../../../MD/pmmsMd.service";
import { LocalDataSource } from "ng2-smart-table";
import { TranslateService } from '@ngx-translate/core'
import { SmartTableData } from "../../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../../DA/GetStreetsIRI.model"
import { distinct } from 'rxjs/operators';
@Component({
  selector: 'ngx-equipmentone-filter',
  templateUrl: './equipmentone-filter.component.html',
  styleUrls: ['./equipmentone-filter.component.scss']
})
export class EquipmentoneFilterComponent implements OnInit {

  constructor(private translate: TranslateService, private assetsaettingsaervice: AssetsSettingsService, private pmmsMdService: PmmsMdService) {

    translate.setDefaultLang('en');
    translate.use('en');

  }



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
        // title: "إسم الشارع ",

        title: this.translate.instant('equipmentone.ARNAME'),
        type: "string",
      },
      COUNTSECTION: {
        // title: "عدد  المقاطع",
        title: this.translate.instant('equipmentone.COUNTSECTION'),

        type: "number",
      },

      COUNTLANE: {
        // title: "عدد الحارات ",
        title: this.translate.instant('equipmentone.COUNTLANE'),

        type: "string",
      }

    },
  };
  settings12 = {
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
        // title: "إسم الشارع ",

        title: this.translate.instant('equipmentone.ARNAME'),
        type: "string",
      },
      COUNTSECTION: {
        // title: "عدد  المقاطع",
        title: this.translate.instant('equipmentone.COUNTSECTION'),

        type: "number",
      },

      COUNTLANE: {
        // title: "عدد الحارات ",
        title: this.translate.instant('equipmentone.COUNTLANE'),

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
        //title: "رقم المقطع  ",
        title: this.translate.instant('equipmentone.SECTION_NO'),

        type: "string",
      },
      TCOUNTLANE: {
        //  title: "عدد  الحارات",
        title: this.translate.instant('equipmentone.TCOUNTLANE'),

        type: "number",
      },
      LTYPE: {
        //title: "نوع  الحارات",
        title: this.translate.instant('equipmentone.LTYPE'),

        type: "number",
      },



    },
    // rowClassFunction: (row) => {
    //   if (row.data.TCOUNTLANE != row.data.TCOUNTIRI) {

    //     return "solved";
    //   } else {
    //     return "aborted";
    //   }
    // },

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
      TCOUNTIRI: {
        title: "IRI عدد  الحارات",
        type: "number",
      },
      TCOUNTLANE: {
        title: "عدد  الحارات",
        type: "number",
      },
      LTYPE: {
        title: "نوع  الحارات",
        type: "number",
      },


    },
    rowClassFunction: (row) => {
      if (row.data.TCOUNTLANE != row.data.TCOUNTIRI) {

        return "aborted";
      } else {
        return "solved";
      }
    },

  };
  source1: LocalDataSource = new LocalDataSource();

  source12: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  survey: string = localStorage.getItem('surveynumber');
  StreetsIRI: GetStreetsIRI[];
  StreetsIRI2: [];
  loading = false;

  STREET_ID: string;
  ngOnInit(): void {

    this.pmmsMdService.
      GetStreetsIRI()
      .subscribe((data) => {
           this.StreetsIRI = data;
            this.StreetsIRI2 = data.filter((a, i) => data.findIndex((s) => a.SURVEY_NO === s.SURVEY_NO) === i)
      });

    this.pmmsMdService.GetStreetsIRI().pipe(distinct(v=>v.SURVEY_NO))
    .subscribe((data) => {
      this.StreetsIRI2 = data;

    });



  }

  selectedTeam = '';
  filtered: any
  StreetsIRI3: any
  onChange(value: string): void {


    this.loading = true;

    this.filtered = this.StreetsIRI.filter(function (hero) {
      return hero.STREET_ID == value;
    });

    const MAIN_NO = this.filtered.map(data => (data.MAIN_NO));
    const SURVEY_NO = this.filtered.map(data => (data.SURVEY_NO));
    const STREET_ID = this.filtered.map(data => (data.STREET_ID));

    this.selectedTeam = MAIN_NO
    this.pmmsMdService.
      GetStreetsInfo(value)
      .subscribe((data) => {
           this.source1.empty;
           this.source1.refresh;
           console.info(data)

          this.source1.load(data);
      });
    this.pmmsMdService.
      GetStreetsInfobyserequ1(MAIN_NO, SURVEY_NO)
      .subscribe((data12) => {
         this.source12.empty;
          this.source12.refresh;

         this.source12.load(data12);
      });
    this.pmmsMdService.
      GetStreetsSectionsIRI(STREET_ID)
      .subscribe((data3) => {
        this.source2.empty;
        this.source2.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data3));
        var newa = data3.replaceAll('\x00', '')
          this.source2.empty;
          this.source2.refresh;
         var parsedJSON = JSON.parse(JSON.stringify(data3));
          parsedJSON.forEach(function(element){
            console.log(element);
            this.source3.load(element); 

        });
         var newstr = data3.replace('\x00', ""); 
          this.source2.load(JSON.parse(newa));
          this.StreetsIRI2 = newa.filter((a, i) => newa.findIndex((s) => a.SURVEY_NO === s.SURVEY_NO) === i)

        // this.GetStreetssecIRI=data3;
      });
    this.pmmsMdService.GetStreetsSectionsBySurvey
      (MAIN_NO, SURVEY_NO)
      .subscribe((data4) => {


           this.source3.empty;
           this.source3.refresh;

         this.source3.load(data4);

        // this.GetStreetssecIRI=data3;
      });
      this.loading = true;
  }

  onChangeSURVEY_NO(value: string): void {
    this.filtered = this.StreetsIRI.filter(function (hero) {
      return hero.STREET_ID == value;
    });



    this.pmmsMdService.
      GetStreetsSectionsBySurvey(this.selectedTeam, value)
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

