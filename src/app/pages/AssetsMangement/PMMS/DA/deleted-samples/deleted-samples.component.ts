import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { deletedsamplesService } from "./deleted-samples.service";
import { TranslateService } from '@ngx-translate/core'
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../DA/GetStreetsIRI.model"
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'ngx-deleted-samples',
  templateUrl: './deleted-samples.component.html',
  styleUrls: ['./deleted-samples.component.scss']
})
export class DeletedSamplesComponent implements OnInit {

  constructor(private translate: TranslateService, private assetsaettingsaervice: AssetsSettingsService, private deletedsamplesService: deletedsamplesService) {




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

      SAMPLE_ID: {
        //title: "رقم العينة",
        title: this.translate.instant('DeletedSamples.SAMPLE_ID'),

        type: "string",
      },


      MAIN_NO: {
        // title: "رقم الشارع 	 ",
        title: this.translate.instant('DeletedSamples.MAIN_NO'),

        type: "string",
      },
      STREET_ID: {
        //title: " رقم الشارع الفريد  ",
        title: this.translate.instant('DeletedSamples.STREET_ID'),

        type: "number",
      },

      ARNAME: {
        // title: "اسم  الشارع  ",
        title: this.translate.instant('DeletedSamples.ARNAME'),

        type: 'string',
      }

    },
  };
  source1: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.deletedsamplesService.DeletedSamples
      ()
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;
        console.info(data)

        this.source1.load(data);

      });
  }

}
