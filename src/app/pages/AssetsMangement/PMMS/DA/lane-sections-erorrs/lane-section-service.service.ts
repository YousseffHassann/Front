
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class LaneSectionServiceService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    GetSectionsErorrIRIDISTRESS(): Observable<any> {
    var GetSectionsErorrIRIDISTRESS=this.AssetsSettingsService1.IRI.LaneSectionsErorrs.GetSectionsErorrIRIDISTRESS

    return this.httpClient.get(
      GetSectionsErorrIRIDISTRESS
    );
  }
}
