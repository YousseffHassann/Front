import { Component, OnInit } from "@angular/core";
import { CalculateMainStreetSectionsPCI } from "../Data/CalculateMainStreetSectionsPCI";
import { PmmsMdService } from "../pmmsMd.service";
import { DataMdService } from "../dataMd.service";
import { AvailableSurveys } from "../Data/AvailableSurveys";
import { LocalDataSource } from "ng2-smart-table";
import { TranslateService } from '@ngx-translate/core'

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { Console } from "console";
@Component({
  selector: "ngx-dataresultMd",
  templateUrl: "./dataresultMd.component.html",
  styleUrls: ["./dataresultMd.component.scss"],
  providers: [PmmsMdService],
})
export class DataresultMdComponent implements OnInit {
  lstCalculateMainStreetSectionsPCI: CalculateMainStreetSectionsPCI[];
  loading = false;
  valueaction: string;
  inputText: string;




  settings1 = {
    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
     
    
      PCI_VALUE: {
        title: this.translate.instant('dataresultMd.PCI_VALUE'),
        type: "string",
      },
      PCI_RATE: {
        title: this.translate.instant('dataresultMd.PCI_RATE'),
        type: "string",
      },
      MAINT_AREA: {
        title: this.translate.instant('dataresultMd.MAINT_AREA'),
        type: "string",
      },
      DISTRESS_EN_TYPE: {
        title: this.translate.instant('dataresultMd.DISTRESS_EN_TYPE'),
        type: "string",
      }, LANE_TYPE: {
        title: this.translate.instant('dataresultMd.LANE_TYPE'),
        type: "string",
      },
      RECOMMENDED_DECISION: {
        title: this.translate.instant('dataresultMd.RECOMMENDED_DECISION'),
        type: "string",
      },
    },
  };
  settings2 = {
    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      INTERSECTION_TITLE: {
        title: this.translate.instant('dataresultMd.INTERSECTION_TITLE'),
        type: "number",
      },
      PCI_RATE: {
        title: this.translate.instant('dataresultMd.PCI_RATE'),
        type: "string",
      },
      RECOMMENDED_DECISION: {
        title: this.translate.instant('dataresultMd.RECOMMENDED_DECISION'),
        type: "string",
      },
      PCI_DATE: {
        title: this.translate.instant('dataresultMd.PCI_DATE'),
        type: "string",
      },
      MEASURING: {
        title: this.translate.instant('dataresultMd.MEASURING'),
        type: "string",
      },
      INTER_NO: {
        title: this.translate.instant('dataresultMd.INTER_NO'),
        type: "string",
      },
      PCI_VALUE: {
        title: this.translate.instant('dataresultMd.PCI_VALUE'),
        type: "string",
      },
    },
  };

  settings3 = {
    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      ARNAME: {
        title: this.translate.instant('dataresultMd.ARNAME'),
        type: "string",
      },
      MAINT_AREA: {
        title: this.translate.instant('dataresultMd.MAINT_AREA'),
        type: "string",
      },
      PCI_VALUE: {
        title: this.translate.instant('dataresultMd.PCI_VALUE'),
        type: "string",
      },
      PCI_RATE: {
        title: this.translate.instant('dataresultMd.PCI_RATE'),
        type: "string",
      }, RECOMMENDED_DECISION: {
        title: this.translate.instant('dataresultMd.RECOMMENDED_DECISION'),
        type: "string",
      },
    },
  };
  settings4 = {
    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      ARNAME: {
        title: this.translate.instant('dataresultMd.ARNAME'),
        type: "string",
      },
      MUNIC_ANAME: {
        title: this.translate.instant('dataresultMd.MUNIC_ANAME'),
      },
      PCI_VALUE: {
        title: this.translate.instant('dataresultMd.PCI_VALUE'),
        type: "string",
      },
      PCI_RATE: {
        title: this.translate.instant('dataresultMd.PCI_RATE'),
        type: "string",
      }, RECOMMENDED_DECISION: {
        title: this.translate.instant('dataresultMd.RECOMMENDED_DECISION'),
        type: "string",
      },
    },
  };
  settings5 = {
    mode: "external",
    hideSubHeader: true,

    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      ARNAME: {
        title: this.translate.instant('dataresultMd.ARNAME'),
        type: "string",
      },
      MAINT_AREA: {
        title: this.translate.instant('dataresultMd.MAINT_AREA'),
        type: "string",
      },
      PCI_VALUE: {
        title: this.translate.instant('dataresultMd.PCI_VALUE'),
        type: "string",
      },
      PCI_RATE: {
        title: this.translate.instant('dataresultMd.PCI_RATE'),
        type: "string",
      }, RECOMMENDED_DECISION: {
        title: this.translate.instant('dataresultMd.RECOMMENDED_DECISION'),
        type: "string",
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  source4: LocalDataSource = new LocalDataSource();
  source5: LocalDataSource = new LocalDataSource();



  sourceLanes: LocalDataSource = new LocalDataSource();
  sourceSamples: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService,
    private pmmsService: PmmsMdService,
    private dataServiceMd: DataMdService
  ) { }


  

main_no:any;
  



  ngOnInit() {
      // console.log("BehaviorSubject");

    // console.log(this.pmmsService.MainNoService.getValue());
    
    // this.pmmsService.MainNoService.subscribe(()=>{
    //   this.main_no=this.pmmsService.MainNoService.getValue();
    //   console.log(this.main_no);
    // });
localStorage.getItem(this.main_no);

console.log("dataresult");
    this.dataServiceMd.datemmiterMd.subscribe((value1) => {
      this.loading = true;
      this.pmmsService
        .get_MD_MainStreetSections()
        .subscribe((data) => {
          this.loading = false;
          console.warn(data);
          this.source1.empty;
          this.source1.refresh;
        //  console.log(localStorage.getItem(this.main_no));
          this.source1.load(data);
          this.loading = false;
        });

      // this.inputText = value;
    });



    this.dataServiceMd.mainorintrstreetMd.subscribe((value6) => {
      if (value6 == "1") {
        this.valueaction = `1`;

        this.dataServiceMd.datemmiterMd.subscribe((value1) => {
          this.loading = true;
          this.pmmsService
            .get_MD_MainStreetSections()
            .subscribe((data) => {
              this.loading = false;
              console.warn(data);
              this.source1.empty;
              this.source1.refresh;

              this.source1.load(data);
              this.loading = false;
            });

          // this.inputText = value;
        });
      }
      if (value6 == "2") {
        this.valueaction = `2`;

        this.dataServiceMd.datemmiterMd.subscribe((value2) => {

          this.loading = true;
          this.pmmsService
            .get_MD_MainStreetInterSections(value2)
            .subscribe((data1) => {
              this.loading = false;
              this.source2.empty;
              this.source2.refresh;

              this.source2.load(data1);
              this.loading = false;

              //   alert(JSON.stringify(data1));
            });

          // this.inputText = value;
        });
      }
      if (value6 == "3") {
        this.valueaction = `3`;

        this.dataServiceMd.datemmiterMd.subscribe((value3) => {
          this.loading = true;
          this.pmmsService
            .get_MD_SecondaryStByRegion(value3)
            .subscribe((data3) => {
              this.source3.empty;
              this.source3.refresh;

              this.source3.load(data3);
              this.loading = false;

            });

          // this.inputText = value;
        });
      }
      if (value6 == "4") {
        this.valueaction = `4`;

        this.dataServiceMd.datemmiterMd.subscribe((value4) => {
          this.loading = true;
          this.pmmsService
            .get_MD_SecondaryStByDistrict(value4)
            .subscribe((data4) => {
              this.source4.empty;
              this.source4.refresh;

              this.source4.load(data4);
              this.loading = false;

              console.warn(data4);
            });

          // this.inputText = value;
        });
      }
      if (value6 == "5") {
        this.valueaction = `5`;

        this.dataServiceMd.datemmiterMd.subscribe((value5) => {
          this.loading = true;
          this.pmmsService
            .get_MD_SecondaryStByMunicipality(value5)
            .subscribe((data5) => {
              this.source5.empty;
              this.source5.refresh;

              this.source5.load(data5);
              this.loading = false;

              console.warn(data5);
            });

          // this.inputText = value;
        });
      }
      // this.inputText = value;
    });

    
  }



}
