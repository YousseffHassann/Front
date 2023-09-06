
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class equipmentvalidategprService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    ValidateGPR(): Observable<any> {
    var ValidateGPR=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateGPR

    return this.httpClient.get(
      ValidateGPR
    );
  }
  ValidateGPR2(streetid,SURVEY_NO): Observable<any> {
    var ValidateGPR2=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateGPR

    return this.httpClient.get(
      ValidateGPR2+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
    );
  }
  
}
