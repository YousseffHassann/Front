import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsSettingsService } from "../AssetsMangement/assets-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PCICalcService {
  constructor(
    private httpclient: HttpClient,
    private first_part: AssetsSettingsService
  ) {}
  baseUrl: string = this.first_part.hostaddress2;
  pciDetailsURL="AccessFilesControllers/PCIDetails"

  ////////////////////////////////////////////////////////////////////////
  // GET REGIONS WITH CALCULATED PCI
  calcregionsURL= this.baseUrl + "Archive/AccessDBSample/getcalcregions";
  getcalcregions(survey_no):Observable<string[]> {
    return this.httpclient.get<string[]>(this.calcregionsURL+`?survey_no=${survey_no}`);
  }

  ////////////////////////////////////////////////////////////////////////
  // GET sreets WITH CALCULATED PCI by region
  calcstreetsbyregionURL=this.baseUrl + "Archive/AccessDBSample/getcalcstreets";
  getcalcstreetsbyregion(region_id,survey_no):Observable<string[]> {
    return this.httpclient.get<string[]>(this.calcstreetsbyregionURL+`?region_id=${region_id}&survey_no=${survey_no}`);
  }

  ////////////////////////////////////////////////////////////////////////
  // GET all regions
  allregionsURL= this.baseUrl + this.pciDetailsURL + "/getallregions";
  getallregions():Observable<string[]> {
    return this.httpclient.get<string[]>(this.allregionsURL);
  }

  ////////////////////////////////////////////////////////////////////////
  // GET streets by region
  streetsbyregionURL=this.baseUrl + this.pciDetailsURL + "/getstreetsbyregion";
  getstreetsbyregion(region_id):Observable<string[]> {
    return this.httpclient.get<string[]>(this.streetsbyregionURL+`?region_id=${region_id}`);
  }


  ////////////////////////////////////////////////////////////////////////
  //  GET All sections by street id
  sectionbystreetURL=this.baseUrl + this.pciDetailsURL + "/getsectoinsbystreet";
  getsectionbystreet(street_id):Observable<string[]> {
    return this.httpclient.get<string[]>(this.sectionbystreetURL+`?street_id=${street_id}`);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Get Uploaded File Sections By Street
  filesectionsURL=this.baseUrl + "Archive/AccessDBSample/getuploadedfilesectionsbystreet";
  getfilesectionsbystreet(street_id):Observable<string[]> {
    return this.httpclient.get<string[]>(this.filesectionsURL+`?street_id=${street_id}`);
  }



  //////////////////////////////////////////////////////////////////////////
  // THE THREE TABS AFTER CALCULATIONS
  getlanecalcURL = this.baseUrl + this.pciDetailsURL + "/getlanecalc";
  getsectionsamplecalcURL = this.baseUrl + this.pciDetailsURL + "/getsectionsamplecalc";
  getsectionsURL = this.baseUrl + this.pciDetailsURL + "/getsectionscalc";

  getlanecalc(mainNo: string, surveynumber: number): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.getlanecalcURL + `?mainNo=${mainNo}&surveynumber=${surveynumber}`
    );
  }

  getsectionsamplecalc(mainNo: any,surveynumber: number): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.getsectionsamplecalcURL +
        `?mainNo=${mainNo}&surveynumber=${surveynumber}`
    );
  }

  getsectionscalc(mainNo: string, surveynumber: number): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.getsectionsURL + `?mainNo=${mainNo}&surveynumber=${surveynumber}`
    );
  }
  //////////////////////////////////////////////////////////////////////////////

  getSystemSectionLanesInfo(): Observable<string[]> {
    return this.httpclient.get<string[]>(this.baseUrl + this.pciDetailsURL +"/getsystemsectionlanesinfo");
  }

  getUploadedSectionLanesInfo(mainNo: string, surveynumber: number): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.baseUrl + this.pciDetailsURL +"/getuploadedsectionlanesinfo" + `?mainNo=${mainNo}&surveynumber=${surveynumber}`
    );
  }
}
