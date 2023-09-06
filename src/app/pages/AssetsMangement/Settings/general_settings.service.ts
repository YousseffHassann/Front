
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../assets-settings.service";
import "rxjs/add/operator/map";
import { MdSettings } from "./MdSettings.model"
@Injectable({ providedIn: "root" })

export class general_settingsService {
  MdSettings: MdSettings[];
  MdSetting: MdSettings;


  constructor(private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
  GetMdSettings2(): Observable<any> {
    var GetMdSettings = this.AssetsSettingsService1.Settings.GetMdSettings

    return this.httpClient.get(
      GetMdSettings
    );
  }


  //ahmed update
    
  GetPlINTERSECTIONS2(): Observable<any> {
    return this.httpClient.get("assets/data/GetPlINTERSECTIONS2.json");
  }

  GetPlRegions2(): Observable<any> {
    var GetPlRegions = this.AssetsSettingsService1.Budget.GetPlRegions
    return this.httpClient.get(
      GetPlRegions
    );
  }

  //////////////////////////////

  UpdateMdSettings(data) {
    var UpdateMdSettings = this.AssetsSettingsService1.Settings.UpdateMdSettings
    //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));
    return this.httpClient.put(UpdateMdSettings, data).subscribe(
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
  GetMAINT_DECISIONS_PCI(): Observable<any> {
    var GetMAINT_DECISIONS_PCI = this.AssetsSettingsService1.Settings.GetMAINT_DECISIONS_PCI

    return this.httpClient.get(
      GetMAINT_DECISIONS_PCI
    );
  }
  GetMdSettings() {
    var GetMdSettings = this.AssetsSettingsService1.Settings.GetMdSettings
    this.httpClient.get(GetMdSettings).toPromise().then(
      res => {
        this.MdSettings = res as MdSettings[];
      }
    )
  }
  GetMAINT_DECIDING2(): Observable<any> {
    var GetMAINT_DECIDING2 = this.AssetsSettingsService1.Settings.GetMAINT_DECIDING2

    return this.httpClient.get(
      GetMAINT_DECIDING2
    );
  }
  GetMAINT_DECIDING2_SWALK(): Observable<any> {
    var GetMAINT_DECIDING2_SWALK = this.AssetsSettingsService1.Settings.GetMAINT_DECIDING2_SWALK

    return this.httpClient.get(
      GetMAINT_DECIDING2_SWALK
    );
  }
  GetDIST_CODE(): Observable<any> {
    var GetDIST_CODE = this.AssetsSettingsService1.Settings.GetDIST_CODE

    return this.httpClient.get(
      GetDIST_CODE
    );
  }
  UpdateMAINT_DECIDING2(data) {
    var UpdateMAINT_DECIDING2 = this.AssetsSettingsService1.Settings.UpdateMAINT_DECIDING2
    //this.httpClient.put(UpdateMdSettings, JSON.stringify(data));
    return this.httpClient.put(UpdateMAINT_DECIDING2, data).subscribe(
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
}
