import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AssetsSettingsService } from '../../../AssetsMangement/assets-settings.service';
import { SurveyService } from '../../../Services/survey.service';
import { SwserviceService } from '../../../Services/swservice.service';

@Component({
  selector: 'ngx-pci-inter-sections',
  templateUrl: './pci-inter-sections.component.html',
  styleUrls: ['./pci-inter-sections.component.scss']
})
export class PCIInterSectionsComponent implements OnInit {
  aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?SN=3';
  safeSrc: SafeResourceUrl;
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  surveyNo: any;
  surveys: any;
  districtId: any;
  districts: any;

  constructor(private sanitizer: DomSanitizer, private baseurl: AssetsSettingsService, private fb: FormBuilder,private survey: SurveyService,private swalkService: SwserviceService) { }



  Surveys(e) {
    this.surveyNo = e.target.value;
    console.log(this.surveyNo);

    this.survey.GetSurvey().subscribe((response) => {
      console.log(response);
      this.surveys = response;
      console.log(this.surveys);  
      
    });
    console.log('HELLOOOOOOO WELCOME HOME ######################################');  

    console.log(this.form2.controls.SN2.value);  

    console.log(this.aa);
   

  }
  Districts(e) {
    this.districtId = e.target.value;
    console.log(this.districtId);

    this.swalkService.GetDistricts().subscribe((response) => {
      console.log(response);
      this.districts = response;
      console.log(this.districts);  
      
    });
    console.log('HELLOOOOOOO WELCOME HOME ######################################');  

    console.log(this.form2.controls.DID2.value);  

    console.log(this.aa);
   

  }

  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
    this.form = this.fb.group({ SN: [''], DID: [''] });
    this.form2 = this.fb.group({ SN2: [''], DID2: [''] });
    this.form3 = this.fb.group({ SN3: [''], DID3: [''] });

  }


  url: string;
  changeUrl() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }
  submitForm() {
    this.aa = this.baseurl.ReportsHost + 'PCI_InterSections1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form.controls.SN.value + '&DID=' + this.form.controls.DID.value;

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  submitForm2() {
    this.aa = this.baseurl.ReportsHost + 'PCI_SECTIONLANES2_V1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form2.controls.SN2.value + '&DID=' + this.form2.controls.DID2.value;

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  submitForm3() {
    this.aa = this.baseurl.ReportsHost + 'PCI_Regions1.aspx?rname=PCI_Section_Lanes1&module=pci&SN=' + this.form3.controls.SN3.value + '&DID=' + this.form3.controls.DID3.value;

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }
  selectTab($event: any): void {
    this.aa = '';
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa)
  }


}
