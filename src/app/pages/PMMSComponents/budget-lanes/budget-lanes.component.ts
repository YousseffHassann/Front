import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AssetsSettingsService } from '../../AssetsMangement/assets-settings.service';
import { AlertService } from 'ngx-alerts';
import { general_settingsService } from '../../AssetsMangement/Settings/general_settings.service';
import { PlLanesService } from '../../Services/pl-lanes.service';
import { max } from 'moment';

@Component({
  selector: 'ngx-budget-lanes',
  templateUrl: './budget-lanes.component.html',
  styleUrls: ['./budget-lanes.component.scss']
})
export class BudgetLanesComponent implements OnInit {

  Yearselect = [];
  aa: string;
  safeSrc: any;

  constructor(private sanitizer: DomSanitizer,private lane:PlLanesService,private translate: TranslateService, private baseurl: AssetsSettingsService, private alertService: AlertService, private formbulider: FormBuilder, private general_settingService: general_settingsService) { }
  budgetd = null;
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
          // return cell.row.index + 1;
       return   cell+1
        },
      },
      MAIN_NO: {
        // title: "رقم الشارع  ",

        title: this.translate.instant('PLanning.MAIN_NO'),
        type: "string",
      },
      MAINT_PRIORITY: {
        //   title: "معامل الاولوية  ",
        title: this.translate.instant('PLanning.MAINT_PRIORITY'),


        type: "string",
      },
      ARNAME: {
        title: this.translate.instant('PLanning.ARNAME'),
        type: "number",
      },
      INTEREC_STREET1: {
        title: this.translate.instant('PLanning.INTEREC_STREET1'),
        type: "number",
      },
      INTEREC_STREET2: {
        title: this.translate.instant('PLanning.INTEREC_STREET2'),
        type: "number",
      },
      EXPECTED_YEAR: {
        title: this.translate.instant('PLanning.EXPECTED_YEAR'),
        type: "number",
      },

      MD_COST: {
        title: this.translate.instant('PLanning.MD_COST'),
        type: "number",
      },

    },
    rowClassFunction: (row) => {
      if (row.data.MD_COST != "") {

        return "solved";
      }

      else {
        return "aborted";
      }

    },

  };
