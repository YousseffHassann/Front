import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })
export class EquipmenttwoService {
  albumid = new BehaviorSubject<string>("");
  postdata = new BehaviorSubject<string>("");

  selectalbumid = this.albumid.asObservable();
  selectpostdata = this.albumid.asObservable();

  constructor(
    private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService
  ) {}
 
  GetStreetsSectionsLengthBySurvey(streetid,SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey2link=this.AssetsSettingsService1.IRI.EquipmentTwo.GetStreetsSectionsLengthBySurveyequ2
    return this.httpClient.get(GetStreetsSectionsLengthBySurvey2link+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
 
    );
  }
  GetStreetsSectionsIRI(streetid): Observable<any> {
    var GetStreetsSectionsequ1=this.AssetsSettingsService1.IRI.EquipmentTwo.GetStreetsSectionsLengthequ2

    return this.httpClient.get(
      GetStreetsSectionsequ1+'?STREET_ID='+ streetid , {responseType: 'text'})
    .map(res => {
      return res;
 });
  
  }
  // equipmenttwo//

  GetStreetsInfo(streetid): Observable<any> {
    var GetStreetsInfoequ2=this.AssetsSettingsService1.IRI.EquipmentTwo.GetStreetsInfoequ2

    return this.httpClient.get(
      GetStreetsInfoequ2+'?STREET_ID='+ streetid
    );
  }
  
  GetStreetsIRI(): Observable<any> {
    var GetStreetsIRIequ2=this.AssetsSettingsService1.IRI.EquipmentTwo.GetStreetsIRIequ2
    return this.httpClient.get(
      GetStreetsIRIequ2
    );
    
  }
  GetStreetsInfoBySurvey(streetid,SURVEY_NO): Observable<any> {
    var GetStreetsInfoBySurvey=this.AssetsSettingsService1.IRI.Equipmentone.GetStreetsInfoBySurvey

    return this.httpClient.get(
      GetStreetsInfoBySurvey+'?MAIN_NO='+streetid+'&SURVEY_NO='+SURVEY_NO
    );
  }
 
  sendMessage = new Subject();

  communicatMessage(msg) {
    this.sendMessage.next(msg);
  }
}
