import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { BehaviorSubject } from 'rxjs';
import { AssetsSettingsService } from '../../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class MDService {
  BehavDistrictId = new BehaviorSubject(0);
  TheOptionForRadioButton: any = new BehaviorSubject('option2');
  theSelectionOfDropDownList: any = new BehaviorSubject(1);

  constructor(private httpclient: HttpClient, private baseurl: AssetsSettingsService) { }

  //للكل   ahmed 23-5
  public getAllMDs(SECTION_NO: any,survey_no:any): Observable<any> {

    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetmaintenancedecisionsBySECTIONNO?SECTION_NO=${SECTION_NO}&survey_no=${survey_no}`);



    // return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetmaintenancedecisionsByDestrictId?DistrictId=${DistrictId}`);
    //return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetmaintenancedecisionsByDestrictId?DistrictId=`, DistrictId);

  }

  public GetCostOfSideWalksByDistrictId(DistrictID: number): Observable<any> {
    //return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetCostOfSideWalksByDistrictId?DistrictID=${DistrictID}`)
    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetCostOfSideWalksByDistrictId?DistrictID=${DistrictID}`);
  }

  // for عيوب الرصف

  public GetRegionjsByDistrictId(DistrictID): Observable<any> {
   // return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetAllByRegions?DistrictID=${DistrictID}`);
  
    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetAllByRegions?DistrictID=${DistrictID}`);

  }


  public GetyAllBySections(DistrictID): Observable<any> {  //3/5
    // return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetAllByRegions?DistrictID=${DistrictID}`);
   
     return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetyAllBySections?DistrictID=${DistrictID}`);
 
   }


  public GetSectionsByDistrictId(DistrictId): Observable<any> {
    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetAllByIntesections?DistrictID=${DistrictId}`);
  
  
  }

  public GetIntersectionsByDistrictId(DistrictId): Observable<any> {
    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/DistressSurveyPCI/GetAllByIntesections?DistrictID=${DistrictId}`);
  }





}
