import { Component, OnInit } from '@angular/core';
import { PmmsMdService } from '../../AssetsMangement/PMMS/MD/pmmsMd.service';
import { DataService } from '../../AssetsMangement/PMMS/PCI/data.service';
import { DataMdService } from '../../AssetsMangement/PMMS/MD/dataMd.service';
import { AssetsSettingsService } from '../../AssetsMangement/assets-settings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'ngx-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {

  constructor( 
    private pmmsService: PmmsMdService,
    private dataServiceMd: DataService,
    private dataServiceMd2: DataMdService,
    private pmmsMD1: PmmsMdService,
    private time: AssetsSettingsService,
    private alertService: AlertService,
  ) 
    {  
       this.StatusTime0 = time.StatusTime;
    }

  StatusTime0: any;
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



            // this.pmmsService
            //   .GetMDForLaneByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source1.load(res);
            //   });

            // this.pmmsService
            //   .GetMDForSampleByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source2.load(res);
            //   });

            // this.pmmsService
            //   .GetMDForSectionByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source3.load(res);
            //   });




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
                if(another==3)
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


                      if(another2==3)
                      {
                           this.Status=3;
                           location.reload();
                      }
                      

                      if (another2 == -1 || another2 == 1) {
                        setTimeout(() => {
                          this.check_2Fun();
                          // <<<---using ()=> syntax
                          this.pmmsMD1.CheckStatus().subscribe((another3) => {
                            console.log(another3);
                            this.Status = another3;


                            if(another3==3)
                            {
                                 this.Status=3;
                                 location.reload();
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

  ngOnInit(): void {

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
            console.log("after onimit");

            if(this.Status==3)
            {
              this.alertService.success("Last Updated MD  ");
                 location.reload();
            }

            // this.pmmsService
            //   .GetMDForLaneByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source1.load(res);
            //   });

            // this.pmmsService
            //   .GetMDForSampleByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source2.load(res);
            //   });

            // this.pmmsService
            //   .GetMDForSectionByMainNo(this.main_no)
            //   .subscribe((res) => {
            //     console.log(res);
            //     this.source3.load(res);
            //   });
          });
        }, this.StatusTime0 );
      }
    });
  }

}
