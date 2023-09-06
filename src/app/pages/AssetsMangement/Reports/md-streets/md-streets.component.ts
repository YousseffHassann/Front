import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AssetsSettingsService } from '../../assets-settings.service';
import { SurveyService } from '../../../Services/survey.service';
import { SwserviceService } from '../../../Services/swservice.service';
import { PmmsMdService } from '../../PMMS/MD/pmmsMd.service';
import { DataService } from '../../PMMS/PCI/data.service';
import { DataMdService } from '../../PMMS/MD/dataMd.service';
import { ReportsService } from '../../../Services/reports.service';


@Component({
  selector: 'ngx-md-streets',
  templateUrl: './md-streets.component.html',
  styleUrls: ['./md-streets.component.scss']
})
export class MDStreetsComponent implements OnInit {

  safeSrc: SafeResourceUrl;
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  surveyNo: String;
  surveys: [] = [];
  districtId: string;
  districts: [] =[];
  regionId: string;
  streets: [] = [];
  regions: []= [];
  showReport: boolean= false;
  dropdownList: any[];
  selectedItems: any[];
  dropdownSettings: {};
  streetsDropdownList: any[];
  streetsSelectedItems: any[];
  streetsDropdownSettings: {};
  SurveyDropdownList: any[];
  SurveySelectedItems: any[];
  SurveyDropdownSettings: {};
  mainNo: string;
  aa: string='http://localhost:8084/StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
  sectionNo: any;
  sections: any;
  sectionsDropdownList: any[];
  sectionsSelectedItems:[] = [];
  sectionsDropdownSettings: {

  };
  lanes: []= [];
  laneType: string ;
 StreetMD: string;
  laneMD: string;
  streetMDSafeSrc: SafeResourceUrl;
  laneMDSafeSrc: SafeResourceUrl;
  showLane: boolean;
  Status:any;
refresh:any;
loading:boolean=false;
afterRefresh:boolean=false;
Increase:any=0;
  StatusTime0: number;

  constructor(  private pmmsService: PmmsMdService,
    private dataServiceMd: DataService,
        private dataServiceMd2: DataMdService,
        private pmmsMD1:PmmsMdService,private sanitizer: DomSanitizer, private baseurl: AssetsSettingsService, private fb: FormBuilder,private survey: SurveyService,  private reportsService: ReportsService)
  {
    this.form = this.fb.group({ SN: ['', Validators.required], AreaNo: [''] ,StreetId: [''] ,SectionNo: [''],Lane:[''] }  );
  }





  Surveys(e) {
    this.streetsSelectedItems=[];
    this.sectionsSelectedItems=[];
    this.selectedItems=[];

    this.surveyNo = e.SURVEY_NO;
    console.log(this.surveyNo);
    console.log(this.form.get('SN') + '&streetId=' + this.form.controls.StreetId.value);
      this.reportsService.GetRegions(this.surveyNo).subscribe((res) => {
      console.log(res);
      this.regions = res;
      console.log(this.regions);
    });

  }


  GetRegions(e) {
    this.streetsSelectedItems=[];
    this.sectionsSelectedItems=[];
  this.streets=[];

    this.regionId = e.REGION_NO;
    console.log(this.regionId);

    this.reportsService.GetSecondaryStreets(this.surveyNo,this.regionId).subscribe((res1) => {
      console.log(res1);

      this.streets = res1;
      console.log(this.streets);
    });

  }


