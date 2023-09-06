
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class contractorService {



  constructor(private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }

  InsertContractor(data: any) {
    var InsertContractor = this.AssetsSettingsService1.CONTRACTOR.InsertContractor
    //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));

    return this.httpClient.post(InsertContractor, data)




  }
  Get_Contractor(): Observable<any> {
    var Get_Contractor = this.AssetsSettingsService1.CONTRACTOR.Get_Contractor
    return this.httpClient.get(
      Get_Contractor
    );

  }

  // DeleteCONTRACTOR(data) {
  //   var DeleteCONTRACTOR = this.AssetsSettingsService1.CONTRACTOR.DeleteCONTRACTOR
  //   //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));
  //   return this.httpClient.delete(DeleteCONTRACTOR, data).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //     });

  // }
  DeleteCONTRACTOR(CONTRACTOR_ID: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    var DeleteCONTRACTOR = this.AssetsSettingsService1.CONTRACTOR.DeleteCONTRACTOR

    return this.httpClient.delete(DeleteCONTRACTOR, {
      body: {
        "CONTRACTOR_ID": CONTRACTOR_ID,
      },
      headers: headers,
    },
    );
  }
  UpdateContractor(data) {
    var UpdateContractor = this.AssetsSettingsService1.CONTRACTOR.UpdateContractor
    //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));
    return this.httpClient.put(UpdateContractor, data).subscribe(
      res => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });

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
  GetPlINTERSECTIONS2(): Observable<any> {
    var GetPlINTERSECTIONS2 = this.AssetsSettingsService1.Budget.GetPlINTERSECTIONS2
    return this.httpClient.get(
      GetPlINTERSECTIONS2
    );

  }
  GetPlRegions(): Observable<any> {
    var GetPlRegions = this.AssetsSettingsService1.Budget.GetPlRegions
    return this.httpClient.get(
      GetPlRegions
    );

  }


}