i:number=0;
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
      IND: {
        title: "Item",  //this
        // type: "text",
        // width: "100px",
        // valuePrepareFunction: (value, row, cell) => {

        //   return cell.row.index +1;
        // },
      },
      // MAIN_NO: {
      //   title: "رقم الشارع ",
      //   type: "string",
      // },
      MAINT_PRIORITY: {
        // title: "معامل الاولوية ",
        // title: this.translate.instant('PLanning.MAINT_PRIORITY'),
        title: "MAINT_PRIORITY",
        type: "string",
      },
      //  SECTION_ID: {
      //   title: "SECTION_ID  ",
      //   type: "string",
      // },
      // SURVEY_NO: {
      //   //   title: "رقم المسحه",
      //   title: this.translate.instant('PLanning.SURVEY_NO'),
      //   type: "number",
      // },
      SECTION_NO: {
        //   title: "رقم المسحه",
        title:"Section No",
        type: "string",
      },

      MD_AREA2: {
        //  title: "اسم الشارع ",
        title: this.translate.instant('PLanning.MD_AREA2'),

        type: "string",
      }
      ,

      MD_COST2: {
        //  title: "من الشارع ",
        title: this.translate.instant('PLanning.MD_COST2'),

        type: "string",
      },



      EXPECTED_YEAR: {
        //  title: "سنة الصيانة ",
        title: this.translate.instant('PLanning.EXPECTED_YEAR'),

        type: "string",
      },
      // EXPECTED_YEAR: {
      //   title: "EXPECTED_YEAR",
      //   type: "text",
      //   width: "100px",
      //   valuePrepareFunction: (value, row, cell) => {
      //     return 202222;
      //   },
      // },

    },
  };
  settings3 = {
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
      },
      RECORD_ID: {
        title: this.translate.instant('PLanning.RECORD_ID'),
        type: "string",
      }, MAINT_PRIORITY: {
        title: "MAINT_PRIORITY ",
        type: "string",
      },
      SURVEY_NO: {
        title: this.translate.instant('PLanning.SURVEY_NO'),
        type: "number",
      },

      MAINT_AREA: {
        title: this.translate.instant('PLanning.MAINT_AREA'),
        type: "string",
      }
      ,

      MD_COST: {
        title: this.translate.instant('PLanning.MD_COST'),
        type: "string",
      },

      REGION_NO: {
        title: this.translate.instant('PLanning.REGION_NO'),
        type: "string",
      },


      EXPECTED_YEAR: {
        title: this.translate.instant('PLanning.EXPECTED_YEAR'),
        type: "string",
      }

    },
  };
  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();


  insert : FormGroup = new FormGroup({
    YEAR_OF_BUDGET: new FormControl(null, [Validators.required, Validators.pattern(/^20\d{2}$/)]), 
    BUDGET: new FormControl(null, [Validators.required,Validators.maxLength(15),Validators.pattern('^(?!0)\\d+$')]),
    INTERSECTION_RATIO: new FormControl('0'),
    REGION_RATIO: new FormControl('0'),
    SECTION_RATIO: new FormControl('100'),

  });

  downloadReport() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.aa + '&type=x');
    link.setAttribute('download', `IRI-report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

  }

  report:any=false;
  butrep:any=false;
  afterclick()
  {
    this.report=true;
    this.aa = this.baseurl.ReportsHost + 'PrioSections2.aspx?rname=PrioSections2&module=pci';

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }

  ngOnInit(): void {


    this.lane.Get_PL_Planning_Lanes
      ()
      .subscribe((data) => {
        //   this.source1.empty;
        //   this.source1.refresh;
        //   this.source1.load(data);
      });
  }


  y:number=1;

  async insertbudget() {

    this.butrep=true;
    this.insert.value

    await this.lane.InsertPL_BUDGETLanes(this.insert.value).subscribe(
      res => {
        if (res.toString() != 'false') {
          this.alertService.info('Modified Successfully');
        }


      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.alertService.info('there\'s aproblem in data');
        } else {

          this.alertService.info('There\'s a problem in accessing database');
        }
      });
     
//////////////////////////////////////////////////////////////////
    await this.lane.PL_Planning_Lanes_Calc
      (this.insert.value).toPromise()
      .then(
        res => { // Success
        
          this.lane.Get_PL_Planning_Lanes
            ()
            .subscribe((data) => {

              // for(this.y=0;this.y<data.Length;this.y++)
              // {
              //    data[this.y].IND=this.y;
              //    console.log(this.y);
              // }

              const incrementedRows = data.map((row,i) => {
                return {
                  ...row,
                  IND: parseInt(row.IND )+ i
                 
                }
              });


              console.log(incrementedRows);

              console.log(this.y);

              console.log(res);
              console.log(data);


              this.source1.empty;
              this.source1.refresh;
              this.source1.load(incrementedRows);
              this.alertService.success('Sections displayed successfully');

            });
        }
      );

    // await this.general_settingService.PL_Planning_INTERSECTION_Calc
    //   (this.insert.value).toPromise()
    //   .then(
    //     res => { // Success
    //       this.general_settingService.GetPlINTERSECTIONS2
    //         ()
    //         .subscribe((data) => {
    //           this.source2.empty;
    //           this.source2.refresh;
    //           this.source2.load(data);
    //           this.alertService.success('تم عرض التقاطعات بنجاح');

    //         });
    //     }
    //   );
    // await this.general_settingService.PL_Planning_Regions_Calc
    //   (this.insert.value).toPromise()
    //   .then(
    //     res => { // Success
    //       this.general_settingService.GetPlRegions
    //         ()
    //         .subscribe((data) => {
    //           this.source3.empty;
    //           this.source3.refresh;
    //           this.source3.load(data);
    //           this.alertService.success('تم عرض المناطق بنجاح');

    //         });
    //     }
    //   );
    //await this.insert.reset({ YEAR_OF_BUDGET: [] });
    //await this.insert.reset({ BUDGET: [] });
    // this.insert.controls.BUDGET.setValue('');
    // this.insert.controls.YEAR_OF_BUDGET.setValue('');


  }

  onKeypressEvent() {


  }


  clickEvent() {


  }



}