  streetsDDL(e){
    this.mainNo= e.MAIN_NO;
    this.reportsService.GetSectionByMainNo(this.mainNo).subscribe((res) => {
      console.log(res);

      this.sections = res;
      console.log(this.sections);
      this.sectionsSelectedItems=[];
   });
  }




downloadSTREETMDReport(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href', this.StreetMD + '&type=x'  );
  link.setAttribute('download', `MD-report.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
GetAllRegions(){
  this.reportsService.GetRegions(this.surveyNo).subscribe((res) => {
    console.log(res);
    this.regions = res;
    console.log(this.regions);
  });

}
Refresh() {
  this.loading = true;
  this.afterRefresh = true;

  this.pmmsMD1.Refresh("md", 14).subscribe((res) => {  //14
    console.log(res);
    this.refresh = res;

    setTimeout(() => {
      this.pmmsMD1.CheckStatus().subscribe((res) => {
        console.log(res);
        this.Status = res;

        if (res == 3) {
          this.submitForm();
        } else if (res == -1 || res == 1) {
          // this.pmmsMD1.CheckStatus().subscribe((another)=>{
          console.log("Under Processing");
          setTimeout(() => {
            // <<<---using ()=> syntax
            this.pmmsMD1.CheckStatus().subscribe((another) => { 
              console.log(another);
              this.Status = another;

              if (another == -1 || another == 1) {
                setTimeout(() => {
                  this.pmmsMD1.CheckStatus().subscribe((another2) => {
                    console.log(another2);
                    this.Status = another2;

                    if (another2 == -1 || another2 == 1) {
                      setTimeout(() => {
                        // <<<---using ()=> syntax
                        this.pmmsMD1.CheckStatus().subscribe((another3) => {
                          console.log(another3);
                          this.Status = another3;

                          if (another3 == -1 || another3 == 1) {
                            setTimeout(() => {
                              // <<<---using ()=> syntax
                              this.pmmsMD1
                                .CheckStatus()
                                .subscribe((another4) => {
                                  console.log(another4);
                                  this.Status = another4;
                                });
                            }, this.StatusTime0 ); //5
                          }
                        });
                      }, this.StatusTime0 ); //4
                    }
                  });
                }, this.StatusTime0 ); // 3
              }
            });
          }, this.StatusTime0 ); // 2
          // });
        }
      });
    }, this.StatusTime0); // 1

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





 
  ngOnInit(): void {


    this.pmmsMD1.CheckStatus().subscribe((res) => {
      console.log(res);
      this.Status = res;
      if (res == 1) {
        console.log("Process");
        this.pmmsMD1.Refresh("md", 14).subscribe((res) => {
          console.log(res);
        });
        setTimeout(() => {
          // <<<---using ()=> syntax
          this.pmmsMD1.CheckStatus().subscribe((another0) => {
            console.log(another0);
            this.Status = another0;
            console.log("after omimit");
            this.submitForm();

        
          });
        }, 1000);
      }
    });
    this.survey.GetSurvey().subscribe((response) => {
      console.log(response);
      this.surveys = response;
      console.log(this.surveys);

    });
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);






    this.GetAllRegions();
    this.dropdownList = [

    ];
    this.selectedItems = [

    ];

    this.dropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'REGION_NO',
      textField: 'ENNAME',
      maxHeight:197,
      //clearSearchFilter:false,
      //defaultOpen:true,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "There is no item available to show",
    };

    this.sectionsDropdownList = [

    ];
    this.sectionsSelectedItems = [

    ];

    this.sectionsDropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'SECTION_NO',
      textField: 'SECTION_NO',
      maxHeight:197,
      //clearSearchFilter:false,
      //defaultOpen:true,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "There is no item available to show",
    };


    this.streetsDropdownList = [

    ];
    this.streetsSelectedItems = [

    ];

    this.streetsDropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'MAIN_NO',
      textField: 'ENNAME',
      maxHeight:197,
      //clearSearchFilter:false,
      //defaultOpen:true,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "There is no item available to show",
    };
    this.SurveyDropdownList = [

    ];
    this.SurveySelectedItems = [

    ];

    this.SurveyDropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'SURVEY_NO',
      textField: 'SURVEY_NO',
      maxHeight:197,
      //clearSearchFilter:false,
      //defaultOpen:true,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "There is no item available to show",
    };

  }


  url: string;
  changeUrl() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }

  submitForm() {

    console.log(JSON.stringify(this.form.value));
    console.log(this.sectionsSelectedItems);
    console.log(this.form.controls.StreetId.value.length );


    this.showReport=true;
    if(this.form.controls.AreaNo.value.length == 0)
    {
      this.StreetMD = this.baseurl.ReportsHost + 'MDStreets2DESC.aspx?rname=IRIStreets&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&MainNo=null&AreaNo=null';
     }
    
    else if(this.form.controls.StreetId.value.length == 0) {
      this.StreetMD = this.baseurl.ReportsHost + 'MDStreets2DESC.aspx?rname=IRIStreets&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&MainNo=null&AreaNo='+this.form.controls.AreaNo.value[0].REGION_NO;
    }

     else 
    {
    this.StreetMD = this.baseurl.ReportsHost + 'MDStreets2DET.aspx?rname=MDStreets2DET&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO+'&AreaNo='+this.form.controls.AreaNo.value[0].REGION_NO;
     }

   //his.aa = this.baseurl.ReportsHost +'StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
    console.log(this.aa);

    this.streetMDSafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.StreetMD);
  

  }
  submitForm2() {

    this.showReport=true;
    // this.aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form.controls.SN.value + '&DID=' + this.form.controls.DID.value;
   // this.aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?rname=PCI_InterSections1&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&streetId=' + this.form.controls.StreetId.value[0].MAIN_NO;

    this.aa = this.baseurl.ReportsHost + 'StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
    // this.aa = this.baseurl.ReportsHost + 'PCI_SECTIONLANES2_V1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form2.controls.SN2.value + '&DID=' + this.form2.controls.DID2.value;

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  submitForm3() {
    this.aa = this.baseurl.ReportsHost + 'PCI_Regions1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form3.controls.SN3.value + '&DID=' + this.form3.controls.DID3.value;

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  selectTab($event: any): void {
    // this.showReport=false;
    // this.selectedItems = [];
    // this.streetsSelectedItems=[];
    // this.SurveySelectedItems=[];
    // this.aa = '';
    // this.form.reset();
    // this.form2.reset();
    // this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  onDeSelect(event:any){
    console.log(event);
    this.showReport=false;
    this.selectedItems=[];
    this.streetsSelectedItems=[];
    this.sectionsSelectedItems=[];
    this.showLane=false;
  }
  onDeSelectStreet(event:any){
    console.log(event);
    this.showReport=false;

    this.streetsSelectedItems=[];
    this.sectionsSelectedItems=[];
    this.showLane=false;

  }
  onDeSelectSurvey(event:any){
    console.log(event);
    
    this.showReport=false;
    this.SurveySelectedItems=[];
    this.selectedItems=[];
    this.streetsSelectedItems=[];
    this.sectionsSelectedItems=[];
    this.showLane=false;

  }
  onDeSelectSections(event:any){
    console.log(event);
    this.showReport=false;
    this.sectionsSelectedItems=[];
    this.showLane=false;

  }
}