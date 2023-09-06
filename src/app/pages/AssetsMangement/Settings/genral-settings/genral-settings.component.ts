import { Component, OnInit } from '@angular/core';
import { AssetsSettingsService } from "../../assets-settings.service"
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { general_settingsService } from "../general_settings.service";
import { MdSettings } from "../MdSettings.model"
import { GetMAINT_DECISIONS_PCI } from "../GetMAINT_DECISIONS_PCI.model"
import { AlertService } from 'ngx-alerts'
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import{TranslateService} from '@ngx-translate/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { SmartTableData } from "../../../../@core/data/smart-table";
import { distinct } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ajaxGetJSON } from 'rxjs/internal-compatibility';
import { GenralSetting1Component } from '../genral-setting1/genral-setting1.component'
@Component({
  selector: 'ngx-genral-settings',
  templateUrl: './genral-settings.component.html',
  styleUrls: ['./genral-settings.component.scss']
})
export class GenralSettingsComponent implements OnInit {
  select = [];
  settings1: any;
  MAINT_DECISIONS_PCI = GetMAINT_DECISIONS_PCI;

  aa = 'http://localhost:34199/PCI_InterSections1.aspx?SN=7';


  source1: LocalDataSource = new LocalDataSource();
  safeSrc: SafeResourceUrl;

  constructor(private translate: TranslateService, private sanitizer: DomSanitizer, private alertService: AlertService, private assetssettingsService: AssetsSettingsService, public general_settingsService: general_settingsService) {
   
    translate.setDefaultLang('en');
    translate.use('en');
   
    this.general_settingsService.GetMdSettings2
      ()
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;
        console.info(data)

        this.source1.load(data);
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

        // MAINT_DEC_ID: {
        //   title: "MAINT_DEC_ID",
        //   type: "string",
        // },
        // STREET_TYPE: {
        //   title: "نوع الشارع",
        //   type: "string",

        //   // hide: true
        // },
        STREET_TYPE: {
         // title: "نوع الشارع",
          title: this.translate.instant('generalsettings.STREET_TYPE'),
         type: "string",
          valuePrepareFunction: (value, row, cell) => {
            if (row.STREET_TYPE == 1) {
              return "MAIN ROADS";

            }
            else if (row.STREET_TYPE == 0) {
              return "LOCAL ROADS";

            } else {
              return "UTILITY ROADS";

            }
          },
          editable: true,
          editor: {

            type: 'list',

            config: {
              selectText: 'Select',

              list:
                [{
                  value: '1', title: 'MAIN ROADS'
                },
                { value: '0', title: 'LOCAL ROADS' },
                {
                  value: '2', title: 'UTILITY ROADS'
                },]




            },
          }



        },
        // RECOMMENDED_DECISION_ID: {
        //   title: "كود قرار الصيانة",
        //   type: "string",




        // },

        RECOMMENDED_DECISION_ID: {
        //  title: "القرار ",
          title: this.translate.instant('generalsettings.RECOMMENDED_DECISION_ID'),

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
        LIMIT_RATIO: {
       //   title: " نسبة الإنتشار  ",
          title: this.translate.instant('generalsettings.LIMIT_RATIO'),

       type: "number",
        },
        GMAINT_DEC_ID: {
          // type: 'custom',
          // renderComponent: GenralSetting1Component,
       //   title: "قرار الصيانة المعمم  ",
          title: this.translate.instant('generalsettings.GMAINT_DEC_ID'),

          editor: {
            type: 'list',

            config: {
              selectText: 'Select',

              list:
                this.select


            },
          },
          valuePrepareFunction: (cell, row) => { return row.GMAINT_DEC },

        },



        // ,

        // RECORD_ID: {
        //   title: "RECORD_ID  ",
        //   type: 'string',
        //   editable: false,
        // }


      },
    };
  }
  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);

    this.general_settingsService.GetMdSettings();



    this.general_settingsService.GetMAINT_DECISIONS_PCI
      ()
      .subscribe((data) => {
        this.MAINT_DECISIONS_PCI = data;
        data.forEach(e => {
          this.select.push({
            value: e.RECOMMENDED_DECISION_ID, title: e.RECOMMENDED_DECISION

          }
          )

        });

        this.settings1 = this.loadTableSettings();


        // for (let o of data) {
        //   this.select.push({
        //     value: o.RECOMMENDED_DECISION_ID, title: o.RECOMMENDED_DECISION
        //   });

        // }

      });
  }




  updateRecord(event) {
    console.log(event);
    var data = {
      "GMAINT_DEC_ID": event.newData.GMAINT_DEC_ID,
      "STREET_TYPE": event.newData.STREET_TYPE,
      "MAINT_DEC_ID": event.newData.RECOMMENDED_DECISION_ID,
      "LIMIT_RATIO": event.newData.LIMIT_RATIO,
      "RECORD_ID": event.newData.RECORD_ID
    };


    if (event.newData.LIMIT_RATIO <= 100) {
      this.general_settingsService.UpdateMdSettings(data);
      event.confirm.resolve(event.newData);
      this.source1 = new LocalDataSource();
      location.reload();
      this.general_settingsService.GetMdSettings2
        ()
        .subscribe((data) => {
          this.source1.empty;
          this.source1.refresh;

          this.source1.load(data);
          this.settings1 = this.loadTableSettings();

        });




      this.alertService.info('تم التعديل بنجاح');

    } else {
      this.alertService.danger('من فضلك ادخل قيمة اقل من او يساوى 100');

    }



  }




  fillData(item) {
    this.general_settingsService.MdSetting.RECORD_ID = item.RECORD_ID;
    this.general_settingsService.MdSetting.LIMIT_RATIO = item.LIMIT_RATIO;
    this.general_settingsService.MdSetting.MAINT_DEC_ID = item.MAINT_DEC_ID;
    this.general_settingsService.MdSetting.STREET_TYPE = item.STREET_TYPE;
    this.general_settingsService.MdSetting.GMAINT_DEC_ID = item.GMAINT_DEC_ID;

  }

}


