import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { EquipmenteightService } from "../Equipmenteight.service";
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../../DA/GetStreetsIRI.model"
@Component({
  selector: 'ngx-equipment-eightfilter',
  templateUrl: './equipment-eightfilter.component.html',
  styleUrls: ['./equipment-eightfilter.component.scss']
})
export class EquipmentEightfilterComponent implements OnInit {

  constructor(private assetsaettingsaervice: AssetsSettingsService, private equipmenteightService: EquipmenteightService) { }



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
        title: "نوع  الحارة",
        type: "number",
      },
      LANE: {
        title: "الطول",
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
  settings4 = {
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
      LANE: {
        title: "  نوع الحاره",
        type: "number",
      },
      LEN: {
        title: "الطول",
        type: "number",
      },


      remark: {
        title: "ملاحظات",
        type: "number",
      },

    },
    rowClassFunction: (row) => {
      if (row.data.LEN != " ") {

        return "solved";
      } else {
        return "aborted";
      }
    },

  };
  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  source4: LocalDataSource = new LocalDataSource();

  SURVEY_NO: string
  StreetsIRI: GetStreetsIRI[];
  STREET_ID: string;
  ngOnInit(): void {

    this.equipmenteightService.GetStreetsDDF()
      .subscribe((data) => {
        this.StreetsIRI = data;
      });




  }
  loading1 = false;
  loading2 = false;
  loading3 = false;
  loading4 = false;

  selectedTeam = '';
  filtered: any

  onChange(value: string): void {
    this.filtered = this.StreetsIRI.filter(function (hero) {
      return hero.STREET_ID == value;
    });
    const MAIN_NO = this.filtered.map(data => (data.MAIN_NO));
    const SURVEY_NO = this.filtered.map(data => (data.SURVEY_NO));
    const STREET_ID = this.filtered.map(data => (data.STREET_ID));
    this.STREET_ID = STREET_ID

    this.selectedTeam = SURVEY_NO
    this.equipmenteightService.
      GetStreetsInfoBySurvey(MAIN_NO, SURVEY_NO)
      .subscribe((data) => {
        this.loading1 = true;
        this.source1.empty;
        this.source1.refresh;
        console.info(data)

        this.source1.load(data);
        this.loading1 = false;
      });
    this.equipmenteightService.
      GetStreetsInfoDDF(MAIN_NO, SURVEY_NO)
      .subscribe((data4) => {
        this.source2.empty;
        this.source2.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data4));

        //console.info(data4)
        // this.source3.load(parsedJSON); 
        // this.source3.empty;
        // this.source3.refresh;
        // var parsedJSON = JSON.parse(JSON.stringify(data4));

        this.source2.load(parsedJSON);


      });
    this.equipmenteightService.
      GetStreetsSectionsLengthBySurvey(MAIN_NO, SURVEY_NO)
      .subscribe((data33) => {
        this.source3.empty;
        this.source3.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data33));

        //console.info(data4)
        // this.source3.load(parsedJSON); 
        // this.source3.empty;
        // this.source3.refresh;
        // var parsedJSON = JSON.parse(JSON.stringify(data4));

        this.source3.load(parsedJSON);


      });
    this.equipmenteightService.
      GetStreetsSectionsLengthDDFCLEAN(MAIN_NO, SURVEY_NO)
      .subscribe((data34) => {
        this.source3.empty;
        this.source3.refresh;
        var parsedJSON = JSON.parse(JSON.stringify(data34));

        //console.info(data4)
        // this.source3.load(parsedJSON); 
        // this.source3.empty;
        // this.source3.refresh;
        // var parsedJSON = JSON.parse(JSON.stringify(data4));

        this.source4.load(parsedJSON);


      });
  }

  onChangeSURVEY_NO(value: string): void {
    this.filtered = this.StreetsIRI.filter(function (hero) {
      return hero.STREET_ID == value;
    });



    this.equipmenteightService.
      GetStreetsSectionsLengthBySurvey2(this.selectedTeam, value)
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
