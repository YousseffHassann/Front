import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { LaneSectionServiceService } from "./lane-section-service.service";
import { TranslateService } from '@ngx-translate/core'
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../DA/GetStreetsIRI.model"
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'ngx-lane-sections-erorrs',
  templateUrl: './lane-sections-erorrs.component.html',
  styleUrls: ['./lane-sections-erorrs.component.scss']
})
export class LaneSectionsErorrsComponent implements OnInit {

  constructor(private translate: TranslateService, private assetsaettingsaervice: AssetsSettingsService, private LaneSectionServiceService: LaneSectionServiceService) {
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
      }
      ,

      MAIN_NO: {
        // title: "رقم الشارع	 	 ",
        title: this.translate.instant('LaneSectionsErorrs.MAIN_NO'),
        type: "string",
      },


      SECTION_NO: {
        // title: "رقم المقطع	 ",
        title: this.translate.instant('LaneSectionsErorrs.SECTION_NO'),

        type: "string",
      },
      SURVEY_NO: {
        // title: "عدد  المقاطع",
        title: this.translate.instant('LaneSectionsErorrs.SURVEY_NO'),

        type: "number",
      },

      IS_DDF: {
        // title: "عدد الحارات ",
        title: this.translate.instant('LaneSectionsErorrs.IS_DDF'),

        type: 'html',
      }

    },
  };


  source1: LocalDataSource = new LocalDataSource();
  loading = false;


  ngOnInit(): void {
    console.log(this.loading);

    this.LaneSectionServiceService.GetSectionsErorrIRIDISTRESS
      ()
      .subscribe((data) => {
        this.loading = false;

        this.source1.empty;
        this.source1.refresh;
        console.info(data)
this.loading=true;

console.log(this.loading);

        this.source1.load(data);
      });

    //this.loading = true;

  }

}
