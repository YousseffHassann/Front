import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsSettingsService } from "../AssetsMangement/assets-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UncalculatedSectionsService {
  constructor(
    private httpclient: HttpClient,
    private first_part: AssetsSettingsService
  ) {}


  baseUrl: string = this.first_part.hostaddress2+"AccessFilesControllers/UnCalculatedSections/";
  ////////////////////////////////////////////////////////////////////////
  // GET REGIONS FOR SECTIONS WITH NO CALCULATED PCI
  calcregionsURL = this.baseUrl + "getregionsfornopcisections";
  getUnCalcRegions(survey_no): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.calcregionsURL + `?survey_no=${survey_no}`
    );
  }

  ////////////////////////////////////////////////////////////////////////
  // GET STREETS FOR SECTIONS WITH NO CALCULATED PCI
  calcstreetsbyregionURL =
    this.baseUrl + "getstreestfornopcisections";
  getUnCalcStreetsbyregion(region_id, survey_no): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.calcstreetsbyregionURL +
        `?region_id=${region_id}&survey_no=${survey_no}`
    );
  }


  ////////////////////////////////////////////////////////////////////////
  // GET UPLOADED SECTOINS WITHOUT PCI CALCULATION
  getSectionsWithUnCalcPCIURL =
    this.baseUrl + "getsectionswithuncalcpci";
    getSectionsWithUnCalcPCI(main_no, survey_no, region_id): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.getSectionsWithUnCalcPCIURL +
        `?main_no=${main_no}&survey_no=${survey_no}&region_id=${region_id}`
    );
  }
}
