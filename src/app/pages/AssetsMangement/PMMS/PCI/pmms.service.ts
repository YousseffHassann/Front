import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../AssetsMangement/assets-settings.service";

import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class PmmsService {

  albumid = new BehaviorSubject<string>("");
  postdata = new BehaviorSubject<string>("");

  selectalbumid = this.albumid.asObservable();
  selectpostdata = this.albumid.asObservable();

  constructor(private httpClient: HttpClient, private AssetsSettingsService1: AssetsSettingsService,
  ) { }
  // GetAvailableSurveysjson(): Observable<any> {
  //   return this.httpClient.get("assets/data/GetAvailableSurveys.json");
  // }
  CalculateMainStreetSectionsPCIjson(datapost): Observable<any> {
    var CalculateMainStreetSectionsPCI = this.AssetsSettingsService1.PCI.PCIclaculate.CalculateMainStreetSectionsPCI


    return this.httpClient.post(
      CalculateMainStreetSectionsPCI,
      datapost
    );
  }
  // CalculateMainStreetSectionsPCIjson(datapost): Observable<any> {
  //   return this.httpClient.get(
  //     "assets/data/w1.json"
  //   );
  // }
  RegionSecondaryStreetsPCI_ByDistrict(datapost): Observable<any> {

    var RegionSecondaryStreetsPCI_ByDistrict = this.AssetsSettingsService1.PCI.PCIclaculate.RegionSecondaryStreetsPCI_ByDistrict

    return this.httpClient.post(
      RegionSecondaryStreetsPCI_ByDistrict,
      datapost
    );
  }
  RegionSecondaryStreetsPCI_ByMunicipality(datapost): Observable<any> {
    var RegionSecondaryStreetsPCI_ByMunicipality = this.AssetsSettingsService1.PCI.PCIclaculate.RegionSecondaryStreetsPCI_ByMunicipality

    return this.httpClient.post(
      RegionSecondaryStreetsPCI_ByMunicipality,
      datapost
    );
  }
  CalculateRegionSecondaryStreetsPCI(datapost): Observable<any> {
    var CalculateRegionSecondaryStreetsPCI = this.AssetsSettingsService1.PCI.PCIclaculate.CalculateRegionSecondaryStreetsPCI

    return this.httpClient.post(
      CalculateRegionSecondaryStreetsPCI,
      datapost
    );
  }
  CalculateMainStreetIntersectionsPCI(datapost): Observable<any> {
    var CalculateRegionSecondaryStreetsPCI = this.AssetsSettingsService1.PCI.PCIclaculate.CalculateRegionSecondaryStreetsPCI

    return this.httpClient.post(
      CalculateRegionSecondaryStreetsPCI,
      datapost
    );
  }

  GetMainStreetsHavingSurveyDistressesjson(): Observable<any> {
    var GetMainStreetsHavingSurveyDistresses = this.AssetsSettingsService1.PCI.PCIclaculate.GetMainStreetsHavingSurveyDistresses

    return this.httpClient.get(
      GetMainStreetsHavingSurveyDistresses
    );
  }

  // GetSurveyedMunicipalities2(): Observable<any> {
  //   return this.httpClient.get("assets/data/GetSurveyedMunicipalities.json");
  // }
  GetSurveyedMunicipalities(): Observable<any> {

    var GetSurveyedMunicipalities = this.AssetsSettingsService1.PCI.PCIclaculate.GetSurveyedMunicipalities

    return this.httpClient.get(GetSurveyedMunicipalities);
  }
  GetSurveyedDistricts(): Observable<any> {
    var GetSurveyedDistricts = this.AssetsSettingsService1.PCI.PCIclaculate.GetSurveyedDistricts

    return this.httpClient.get(GetSurveyedDistricts);
    //  return this.httpClient.get("assets/data/GetSurveyedDistricts.json");
  }
  // GetSurveyedRegions2(): Observable<any> {
  // //   return this.httpClient.get("assets/data/GetSurveyedRegions.json");
  // // }

  GetSurveyedRegions(): Observable<any> {
    var GetSurveyedRegions = this.AssetsSettingsService1.PCI.PCIclaculate.GetSurveyedRegions

    return this.httpClient.get(GetSurveyedRegions);



  }

  GetAvailableSurveys(): Observable<any> {
    var GetAvailableSurveys = this.AssetsSettingsService1.PCI.PCIclaculate.GetAvailableSurveys

    return this.httpClient.get(GetAvailableSurveys);


    // return this.httpClient.get(
    //   "https://localhost:44310/api/pci/DistressSurveyPCI/GetAvailableSurveys"
    // );
  }
  GetMainStreetsHavingSurveyDistresses(): Observable<any> {


    var GetMainStreetsHavingSurveyDistresses = this.AssetsSettingsService1.PCI.PCIclaculate.GetMainStreetsHavingSurveyDistresses

    return this.httpClient.get(
      GetMainStreetsHavingSurveyDistresses
    );
  }



  sendMessage = new Subject();

  communicatMessage(msg) {
    this.sendMessage.next(msg);
  }
}
