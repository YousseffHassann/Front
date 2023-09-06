import { Component, OnInit } from "@angular/core";
import { AvailableSurveys } from "../../Data/AvailableSurveys";
import { PmmsMdService } from "../../pmmsMd.service";
import { DataService } from "../../../PCI/data.service";
import { DataMdService } from "../../dataMd.service";

import { MainStreetsHavingSurveyDistresses } from "../../Data/MainStreetsHavingSurveyDistresses";
import { PCICalcService } from "../../../../../Services/pci-calc.service";
import { LocalDataSource } from "ng2-smart-table";
import { AssetsSettingsService } from "../../../../assets-settings.service";
import { AlertService } from "ngx-alerts";

@Component({
  selector: "ngx-calculate-main-street-sections-Md",
  templateUrl: "./calculate-main-street-sections-Md.component.html",
  styleUrls: ["./calculate-main-street-sections-Md.component.scss"],

  template: `
    <agm-map [latitude]="lat" [longitude]="lng" [mapTypeId]="mapType">
    </agm-map>
  `,
  styles: ["agm-map { height: 300px; }"],
})
export class CalculateMainStreetSectionsMdComponent implements OnInit {
  constructor(
    private pmmsService: PmmsMdService,
    private dataServiceMd: DataService,
    private dataServiceMd2: DataMdService,
    private pmmsMD1: PmmsMdService,
    private time: AssetsSettingsService,
    private alertService: AlertService,
  ) {
    this.StatusTime0 = time.StatusTime;
  }

  lat = 21.3069;
  lng = -157.8583;
  mapType = "satellite";

  StatusTime0: any;

  settings1md = {
    //lane

    actions: {
      delete: false,
      add: false,
      edit: false,
      position: "left",
    },

    pager: {
      display: true,
      perPage: 7,
      previous: "Prev",
      next: "Next",
    },

    columns: {
      SECTION_NO: {
        title: "SECTION_NO ",
        type: "number",
      },
      RECOMMENDED_DECISION: {
        title: "RECOMMENDED DECISION",
        type: "string",
      },
      RECOMMENDED_DECISION_ID: {
        title: "DECISION_ID",
        type: "string",
      },
      LANE: {
        title: "LANE TYPE",
        type: "number",
      },
      LANE_AREA: {
        title: " LANE AREA ",
        type: "number",
      },

      // MAINT_AREA: {
      //   title: 'MAINT_AREA',
      //   type: 'string',
      // },
      // MD_LANE: {
      //   title: 'MD_LANE',
      //   type: 'number',
      // },

      // SECTION_NO: {
      //   title: 'SECTION_NO',
      //   type: 'string',
      // },
    },
  };

