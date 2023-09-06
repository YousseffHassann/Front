import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })
export class EquipmenteightService {
  albumid = new BehaviorSubject<string>("");
  postdata = new BehaviorSubject<string>("");

  selectalbumid = this.albumid.asObservable();
  selectpostdata = this.albumid.asObservable();

  constructor(
    private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService
  ) { }



  // equipmentone//
  GetStreetsSectionsIRI(streetid): Observable<any> {
    var GetStreetsSectionsequ1 = this.AssetsSettingsService1.IRI.Equipmentone.GetStreetsSections

    return this.httpClient.get(
      GetStreetsSectionsequ1 + '?STREET_ID=' + streetid, { responseType: 'text' })
      .map(res => {
        return res;
      });

  }
  GetStreetsDDF(): Observable<any> {
    var GetStreetsDDF = this.AssetsSettingsService1.IRI.EquipmentEight.GetStreetsDDF

    return this.httpClient.get(
      GetStreetsDDF
    );

  }
  GetStreetsInfoBySurvey(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsInfoBySurvey = this.AssetsSettingsService1.IRI.EquipmentEight.GetStreetsInfoBySurvey

    return this.httpClient.get(
      GetStreetsInfoBySurvey + '?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  GetStreetsInfoDDF(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsInfoDDF = this.AssetsSettingsService1.IRI.EquipmentEight.GetStreetsInfoDDF

    return this.httpClient.get(
      GetStreetsInfoDDF + '?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  GetStreetsSectionsLengthBySurvey(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey = this.AssetsSettingsService1.IRI.EquipmentEight.GetStreetsSectionsLengthBySurvey

    return this.httpClient.get(
      GetStreetsSectionsLengthBySurvey + '?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  } GetStreetsSectionsLengthDDFCLEAN(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthDDFCLEAN = this.AssetsSettingsService1.IRI.EquipmentEight.GetStreetsSectionsLengthDDFCLEAN

    return this.httpClient.get(
      GetStreetsSectionsLengthDDFCLEAN + '?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  // GetStreetsSectionsIRI(streetid): Observable<any> {

  //   return this.httpClient.get(
  //       "http://10.0.0.8/Assets/api/PCI/MainStreetPCI/GetStreetsSections?STREET_ID="+streetid, {responseType: 'json'}
  //   )
  //   .map(res => {
  //     return res;
  // })
  // }
  GetStreetsSectionsLengthBySurveyEQ2(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey2link = this.AssetsSettingsService1.IRI.EquipmentTwo
    return this.httpClient.get(GetStreetsSectionsLengthBySurvey2link + 'MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO

    );
  }
  GetStreetsSectionsLengthBySurvey2(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey2link = this.AssetsSettingsService1.IRI.MainStreetPCI.GetStreetsSectionsLengthBySurvey2url
    return this.httpClient.get(GetStreetsSectionsLengthBySurvey2link + 'MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO

    );
  }
  GetStreetsInfo(streetid): Observable<any> {
    return this.httpClient.get(
      'http://10.0.0.20/Assets/api/PCI/MainStreetPCI/GetStreetsInfo?STREET_ID=' + streetid
    );
  }
  GetStreetsSectionsBySurvey(streetid, SURVEY_NO): Observable<any> {
    return this.httpClient.get(
      'http://10.0.0.20/Assets/api/PCI/MainStreetPCI/GetStreetsSectionsBySurvey?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  // MD api
  get_MD_MainStreetSections(datapost): Observable<any> {
    return this.httpClient.post(
      "http://10.0.0.20/Assets/api/PCI/MaintenanceDecisionsPCI/get_MD_MainStreetSections",
      datapost
    );
  }
  get_MD_SecondaryStByRegion(datapost): Observable<any> {

    return this.httpClient.post(
      "http://10.0.0.20/Assets/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByRegion",
      datapost
    );
  }
  get_MD_MainStreetInterSections(datapost): Observable<any> {
    return this.httpClient.post(
      "http://10.0.0.20/Assets/api/PCI/MaintenanceDecisionsPCI/get_MD_MainStreetInterSections",
      datapost
    );
  }
  get_MD_SecondaryStByDistrict(datapost): Observable<any> {
    return this.httpClient.post(
      "http://10.0.0.20/Assets/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByDistrict",
      datapost
    );
  }

  get_MD_SecondaryStByMunicipality(datapost): Observable<any> {
    return this.httpClient.post(
      "http://10.0.0.20/Assets/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByMunicipality",
      datapost
    );
  }
  sendMessage = new Subject();

  communicatMessage(msg) {
    this.sendMessage.next(msg);
  }
}
