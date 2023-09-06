
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class EquipmentLenthService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    DrawFinshedStreetsMFV(): Observable<any> {
    var DrawFinshedStreetsMFV=this.AssetsSettingsService1.IRI.EquipmentLenth.DrawFinshedStreetsMFV

    return this.httpClient.get(
      DrawFinshedStreetsMFV
    ); 
  }
}
