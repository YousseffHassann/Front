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
  selector: 'ngx-prio-lanes2',
  templateUrl: './prio-lanes2.component.html',
  styleUrls: ['./prio-lanes2.component.scss']
})
export class PRIOLANES2Component implements OnInit {
  // aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?SN=3';
  safeSrc: SafeResourceUrl;
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  surveyNo: String;
  surveys: [] = [];
  districtId: string;
  districts: [] = [];
  regionId: string;
  streets: [] = [];
  regions: [] = [];
  showReport: boolean = false;
  showLane: boolean = false;
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
  aa: string ;
  sectionNo: any;
  sections: any;
  sectionsDropdownList: any[];
  sectionsSelectedItems: any[];
  sectionsDropdownSettings: {

  };
  lanes: [] = [];
  laneType: string;
  sectionIRI: string;
  sectionIRISafeSrc: SafeResourceUrl;
  laneIRI: string;
  laneIRISafeSrc: SafeResourceUrl;
  Status:any;
refresh:any;
loading:boolean=false;
afterRefresh:boolean=false;
Increase:any=0;
  StatusTime0: number;

  constructor(  private pmmsService: PmmsMdService,
    private dataServiceMd: DataService,
        private dataServiceMd2: DataMdService,
        private pmmsMD1:PmmsMdService,private sanitizer: DomSanitizer, private baseurl: AssetsSettingsService, private fb: FormBuilder,private survey: SurveyService, private reportsService: ReportsService)
  {this.form = this.fb.group({ SN: ['', Validators.required], AreaId: ['', Validators.required] ,StreetId: ['', Validators.required] ,SectionNo: [''],Lane:[''] }  );
 }



  Surveys(e) {
    this.streetsSelectedItems = [];
    this.sectionsSelectedItems = [];
    this.selectedItems = [];

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
    this.streetsSelectedItems = [];
    this.sectionsSelectedItems = [];
    this.regionId = e.REGION_NO;
    console.log(this.regionId);

    this.reportsService.GetSecondaryStreets(this.surveyNo,this.regionId).subscribe((res1) => {
      console.log(res1);

      this.streets = res1;
      console.log(this.streets);
    });


  }


  streetsDDL(e) {
    this.mainNo = e.MAIN_NO;
    this.reportsService.GetSectionByMainNo(this.mainNo).subscribe((res) => {
      console.log(res);

      this.sections = res;
      console.log(this.sections);
      this.sectionsSelectedItems = [];
    });
  }
  SectionsDDL(e) {
    this.sectionNo = e.SECTION_NO;

    this.reportsService.GetAllLanesBySectionNo(this.sectionNo).subscribe((res) => {
      console.log(res);

      this.lanes = res;
      console.log(this.sections);
      this.showLane = true;
    });

  }

  LanesRD(e)    //88888
  {
    console.log("*******************")
    console.log(this.lanes)
    console.log("*******************")
    console.log(this.lanes)
    this.laneType = e;   //in new radiio update 10-5
  }
  downloadLaneIRIReport() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.laneIRI + '&type=x');
    link.setAttribute('download', `Prio-report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

  }

  downloadSampleIRIReport() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.aa + '&type=x');
    link.setAttribute('download', `Prio-report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

  }

  downloadSectionIRIReport() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.sectionIRI + '&type=x');
    link.setAttribute('download', `Prio-report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

  }
  GetAllRegions() {
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

    this.survey.GetSurvey().subscribe((response) => {
      console.log(response);
      this.surveys = response;
      console.log(this.surveys);

    });

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
      maxHeight: 197,
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
      maxHeight: 197,
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
      maxHeight: 197,
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
      maxHeight: 197,
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

    this.showReport = true;
    // if (this.form.controls.SectionNo.value.length == 0) {
      
    //   this.aa = this.baseurl.ReportsHost + 'IRISamples.aspx?rname=IRISamples&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=null&Lane=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
    //   this.sectionIRI = this.baseurl.ReportsHost + 'IRISections.aspx?rname=IRISections&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO +'&SectionNo=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
    //   this.laneIRI = this.baseurl.ReportsHost + 'IRILanes.aspx?rname=IRILanes&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=null&Lane=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
  
    // }

      this.aa = this.baseurl.ReportsHost + 'PrioLanes.aspx?rname=PrioLanes&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
      this.sectionIRI = this.baseurl.ReportsHost + 'PrioLanes.aspx?rname=PrioLanes&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO +  '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
      this.laneIRI = this.baseurl.ReportsHost + 'PrioLanes.aspx?rname=PrioLanes&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO +  '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;

    

    //his.aa = this.baseurl.ReportsHost +'StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
    console.log(this.aa);

    this.sectionIRISafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.sectionIRI);
    this.laneIRISafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.laneIRI);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }
  submitForm2() {

    this.showReport = true;
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
    // //this.form.reset();  
    // //this.form2.reset();
    // this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  onDeSelect(event: any) {
    console.log(event);
    this.showReport = false;
    this.selectedItems = [];
    this.streetsSelectedItems = [];
    this.sectionsSelectedItems = [];
    this.showLane = false;
  }
  onDeSelectStreet(event: any) {
    console.log(event);
    this.showReport = false;

    this.streetsSelectedItems = [];
    this.sectionsSelectedItems = [];
    this.showLane = false;

  }
  onDeSelectSurvey(event: any) {
    console.log(event);
    this.showReport = false;
    this.SurveySelectedItems = [];
    this.selectedItems = [];
    this.streetsSelectedItems = [];
    this.sectionsSelectedItems = [];
    this.showLane = false;

  }
  onDeSelectSections(event: any) {
    console.log(event);
    this.showReport = false;
    this.sectionsSelectedItems = [];
    this.showLane = false;

  }
}
