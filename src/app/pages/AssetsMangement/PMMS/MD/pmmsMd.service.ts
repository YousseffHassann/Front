import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../AssetsMangement/assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })
export class PmmsMdService {
  albumid = new BehaviorSubject<string>("");
  postdata = new BehaviorSubject<string>("");

  selectalbumid = this.albumid.asObservable();
  selectpostdata = this.albumid.asObservable();

  constructor(
    private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService
  ) { }


  
  GetAvailableSurveysjson(): Observable<any> {
    // return this.httpClient.get("assets/data/GetAvailableSurveys.json");
    var GetAvailableSurveys = this.AssetsSettingsService1.MD.MDclaculate.GetAvailableSurveys

    return this.httpClient.get(
      GetAvailableSurveys
    );
  }

  
baseUrl:string=this.AssetsSettingsService1.hostaddress2;


  CalculateMainStreetSectionsPCIjson(datapost): Observable<any> {
    var CalculateMainStreetSectionsPCI = this.AssetsSettingsService1.MD.MDclaculate.CalculateMainStreetSectionsPCI

    return this.httpClient.post(
      CalculateMainStreetSectionsPCI,
      datapost
    );
  }
  RegionSecondaryStreetsPCI_ByDistrict(datapost): Observable<any> {
    var RegionSecondaryStreetsPCI_ByDistrict = this.AssetsSettingsService1.MD.MDclaculate.RegionSecondaryStreetsPCI_ByDistrict

    return this.httpClient.post(
      RegionSecondaryStreetsPCI_ByDistrict,
      datapost
    );
  }
  RegionSecondaryStreetsPCI_ByMunicipality(datapost): Observable<any> {
    var RegionSecondaryStreetsPCI_ByMunicipality = this.AssetsSettingsService1.MD.MDclaculate.RegionSecondaryStreetsPCI_ByMunicipality

    return this.httpClient.post(
      RegionSecondaryStreetsPCI_ByMunicipality,
      datapost
    );
  }
  CalculateRegionSecondaryStreetsPCI(datapost): Observable<any> {
    var CalculateRegionSecondaryStreetsPCI = this.AssetsSettingsService1.MD.MDclaculate.CalculateRegionSecondaryStreetsPCI

    return this.httpClient.post(
      CalculateRegionSecondaryStreetsPCI,
      datapost
    );
  }
  CalculateMainStreetIntersectionsPCI(datapost): Observable<any> {
    var CalculateMainStreetIntersectionsPCI = this.AssetsSettingsService1.MD.MDclaculate.CalculateMainStreetIntersectionsPCI

    return this.httpClient.post(
      CalculateMainStreetIntersectionsPCI,
      datapost
    );
  }

  GetMainStreetsHavingSurveyDistressesjson(): Observable<any> {
    var GetMainStreetsHavingSurveyDistresses = this.AssetsSettingsService1.MD.MDclaculate.GetMainStreetsHavingSurveyDistresses

    return this.httpClient.get(
      GetMainStreetsHavingSurveyDistresses
    );
  }

