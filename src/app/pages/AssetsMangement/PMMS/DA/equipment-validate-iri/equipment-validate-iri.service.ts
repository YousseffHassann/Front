
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class equipmentvalidateiriService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    ValidateIRI(): Observable<any> {
    var ValidateIRI=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateIRI

    return this.httpClient.get(
      ValidateIRI
    );
  }
 ValidateIRI2(streetid,SURVEY_NO): Observable<any> {
    var ValidateIRI2=this.AssetsSettingsService1.IRI.EquipmentValidateIRI.ValidateIRI

    return this.httpClient.get(
      ValidateIRI2+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
    );
  }
  
}
