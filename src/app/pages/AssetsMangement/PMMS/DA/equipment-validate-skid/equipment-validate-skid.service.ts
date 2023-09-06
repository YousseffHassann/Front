
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";
import { distinct } from 'rxjs/operators';

@Injectable({ providedIn: "root" })

export class equipmentvalidateskidService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    ValidateSKID(): Observable<any> {
    var ValidateSKID=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateSKID

    return this.httpClient.get(
      ValidateSKID
    );
  }
  ValidateSKID2(streetid,SURVEY_NO): Observable<any> {
    var ValidateSKID2=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateSKID

    return this.httpClient.get(
      ValidateSKID2+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
    );
  }
  
}
