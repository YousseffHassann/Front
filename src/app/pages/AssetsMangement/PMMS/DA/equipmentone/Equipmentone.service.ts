import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../../AssetsMangement/assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })
export class EquipmentoneService {
  albumid = new BehaviorSubject<string>("");
  postdata = new BehaviorSubject<string>("");

  selectalbumid = this.albumid.asObservable();
  selectpostdata = this.albumid.asObservable();

  constructor(
    private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService
  ) { }
  GetAvailableSurveysjson(): Observable<any> {
    return this.httpClient.get("assets/data/GetAvailableSurveys.json");
  }
  CalculateMainStreetSectionsPCIjson(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/pci/sectionspci/CalculateMainStreetSectionsPCI",
      datapost
    );
  }
  RegionSecondaryStreetsPCI_ByDistrict(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByDistrict",
      datapost
    );
  }
  RegionSecondaryStreetsPCI_ByMunicipality(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByMunicipality",
      datapost
    );
  }
  CalculateRegionSecondaryStreetsPCI(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/RegionSecondaryStPCI/CalculateRegionSecondaryStreetsPCI",
      datapost
    );
  }
  CalculateMainStreetIntersectionsPCI(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/pci/IntersectionPCI/CalculateMainStreetIntersectionsPCI",
      datapost
    );
  }

  GetMainStreetsHavingSurveyDistressesjson(): Observable<any> {
    return this.httpClient.get(
      "https://localhost:44310/api/pci/MainStreetPCI/GetMainStreetsHavingSurveyDistresses"
    );
  }

  GetSurveyedMunicipalities(): Observable<any> {
    return this.httpClient.get("assets/data/GetSurveyedMunicipalities.json");
  }
  GetSurveyedDistricts(): Observable<any> {
    return this.httpClient.get("assets/data/GetSurveyedDistricts.json");
  }
  GetSurveyedRegions(): Observable<any> {
    return this.httpClient.get("assets/data/GetSurveyedRegions.json");
  }
  GetAvailableSurveys(): Observable<any> {
    return this.httpClient.get(
      "https://localhost:44310/api/pci/DistressSurveyPCI/GetAvailableSurveys"
    );
  }
  GetMainStreetsHavingSurveyDistresses(): Observable<any> {
    return this.httpClient.get(
      "https://localhost:44310/api/pci/MainStreetPCI/GetMainStreetsHavingSurveyDistresses"
    );
  }


  // equipmentone//
  GetStreetsSectionsIRI(streetid): Observable<any> {
    var GetStreetsSectionsequ1 = this.AssetsSettingsService1.IRI.Equipmentone.GetStreetsSections

    return this.httpClient.get(
      GetStreetsSectionsequ1 + '?STREET_ID=' + streetid, { responseType: 'text' })
      .map(res => {
        return res;
      });

  }
  GetStreetsIRI(): Observable<any> {
    var GetStreetsIRIequ1 = this.AssetsSettingsService1.IRI.Equipmentone.GetStreetsIRI

    return this.httpClient.get(
      "https://localhost:44310/api/PCI/MainStreetPCI/GetStreetsIRI"
    );

  }
  GetStreetsInfobyserequ1(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsInfoequ1 = this.AssetsSettingsService1.IRI.Equipmentone.GetStreetsInfoBySurvey

    return this.httpClient.get(
      GetStreetsInfoequ1 + '?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  // GetStreetsSectionsIRI(streetid): Observable<any> {

  //   return this.httpClient.get(
  //       "https://localhost:44310/api/PCI/MainStreetPCI/GetStreetsSections?STREET_ID="+streetid, {responseType: 'json'}
  //   )
  //   .map(res => {
  //     return res;
  // })
  // }
  GetStreetsSectionsLengthBySurveyEQ2(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey2link = this.AssetsSettingsService1.IRI.EquipmentTwo
    //  alert(GetStreetsSectionsLengthBySurvey2link)
    return this.httpClient.get(GetStreetsSectionsLengthBySurvey2link + 'MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO

    );
  }
  GetStreetsSectionsLengthBySurvey2(streetid, SURVEY_NO): Observable<any> {
    var GetStreetsSectionsLengthBySurvey2link = this.AssetsSettingsService1.IRI.MainStreetPCI.GetStreetsSectionsLengthBySurvey2url
    //  alert(GetStreetsSectionsLengthBySurvey2link)
    return this.httpClient.get(GetStreetsSectionsLengthBySurvey2link + 'MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO

    );
  }
  GetStreetsInfo(streetid): Observable<any> {
    return this.httpClient.get(
      'https://localhost:44310/api/PCI/MainStreetPCI/GetStreetsInfo?STREET_ID=' + streetid
    );
  }
  GetStreetsSectionsBySurvey(streetid, SURVEY_NO): Observable<any> {
    return this.httpClient.get(
      'https://localhost:44310/api/PCI/MainStreetPCI/GetStreetsSectionsBySurvey?MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  // MD api
  get_MD_MainStreetSections(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/MaintenanceDecisionsPCI/get_MD_MainStreetSections",
      datapost
    );
  }
  get_MD_SecondaryStByRegion(datapost): Observable<any> {

    return this.httpClient.post(
      "https://localhost:44310/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByRegion",
      datapost
    );
  }
  get_MD_MainStreetInterSections(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/MaintenanceDecisionsPCI/get_MD_MainStreetInterSections",
      datapost
    );
  }
  get_MD_SecondaryStByDistrict(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByDistrict",
      datapost
    );
  }

  get_MD_SecondaryStByMunicipality(datapost): Observable<any> {
    return this.httpClient.post(
      "https://localhost:44310/api/PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByMunicipality",
      datapost
    );
  }
  sendMessage = new Subject();

  communicatMessage(msg) {
    this.sendMessage.next(msg);
  }
}
