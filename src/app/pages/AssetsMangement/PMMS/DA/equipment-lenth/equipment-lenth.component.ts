import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { EquipmentLenthService } from "./EquipmentLenth.service";

import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { GetStreetsIRI } from "../../DA/GetStreetsIRI.model"
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'ngx-equipment-lenth',
  templateUrl: './equipment-lenth.component.html',
  styleUrls: ['./equipment-lenth.component.scss']
})
export class EquipmentLenthComponent implements OnInit {


  constructor(private assetsaettingsaervice: AssetsSettingsService, private EquipmentLenthService: EquipmentLenthService) { }
  loading = false;

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
        title: "رقم الشارع	 	 ",
        type: "string",
      },

      ARNAME: {
        title: "اسم الشارع	 	 ",
        type: "string",
      },
      LENGTHSHAPE: {
        title: "الطول المرسوم KM 	 ",
        type: "string",
      },
      LENGTHIRI: {
        title: "الطول المسموح KM  ",
        type: "number",
      }

    },
  };
  source1: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.EquipmentLenthService.DrawFinshedStreetsMFV
      ()
      .subscribe((data) => {
        // this.loading = true;

        //  this.source1.empty;
        // this.source1.refresh;
        //  console.info(data)

        // this.source1.load(data);   
        //  this.loading = false;

      });
  }

}

