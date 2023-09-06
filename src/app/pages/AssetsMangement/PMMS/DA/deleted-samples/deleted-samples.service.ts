
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class deletedsamplesService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    DeletedSamples(): Observable<any> {
    var DeletedSamples=this.AssetsSettingsService1.IRI.DeletedSamples.DeletedSamples

    return this.httpClient.get(
      DeletedSamples
    );
  }
}