  settings2md = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: "left",
    },

    pager: {
      display: true,
      perPage: 7,
      previous: "Prev",
      next: "Next",
    },

    columns: {
      SAMPLE_NO: {
        title: " SAMPLE_NO ",
        type: "number",
      },

      RECOMMENDED_DECISION: {
        title: "RECOMMENDED DECISION",
        type: "string",
      },
      RECOMMENDED_DECISION_ID: {
        title: "DECISION_ID",
        type: "string",
      },
      SAMPLE_AREA: {
        title: "SAMPLE AREA ",
        type: "number",
      },

      // SECTION_NO: {
      //   title: 'SECTION_NO',
      //   type: 'string',
      // },
      // LANE: {
      //   title: 'LANE',
      //   type: 'number',
      // },
    },
  };

  settings3md = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: "left",
    },

    pager: {
      display: true,
      perPage: 7,
      previous: "Prev",
      next: "Next",
    },

    columns: {
      SECTION_NO: {
        title: "SECTION_NO",
        type: "string",
      },

      RECOMMENDED_DECISION: {
        title: "RECOMMENDED DECISION",
        type: "string",
      },
      RECOMMENDED_DECISION_ID: {
        title: "DECISION_ID",
        type: "string",
      },

      MAINT_AREA: {
        title: "MAINT AREA ",
        type: "number",
      },
      // MAIN_NO: {
      //   title: ' MAIN_NO ',
      //   type: 'number',
      // },

      // MD_SAMPLES_CNT: {
      //   title: 'MD_SAMPLES_CNT',
      //   type: 'string',
      // },
      // LANE: {
      //   title: 'LANE',
      //   type: 'number',
      // },
    },
  };

  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();

  AvailableSurveys: AvailableSurveys[];
  MainStreetsHavingSurveyDistresses: MainStreetsHavingSurveyDistresses[];

  survey: string = localStorage.getItem("surveynumber");
  STREET_ID: string;
  mainorintrstreetMd: string = "1";
  mainorintrstreet: string = "1";

  /////////////////////////////////////////////////////////////////
  // Region Dropdown List
  regionsdropdownList = [];
  regionsselectedItems = [];
  regionsdropdownSettings = {};
  ////////////////////////////////////////////////////////////////

  // Streets Drowpdown List
  streetsdropdownList = [];
  streetsselectedItems = [];
  streetsdropdownSettings = {};

  regionselected = false;
  streetselected = false;

  Status: any;
  refresh: any;
  loading: boolean = false;
  afterRefresh: boolean = false;
  Increase: any = 0;
  Survey_no: any;


  Refresh() {
 
    this.loading = true;
    this.afterRefresh = true;

    this.pmmsMD1.Refresh("md", 14).subscribe((res) => {
      console.log(res);
      this.refresh = res;

      this.check_2Fun();

      setTimeout(() => {
        this.pmmsMD1.CheckStatus().subscribe((res) => {
          console.log(res);
          this.Status = res;
          this.check_2Fun();
          if (res == 3) {
            
            this.Status=3;
            this.alertService.success("Data Modified ");
            this.alertService.info("Successfully Refreshed ");
            location.reload();


            this.pmmsService
              .GetMDForLaneByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source1.load(res);
              });

            this.pmmsService
              .GetMDForSampleByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source2.load(res);
              });

            this.pmmsService
              .GetMDForSectionByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source3.load(res);
              });




          } 
          
          

          
          else if (res == -1 || res == 1) {
            // this.pmmsMD1.CheckStatus().subscribe((another)=>{
            console.log("Under Processing");
            setTimeout(() => {
              this.check_2Fun();
              // <<<---using ()=> syntax
              this.pmmsMD1.CheckStatus().subscribe((another) => {
                console.log(another);
                this.Status = another;

                if(this.Status==3)
                {
                     location.reload();
                     this.Status=3;
                }

                if (another == -1 || another == 1) {
                  setTimeout(() => {
                    this.check_2Fun();
                    this.pmmsMD1.CheckStatus().subscribe((another2) => {
                      console.log(another2);
                      this.Status = another2;

                      if (another2 == -1 || another2 == 1) {
                        setTimeout(() => {
                          this.check_2Fun();
                          // <<<---using ()=> syntax
                          this.pmmsMD1.CheckStatus().subscribe((another3) => {
                            console.log(another3);
                            this.Status = another3;

                            if(this.Status>0)
                            {
                                 location.reload();
                                 this.Status=3;
                            }

                            if (another3 == -1 || another3 == 1) {
                              setTimeout(() => {
                                this.check_2Fun();
                                // <<<---using ()=> syntax
                                this.pmmsMD1
                                  .CheckStatus()
                                  .subscribe((another4) => {
                                    console.log(another4);
                                    this.Status = another4;
                                  });
                              }, this.StatusTime0  ); //5
                            }
                          });
                        }, this.StatusTime0  ); //4
                      }
                    });
                  },this.StatusTime0  ); // 3
                }
              });
            }, this.StatusTime0   ); // this.StatusTime0 2
            // });
          }
        });
      }, this.StatusTime0 ); // 1

      //  this.pmmsMD1.CheckStatus().subscribe((status)=>{
      //   console.log(status);

      //   // if(status!=-1)
      //   // {
      //   //    this.loading=false;
      //   //    this.Status=1;
      //   //    console.log(status);
      //   // }
      //   // else{
      //   //  console.log("status is -1");
      //   // }

      //  });
    });
 
  }
check_2:any;
check_2bool:boolean=false;

