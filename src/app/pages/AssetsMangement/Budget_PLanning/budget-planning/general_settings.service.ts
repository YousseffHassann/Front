
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../assets-settings.service";
import "rxjs/add/operator/map";
@Injectable({ providedIn: "root" })

export class general_settingsService {



  constructor(private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }

  InsertPL_BUDGET(data: any) {
    var InsertPL_BUDGET = this.AssetsSettingsService1.Budget.InsertPL_BUDGET
    //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));

    return this.httpClient.post(InsertPL_BUDGET, data)




  }
  Get_PL_Planning_Sections(): Observable<any> {
    var Get_PL_Planning_Sections = this.AssetsSettingsService1.Budget.Get_PL_Planning_Sections
    return this.httpClient.get(
      Get_PL_Planning_Sections
    );

  }
  Get_PL_Planning_Sections2(): Observable<any> {
    return this.httpClient.get("assets/data/sectionplaning1.json");
  }




  PL_Planning_Sections_Calc(data: any): Observable<any> {
    var PL_Planning_Sections_Calc = this.AssetsSettingsService1.Budget.PL_Planning_Sections_Calc
    return this.httpClient.post(
      PL_Planning_Sections_Calc, data
    );

  }

  PL_Planning_INTERSECTION_Calc(data: any): Observable<any> {
    var PL_Planning_INTERSECTION_Calc = this.AssetsSettingsService1.Budget.PL_Planning_INTERSECTION_Calc
    return this.httpClient.post(
      PL_Planning_INTERSECTION_Calc, data
    );

  }
  PL_Planning_Regions_Calc(data: any): Observable<any> {
    var PL_Planning_Regions_Calc = this.AssetsSettingsService1.Budget.PL_Planning_Regions_Calc
    return this.httpClient.post(
      PL_Planning_Regions_Calc, data
    );

  }
  Get_Budget_data(data: any): Observable<any> {
    var Get_Budget_data = this.AssetsSettingsService1.Budget.Get_Budget_data
    return this.httpClient.post(
      Get_Budget_data, data
    );

  }
  GetPlINTERSECTIONS3(): Observable<any> {
    var GetPlINTERSECTIONS2 = this.AssetsSettingsService1.Budget.GetPlINTERSECTIONS2
    return this.httpClient.get(
      GetPlINTERSECTIONS2
    );

  }
  GetPlINTERSECTIONS2(): Observable<any> {
    return this.httpClient.get("assets/data/GetPlINTERSECTIONS2.json");
  }

  GetPlRegions(): Observable<any> {
    return this.httpClient.get("assets/data/GetPlRegions.json");
  }
  GetPlRegions2(): Observable<any> {
    var GetPlRegions = this.AssetsSettingsService1.Budget.GetPlRegions
    return this.httpClient.get(
      GetPlRegions
    );

  }


}
