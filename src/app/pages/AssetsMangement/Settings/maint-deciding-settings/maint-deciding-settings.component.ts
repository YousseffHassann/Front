import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { general_settingsService } from "../general_settings.service";
import { MAINT_DECIDING } from "./MAINT_DECIDING.model"
import { GetDIST_CODE } from "../GetDIST_CODE.model"
import { GetMAINT_DECISIONS_PCI } from "../GetMAINT_DECISIONS_PCI.model"

import { TranslateService } from '@ngx-translate/core'
import { AlertService } from 'ngx-alerts'
import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../../@core/data/smart-table";
import { distinct } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-maint-deciding-settings',
  templateUrl: './maint-deciding-settings.component.html',
  styleUrls: ['./maint-deciding-settings.component.scss']
})
export class MAINTDECIDINGSettingsComponent implements OnInit {
  select = [];
  settings1: Object;
  MAINT_DECISIONS_PCI = GetMAINT_DECISIONS_PCI;

  DIST_CODE = GetDIST_CODE;
  SelectDIST_CODE = [];



  source1: LocalDataSource = new LocalDataSource();
  constructor(private translate: TranslateService, private alertService: AlertService, private assetssettingsService: AssetsSettingsService, public general_settingsService: general_settingsService) {

    translate.setDefaultLang('en');
    translate.use('en');

  }

  ngOnInit(): void {
    this.general_settingsService.GetMAINT_DECIDING2
      ()
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;
        console.info(data)

        this.source1.load(data);

      });
    this.general_settingsService.GetDIST_CODE
      ()
      .subscribe((data) => {
        this.DIST_CODE = data;
        data.forEach(e => {
          this.SelectDIST_CODE.push({
            value: e.DIST_CODE, title: e.DISTRESS_EN_TYPE

          })
        })


        // for (let o of data) {
        //   this.select.push({
        //     value: o.RECOMMENDED_DECISION_ID, title: o.RECOMMENDED_DECISION
        //   });

        // }
        this.settings1 = this.loadTableSettings();
      });
    this.general_settingsService.GetMAINT_DECISIONS_PCI
      ()
      .subscribe((data) => {
        this.MAINT_DECISIONS_PCI = data;
        data.forEach(e => {
          this.select.push({
            value: e.RECOMMENDED_DECISION_ID, title: e.RECOMMENDED_DECISION

          })
        })


        // for (let o of data) {
        //   this.select.push({
        //     value: o.RECOMMENDED_DECISION_ID, title: o.RECOMMENDED_DECISION
        //   });

        // }
        this.settings1 = this.loadTableSettings();
      });
  }


  loadTableSettings() {
    return {
      actions: { delete: false },

      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true,
      },
      // delete: {
      //   deleteButtonContent: '<i class="ion-trash-a"></i>',
      //   confirmDelete: true
      // },
      columns: {
        // index: {
        //   title: "Item",
        //   type: "text",
        //   width: "100px",
        //   valuePrepareFunction: (value, row, cell) => {
        //     return cell.row.index + 1;
        //   },
        // }
        // ,

        // RECORD_ID: {
        //   title: "RECORD_ID",
        //   type: "string",
        // },


        DIST_CODE: {
          //  title: "القرار ",
          title: this.translate.instant('maintdeciding.DIST_CODE'),
          // type: 'custom',
          // renderComponent: GenralSetting1Component,

          editor: {
            type: 'list',

            config: {
              selectText: 'Select',

              list:
                this.SelectDIST_CODE


            },
          },
          valuePrepareFunction: (cell, row) => { return row.DISTRESS_EN_TYPE },

        },




        DIST_SEVER: {
          // title: "شدة العيب",
          title: this.translate.instant('maintdeciding.DIST_SEVER'),

          type: "string",
          valuePrepareFunction: (value, row, cell) => {
            if (row.DIST_SEVER === 'L') {
              return "L";

            }
            else if (row.DIST_SEVER === 'M') {
              return "M";

            }
            else if (row.DIST_SEVER === 'H') {
              return "H";

            }
          },
          editable: true,

          editor: {
            type: 'list',
            config: {


              list:
                [{
                  value: 'L', title: 'L'
                },
                { value: 'M', title: 'M' },
                {
                  value: 'H', title: 'H'
                },]




            },

          }



        },
        DENSITY_FROM: {
          //  title: "الكثافة  من",
          title: this.translate.instant('maintdeciding.DENSITY_FROM'),

          type: "string",




        },
        DENSITY_TO: {
          editable: true,

          // title: "الكثافة الى ",
          title: this.translate.instant('maintdeciding.DENSITY_TO'),


        },
        // MAINT_DEC_ID: {
        //   title: " MAINT_DEC_ID  ",
        //   type: "number",
        //   editor: {
        //     type: 'list',
        //     config: {
        //       selectText: 'Select',

        //       list:

        //         this.select




        //     },
        //   }
        // },

        MAINT_DEC_ID: {
          // title: "القرار ",
          title: this.translate.instant('maintdeciding.MAINT_DEC_ID'),

          // type: 'custom',
          // renderComponent: GenralSetting1Component,

          editor: {
            type: 'list',

            config: {
              selectText: 'Select',

              list:
                this.select


            },
          },
          valuePrepareFunction: (cell, row) => { return row.RECOMMENDED_DECISION },

        },




      },
    };
  }

  updateRecord(event) {
    console.log(event);
    var data = {
      "MAINT_DEC_ID": event.newData.MAINT_DEC_ID,
      "DENSITY_TO": event.newData.DENSITY_TO,
      "DENSITY_FROM": event.newData.DENSITY_FROM,
      "DIST_SEVER": event.newData.DIST_SEVER,
      "DIST_CODE": event.newData.DIST_CODE,

      "RECORD_ID": event.newData.RECORD_ID
    };

    if (event.newData.DENSITY_FROM <= 100 && event.newData.DENSITY_TO <= 100) {
      event.confirm.resolve(event.newData);
      this.general_settingsService.UpdateMAINT_DECIDING2(data);
      this.alertService.info('تم التعديل بنجاح');
    } else {
      this.alertService.danger('من فضلك ادخل قيمة اقل من او يساوى 100');

    }



  }

}
