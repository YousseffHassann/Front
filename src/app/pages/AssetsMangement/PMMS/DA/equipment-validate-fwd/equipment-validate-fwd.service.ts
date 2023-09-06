
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class equipmentvalidatefwdService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    ValidateFWD(): Observable<any> {
    var ValidateFWD=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateFWD

    return this.httpClient.get(
      ValidateFWD
    );
  }
  ValidateFWD2(streetid,SURVEY_NO): Observable<any> {
    var ValidateFWD2=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateSKID

    return this.httpClient.get(
      ValidateFWD2+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
    );
  }
  
}
