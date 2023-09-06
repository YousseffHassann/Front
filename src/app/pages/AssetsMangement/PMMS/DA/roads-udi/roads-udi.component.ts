import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { RoadsudiService } from "./roads-udi.service";
import { TranslateService } from '@ngx-translate/core'
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../DA/GetStreetsIRI.model"
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'ngx-roads-udi',
  templateUrl: './roads-udi.component.html',
  styleUrls: ['./roads-udi.component.scss']
})
export class RoadsUdiComponent implements OnInit {


  constructor(private translate: TranslateService, private assetsaettingsaervice: AssetsSettingsService, private RoadsudiService: RoadsudiService) {

    translate.setDefaultLang('en');
    translate.use('en');
  }
  settings1 = {
    //hideSubHeader: true,

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
      }
      ,

      MAIN_NO: {
        // title: "رقم الشارع	 	 ",
        title: this.translate.instant('RoadesUdi.MAIN_NO'),
        type: "string",
      },


      SECTION_NO: {
        //title: "اسم الشارع 	 ",
        title: this.translate.instant('RoadesUdi.SECTION_NO'),

        type: "string",
      },
      CENTERLINE: {
        //title: "طول الشارع  ",
        title: this.translate.instant('RoadesUdi.CENTERLINE'),

        type: "number",
      },

      AREA: {
        //  title: "مساحة الشارع  ",
        title: this.translate.instant('RoadesUdi.AREA'),

        type: 'string',
      },

      LANES: {
        //title: "عدد الحارات   ",
        title: this.translate.instant('RoadesUdi.LANES'),

        type: 'string',
      }
      ,

      UDI_STREET: {
        // title: "حالة الرصف    ",
        title: this.translate.instant('RoadesUdi.UDI_STREET'),

        type: 'string',
      },

      LTYPE: {
        // title: "نوع المسارات    ",
        title: this.translate.instant('RoadesUdi.LTYPE'),

        type: 'string',
      },

      LTYPECOUN: {
        // title: "عدد المسارات   ",
        title: this.translate.instant('RoadesUdi.LTYPECOUN'),

        type: 'string',
      },

      SURVEY_DATE: {
        // title: " تاريخ المسح   ",
        title: this.translate.instant('RoadesUdi.SURVEY_DATE'),

        type: 'date',
      },

      SURVEY_NO: {
        // title: "رقم المسح    ",
        title: this.translate.instant('RoadesUdi.SURVEY_NO'),

        type: 'string',
      }

    },
  };
  source1: LocalDataSource = new LocalDataSource();
  //loading = true;
  loading = false;

  ngOnInit(): void {
    this.RoadsudiService.RoadsUdi
      ()
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;
        console.info(data)
        this.loading = true;

        this.source1.load(data);
        this.loading = false;

      });
  }

}

