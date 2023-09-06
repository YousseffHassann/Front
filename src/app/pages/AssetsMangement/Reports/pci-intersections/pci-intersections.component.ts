import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetsSettingsService } from '../../assets-settings.service';
import { SurveyService } from '../../../Services/survey.service';
import { SwserviceService } from '../../../Services/swservice.service';
import { ReportsService } from '../../../Services/reports.service';



@Component({
  selector: 'ngx-pci-intersections',
  templateUrl: './pci-intersections.component.html',
  styleUrls: ['./pci-intersections.component.scss']
})
export class PciIntersectionsComponent implements OnInit  {
laneURI:string ;
sampleURI:string ;
laneURIsafeSrc: SafeResourceUrl;
sampleURIsafeSrc: SafeResourceUrl;
 form: FormGroup;
 form2: FormGroup;
 form3: FormGroup;
 surveyNo: string;
 surveys: [] = [];
 districtId: string = null;
 districts: [] = [];
 regionId: string = null;
 streets: [] =[];
 regions: [] =[];
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
 streetId: any;
  laneType: string;
  mainNo: string;
  sections: [] = [];
  sectionNo: string = null;
  lanes: [];
  sectionURI: string;
  sectionURIsafeSrc: SafeResourceUrl;
  sectionsDropdownList: any[];
  sectionsSelectedItems: any[];
  sectionsDropdownSettings: {};
  showLane: boolean;
 //aa: string='http://localhost:8084/StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';

 constructor(private sanitizer: DomSanitizer, private baseurl: AssetsSettingsService, private fb: FormBuilder,private survey: SurveyService,private reportsService: ReportsService)
 {this.form = this.fb.group({ SN: ['', Validators.required], AreaId: ['', Validators.required] ,StreetId: ['', Validators.required] ,SectionNo: [''],Lane:[''] }  );
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
SectionsDDL(e){
 this.sectionNo = e.SECTION_NO;
  
 this.reportsService.GetAllLanesBySectionNo(this.sectionNo).subscribe((res)=> {
  console.log(res);
   
  this.lanes = res;
  console.log(this.sections);
  this.showLane=true;
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
downloadLanePCIReport(){
  const link = document.createElement('a');
  link.setAttribute('target', '_blank');
  link.setAttribute('href',   this.laneURI + '&type=x');
  link.setAttribute('download', `PCI-report.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();

}

downloadSamplePCIReport(){
const link = document.createElement('a');
link.setAttribute('target', '_blank');
link.setAttribute('href',   this.sampleURI + '&type=x');
link.setAttribute('download', `PCI-report.pdf`);
document.body.appendChild(link);
link.click();
link.remove();

}

downloadSectionPCIReport(){
const link = document.createElement('a');
link.setAttribute('target', '_blank');
link.setAttribute('href', this.sectionURI + '&type=x'  );
link.setAttribute('download', `PCI-report.pdf`);
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
 ngOnInit(): void {

   this.survey.GetSurvey().subscribe((response) => {
     console.log(response);
     this.surveys = response;
     console.log(this.surveys);  
     
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
     //limitSelection:1,
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
  // this.laneURIsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.laneURI);
 }
 submitForm() {

  this.showReport=true;
   console.log(JSON.stringify(this.form.value));
   if(this.form.controls.SectionNo.value.length == 0) {
    this.laneURI = this.baseurl.ReportsHost + 'PCILanes2_V.aspx?rname=PCILanes2_V&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=null&Lane=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
    this.sectionURI = this.baseurl.ReportsHost + 'PCISections.aspx?rname=PCISections&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
    this.sampleURI = this.baseurl.ReportsHost + 'PCISamples2_V.aspx?rname=PCISamples2_V&module=pci&surveyNo=' +this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=null&Lane=null&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;

  } 
else
{
  this.sectionURI = this.baseurl.ReportsHost + 'PCISections.aspx?rname=PCISections&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=' + this.form.controls.SectionNo.value[0].SECTION_NO  + '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
  this.laneURI = this.baseurl.ReportsHost + 'PCILanes2_V.aspx?rname=PCILanes2_V&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=' + this.form.controls.SectionNo.value[0].SECTION_NO + '&Lane=' + this.laneType + '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
  this.sampleURI = this.baseurl.ReportsHost + 'PCISamples2_V.aspx?rname=PCISamples2_V&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&SectionNo=' + this.form.controls.SectionNo.value[0].SECTION_NO + '&Lane=' + this.laneType + '&MainNo=' + this.form.controls.StreetId.value[0].MAIN_NO;
}
   
  
 // this.aa = 'http://localhost:8084/StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
   console.log(this.laneURI);
   this.laneURIsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.laneURI);
   this.sampleURIsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.sampleURI);
   this.sectionURIsafeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.sectionURI);

 }
//  submitForm2() {

//    this.showReport=true;
//    // this.aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form.controls.SN.value + '&DID=' + this.form.controls.DID.value;
//    this.aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?rname=PCI_InterSections1&module=pci&surveyNo=' + this.form.controls.SN.value[0].SURVEY_NO + '&streetId=' + this.form.controls.StreetId.value[0].MAIN_NO;
   
//    //this.aa = 'http://localhost:8084/StaticReports/IRIreport_NamaaFinalReport9-5-2023.pdf';
//    // this.aa = this.baseurl.ReportsHost + 'PCI_SECTIONLANES2_V1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form2.controls.SN2.value + '&DID=' + this.form2.controls.DID2.value;

//    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
//  }
//  submitForm3() {   
//    this.aa = this.baseurl.ReportsHost + 'PCI_Regions1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form3.controls.SN3.value + '&DID=' + this.form3.controls.DID3.value;

//    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
//  }
 selectTab($event: any): void {
  //  this.showReport=false;
  //  this.selectedItems = [];
  //  this.streetsSelectedItems=[];
  //  this.SurveySelectedItems=[];
  //  this.laneURI = '';
  //  this.form.reset();  
  //  this.form2.reset();
  //  this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.laneURI)
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
