
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class RoadsudiService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    RoadsUdi(): Observable<any> {
    var RoadsUdi=this.AssetsSettingsService1.IRI.RoadesUdi.RoadsUdi

    return this.httpClient.get(
      RoadsUdi
    );
  }
}
