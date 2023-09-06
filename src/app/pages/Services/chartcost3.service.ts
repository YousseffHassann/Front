import { Injectable } from '@angular/core';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Chartcost3Service {

  constructor(private httpclient:HttpClient,private first_part:AssetsSettingsService) { 

  }
  baseUrl:string=this.first_part.hostaddress2;




  GetAllSurvey():Observable<any>
   {
     return this.httpclient.get(this.baseUrl+"ChartsCost3/GetAllSurvey");
   }
   
   getAllRegions(survey_no):Observable<any>
  {
    return this.httpclient.get(this.baseUrl+`ChartsCost3/getAllRegions?survey_no=${survey_no}`);
  }


  GetAllStreetByRegionId(region_id):Observable<any>
  {
    return this.httpclient.get(this.baseUrl+`ChartsCost3/GetAllStreetByRegionId?RegionId=${region_id}`);
  }
  

   GetInfoChartOfRegion(survey_no,regionid):Observable<any>
   {
     return this.httpclient.get(this.baseUrl+`ChartsCost3/GetInfoChartOfRegion?survey_no=${survey_no}&regionid=${regionid}`);
   }

   GetInfoAboutStreet(main_no,survey_no):Observable<any>
   {
     return this.httpclient.get(this.baseUrl+`ChartsCost3/GetInfoAboutStreet?main_no=${main_no}&survey_no=${survey_no}`);
   }





   
   
}