  GetSurveyedMunicipalities(): Observable<any> {
    var GetSurveyedMunicipalities = this.AssetsSettingsService1.MD.MDclaculate.GetSurveyedMunicipalities

    return this.httpClient.get(
      GetSurveyedMunicipalities
    );

    //return this.httpClient.get("assets/data/GetSurveyedMunicipalities.json");
  }
  GetSurveyedDistricts(): Observable<any> {
    var GetSurveyedDistricts = this.AssetsSettingsService1.MD.MDclaculate.GetSurveyedDistricts

    return this.httpClient.get(
      GetSurveyedDistricts
    );
    // return this.httpClient.get("assets/data/GetSurveyedDistricts.json");
  }
  GetSurveyedRegions(): Observable<any> {
    return this.httpClient.get("assets/data/GetSurveyedRegions.json");
  }
  GetAvailableSurveys(): Observable<any> {
    var GetSurveyedRegions = this.AssetsSettingsService1.MD.MDclaculate.GetSurveyedRegions

    return this.httpClient.get(
      GetSurveyedRegions
    );
  }
  GetMainStreetsHavingSurveyDistresses(): Observable<any> {

    var GetMainStreetsHavingSurveyDistresses = this.AssetsSettingsService1.MD.MDclaculate.GetMainStreetsHavingSurveyDistresses

    return this.httpClient.get(
      GetMainStreetsHavingSurveyDistresses
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
      GetStreetsIRIequ1
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

    var GetStreetsSectionsLengthBySurvey2link = this.AssetsSettingsService1.IRI.MainStreetPCI.GetStreetsSectionsLengthBySurvey2url

    return this.httpClient.get(
      GetStreetsSectionsLengthBySurvey2link + 'STREET_ID=' + streetid
    );
  }
  GetStreetsSectionsBySurvey(streetid, SURVEY_NO): Observable<any> {

    var GetStreetsSectionsBySurvey = this.AssetsSettingsService1.IRI.MainStreetPCI.GetStreetsSectionsBySurvey

    return this.httpClient.get(
      GetStreetsSectionsBySurvey + 'MAIN_NO=' + streetid + '&SURVEY_NO=' + SURVEY_NO
    );
  }
  // MD api
  // get_MD_MainStreetSections(datapost): Observable<any> {
  //   var get_MD_MainStreetSections = this.AssetsSettingsService1.IRI.MainStreetPCI.get_MD_MainStreetSections

  //   return this.httpClient.post(
  //     get_MD_MainStreetSections,
  //     datapost
  //   );
  // }
  get_MD_MainStreetSections(): Observable<any> {
    return this.httpClient.get(
      "assets/data/w2.json"
    );
  }



  get_MD_SecondaryStByRegion(datapost): Observable<any> {
    var get_MD_SecondaryStByRegion = this.AssetsSettingsService1.IRI.MainStreetPCI.get_MD_SecondaryStByRegion


    return this.httpClient.post(
      get_MD_SecondaryStByRegion,
      datapost
    );
  }
  get_MD_MainStreetInterSections(datapost): Observable<any> {

    var get_MD_MainStreetInterSections = this.AssetsSettingsService1.IRI.MainStreetPCI.get_MD_MainStreetInterSections

    return this.httpClient.post(
      get_MD_MainStreetInterSections,
      datapost
    );
  }
  get_MD_SecondaryStByDistrict(datapost): Observable<any> {

    var get_MD_MainStreetInterSections = this.AssetsSettingsService1.IRI.MainStreetPCI.get_MD_SecondaryStByDistrict

    return this.httpClient.post(
      get_MD_MainStreetInterSections,
      datapost
    );
  }

  get_MD_SecondaryStByMunicipality(datapost): Observable<any> {
    var get_MD_SecondaryStByMunicipality = this.AssetsSettingsService1.IRI.MainStreetPCI.get_MD_SecondaryStByMunicipality

    return this.httpClient.post(
      get_MD_SecondaryStByMunicipality,
      datapost
    );
  }
  sendMessage = new Subject();

  communicatMessage(msg) {
    this.sendMessage.next(msg);
  }

MainNoService:any=new BehaviorSubject(" ");

  // GetMDForLaneByMainNo(main_no:any): Observable<any> {
  //   return this.httpClient.get(this.baseUrl + `MDSECSAMP_LANES/GetMDForLaneByMainNo?main_no=${main_no}`);
  // }

  GetMDForLaneByMainNo(main_no:any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/GetMDForLaneByMainNo?main_no=${main_no}`);
  }
  

  GetMDForSampleByMainNo(main_no:any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/GetMDForSampleByMainNo?main_no=${main_no}`);
  }

  GetMDForSectionByMainNo(main_no:any): Observable<any> {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/GetMDForSectionByMainNo?main_no=${main_no}`);
  }
  
  Refresh(JOB_ID:string,MD_TYPE:Number): Observable<any> {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/MD_Refresh2?JOB_ID=${JOB_ID}&MD_TYPE=${MD_TYPE}`);
   // return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/MD_Refresh2?JOB_ID=${JOB_ID}&MD_TYPE=${MD_TYPE}&Survey_No=${Survey_No}`);
  }

  CheckStatus(): Observable<any> {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/CheckStatus`);
  }


  CheckFor_2() :Observable<any>
  {
    return this.httpClient.get(this.baseUrl + `md/MD_Maintenence/CheckFor_2`);
  }

}