check_2Fun()
{
  this.pmmsMD1.CheckFor_2().subscribe((res)=>{
    this.check_2=res;
    console.log(res);
  
    if(this.check_2==-2)
    {
      this.check_2bool=true;
      this.loading = true;
      console.log("check2boolo is true ");
    }
    else
    {
      this.check_2bool=false;
      console.log("check2boolo is false ");
    }
  });
}



  ngOnInit() {


    this.check_2Fun();





    console.log("loading");
    console.log(this.loading)
    this.Survey_no = localStorage.getItem("surveynumber");
    console.log(this.Survey_no);

    this.pmmsMD1.CheckStatus().subscribe((res) => {
      console.log(res);
      this.Status = res;
      if (res == 1) {
        console.log("Process");
        this.pmmsMD1.Refresh("md", 14).subscribe((res) => {   //14
          console.log(res);
        });
        setTimeout(() => {
          // <<<---using ()=> syntax
          this.pmmsMD1.CheckStatus().subscribe((another0) => {
            console.log(another0);
            this.Status = another0;
            console.log("after omimit");

            this.pmmsService
              .GetMDForLaneByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source1.load(res);
              });

            this.pmmsService
              .GetMDForSampleByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source2.load(res);
              });

            this.pmmsService
              .GetMDForSectionByMainNo(this.main_no)
              .subscribe((res) => {
                console.log(res);
                this.source3.load(res);
              });
          });
        }, this.StatusTime0 );
      }
    });

    /////////////////////////////////////////////////////
    this.regionsdropdownList = [];
    this.regionsselectedItems = [];
    this.regionsdropdownSettings = {
      singleSelection: true,
      idField: "REGION_ID",
      textField: "ENNAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    ///////////////////////////////////////////////////////
    this.streetsdropdownList = [];
    this.streetsselectedItems = [];
    this.streetsdropdownSettings = {
      singleSelection: true,
      idField: "MAIN_NO",
      textField: "ENNAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    /////Hi all2333   9999
    // this.pciService.getallregions().subscribe((data) => {
    //   console.log(data)
    //   this.AvailableSurveys = data;
    // });
    // this.pmmsService
    //   .GetMainStreetsHavingSurveyDistressesjson()
    //   .subscribe((data) => {
    //     this.MainStreetsHavingSurveyDistresses = data;
    //   });

    this.getallregions();
  }

  radioChange() {
    this.mainorintrstreetMd = "1";
  }
  radioChange1() {
    this.mainorintrstreetMd = "2";
  }

  ondatasubmit() {
    console.log("gggggggggggggggggg");
    let data = {
      survey: localStorage.getItem("surveynumber"),
      STREET_ID: this.STREET_ID,
    };
    console.log(data);
    this.dataServiceMd.raisSTREET_ID(this.STREET_ID);
    this.dataServiceMd.raismainorintrstreet("1");

    //let obj=JSON.stringify(data);

    this.dataServiceMd.raisSTREET_IDMd(this.STREET_ID);
    this.dataServiceMd2.raismainorintrstreetMd(this.mainorintrstreetMd);
    this.dataServiceMd2.raisdatemmiterMd(data); //console.warn(JSON.stringify(data));
  }
  survey_no = localStorage.getItem("surveynumber");

  getallregions() {
    this.dataServiceMd.getcalcregions(this.survey_no).subscribe((res) => {
      console.log(res);
      this.regionsdropdownList = res;
      console.log(this.regionsdropdownList);
    });
  }


  streetIDHashMap=new Map<string, string>()
  onRegionSelect(event) {
    console.log("");
    console.log(event);

    this.regionselected = true;

    // this.streetsselectedItems=[];
    // this.streetselected=false;

    this.dataServiceMd
      .getcalcstreetsbyregion(+event.REGION_ID, this.survey_no)
      .subscribe((res) => {
        console.log(res);
        this.streetsdropdownList = res;
        res.forEach(element => {
          this.streetIDHashMap.set(element["MAIN_NO"],element["STREET_ID"])
        });
        console.log(this.streetIDHashMap)

        //   this.STREET_ID= this.streetsdropdownList["street_id"];

        // this.streetsselectedItems=[];

        // this.main_no=res.MAIN_NO;
      });
  }
  x: any = "sdddd";
  main_no: string;
  onStreetSelect(event) {
    console.log(event);
    this.STREET_ID = this.streetIDHashMap.get(event.MAIN_NO);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log(this.STREET_ID)
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&")
    this.main_no = event.MAIN_NO;
    console.log(this.main_no);
    this.pmmsService.MainNoService.next(this.STREET_ID);
    console.log(this.pmmsService.MainNoService.getValue());

    this.pmmsService.GetMDForLaneByMainNo(this.main_no).subscribe((res) => {
      console.log(res);
      this.source1.load(res);
    });

    this.pmmsService.GetMDForSampleByMainNo(this.main_no).subscribe((res) => {
      console.log(res);
      this.source2.load(res);
    });

    this.pmmsService.GetMDForSectionByMainNo(this.main_no).subscribe((res) => {
      console.log(res);
      this.source3.load(res);
    });

    //localStorage.setItem("main_no",this.main_no);
  }
}
