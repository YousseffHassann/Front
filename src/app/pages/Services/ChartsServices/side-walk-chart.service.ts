import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetsSettingsService } from '../../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SideWalkChartService {

  TheOptionForRadioButton: any = new BehaviorSubject('option1');
  BehavDistrictId = new BehaviorSubject(1);
  constructor(private httpclient: HttpClient, private baseurl: AssetsSettingsService) { }
  ser: string = "service"
  url: string = this.baseurl.hostaddress2;
  chartsinfo(DisId: number): Observable<any>  // District
  {
    //return this.httpclient.get(`http://10.0.0.2:8082/api/api/PCI/Charts/GetChartsInfo?DistrectId=${DisId}`);
    return this.httpclient.get(this.baseurl.hostaddress2 + `PCI/Charts/GetChartsInfo?DistrectId=${DisId}`);
  }

  SurveyNumber(): Observable<any>  // District
  {
    return this.httpclient.get(this.baseurl.hostaddress2 + "PCI/Charts/GetAllSurvey");
  }


  // getAllRegions(): Observable<any> {
  //   return this.httpclient.get(this.url + "PCI/DistressSurveyPCI/getAllRegions");  //willdelete 29-5
  // }

  getAllRegions(surveyno): Observable<any> {
    return this.httpclient.get(this.url + `PCI/DistressSurveyPCI/getAllRegions?survey_no=${surveyno}`);
  }


  GetAllStreetByRegionId(RegionId: number): Observable<any> {
    return this.httpclient.get(this.url + `PCI/DistressSurveyPCI/GetAllStreetByRegionId?RegionId=${RegionId}`);
  }


  GetDistressByStreetId(MAIN_NO: any,survey_no:any): Observable<any> {
    return this.httpclient.get(this.url + `PCI/DistressSurveyPCI/GetDistressByStreetId?MAIN_NO=${MAIN_NO}&survey_no=${survey_no}`);
  }

  GetInfoAboutSectionDistress(SectionNo: number): Observable<any> {
    return this.httpclient.get(this.url + `PCI/Charts/GetInfoAboutSectionDistress?SectionNo=${SectionNo}`);
  }

  //22-5-2023

  GetInfoAboutMAINNO(main_no,s_no): Observable<any> {
    return this.httpclient.get(this.url + `PCI/Charts/GetInfoAboutStreet?main_no=${main_no}&survy_no=${s_no}`);
  }

  GetInfoAboutStreetForCost(main_no,s_no): Observable<any> {
    return this.httpclient.get(this.url + `PCI/Charts/GetInfoAboutStreetForCost?main_no=${main_no}&survy_no=${s_no}`);
  }





  


}
