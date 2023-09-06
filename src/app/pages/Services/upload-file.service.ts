import { observable } from 'rxjs/internal-compatibility';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsSettingsService } from "../AssetsMangement/assets-settings.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadFileService {
  constructor(
    private httpclient: HttpClient,
    private first_part: AssetsSettingsService
  ) {}
  baseUrl: string = this.first_part.hostaddress2;

  //////////////////////////////////////////////////////////////////////////////////////////
  // Uplaod Files APIs
  UploadFile(fileName: any,surnum:any): Observable<any> { //ARAMCO-16-03-2023.mdb
    return this.httpclient.get(
      this.baseUrl +
        `Archive/AccessDBSample/transfereAccessData_SysItems?File_Name=${fileName}&SURVEY_NO=${surnum}`
    );
  }
  UploadFile2(formData: any): Observable<any> { //ARAMCO-16-03-2023.mdb
    return this.httpclient.post(
      this.baseUrl + "Archive/AccessDBSample/Upload",
      formData
    );
  }
  //////////////////////////////////////////////////////////////////////////////////////////



  submitdataURL = this.baseUrl + "Archive/AccessDBSample/updateSectionsReview";
  // pcicalcURL =
  //   this.baseUrl + "PCI/SectionsPCI/PCI_Direct_Calculation?SURVEY_NO=3";

  getallsurveys(filename, survnum): Observable<any> {
    return this.httpclient.get(
      this.baseUrl +
        `AccessFilesControllers/UploadAccess/getallsurveys?fileName=${filename}&surveyNumber=${survnum}`
    );
  }

  submitdata(obj: any): Observable<any> {
    return this.httpclient.post<any>(this.submitdataURL, obj);
  }

  PCIcalculations(survnum): Observable<any> {
    return this.httpclient.get(this.baseUrl + `PCI/SectionsPCI/PCI_Direct_Calculation?SURVEY_NO=${survnum}`);
  }



  //////////////////////////////////////////////////////////////////////////////
  // pop up modal data for access file lanes and actual lanes
  actuallanesURL = this.baseUrl + "AccessFilesControllers/UploadAccess/getactuallanesdata";
  getactuallanesdata(sectionNumber: string): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.actuallanesURL + `?sectionnumber=${sectionNumber}`
    );
  }

  accesslanesURL = this.baseUrl + "AccessFilesControllers/UploadAccess/getaccessfilelanesdata";
  getaccessfilelanesdata(fileName: string, surveynumber: number): Observable<string[]> {
    return this.httpclient.get<string[]>(
      this.accesslanesURL + `?fileName=${fileName}&surveynumber=${surveynumber}`
    );
  }
  /////////////////////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////////////////////
  // Street INFO API
  // streetinfoURL= this.baseUrl + "Archive/AccessDBSample/getaccessfilestreet";
  // getaccessfilestreet():Observable<string[]> {
  //   return this.httpclient.get<string[]>(this.streetinfoURL);
  // }

  /////////////////////////////////////////////////////////////////////////////////////




  //GET SECTIONS WITH PCI CALCULATED IN SAME PAGE NOT ALL PCI CALCULATED SECTIONS
  selectedsectionscalcurl= this.baseUrl + "AccessFilesControllers/UploadAccess/getselectedsectionscalc";
  getselectedsectionscalc(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedsectionscalcurl+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  selectedlanescalcurl= this.baseUrl + "AccessFilesControllers/UploadAccess/getselectedlanecalc";
  getselectedlanescalc(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedlanescalcurl+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  selectedsamplescalcurl= this.baseUrl + "AccessFilesControllers/UploadAccess/getselectedsectionsamplecalc";
  getselectedsamplescalc(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedsamplescalcurl+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }




  /////////
  //NEW
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //GET SECTIONS WITH PCI CALCULATED IN SAME PAGE NOT ALL PCI CALCULATED SECTIONS
  selectedsectionscalcurl2= this.baseUrl + "pci/PCICalc/getselectedsectionscalc";
  getselectedsectionscalc2(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedsectionscalcurl2+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  selectedlanescalcurl2= this.baseUrl + "pci/PCICalc/getselectedlanecalc";
  getselectedlanescalc2(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedlanescalcurl2+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  selectedsamplescalcurl2= this.baseUrl + "pci/PCICalc/getselectedsectionsamplecalc";
  getselectedsamplescalc2(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.selectedsamplescalcurl2+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  //NEW
  ///////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////////////////
  /// GET THE SECTIONS IN THE ACCESS FILE AND NOT IN THE SECTIONS TABLE
  getSectionsInAccessAndNotInSectionsTable(main_no:string):Observable<string[]> {
    return this.httpclient.get<string[]>(this.baseUrl + "AccessFilesControllers/UploadAccess/getsectionsinaccessandnotinsectionstable"+`?main_no=${main_no}`);
  }

  //GET THE SECTIONS WHERE CONSIST LANES ARE EQUAL TO ZERO
  getSectionsWhereConsistLanesEqualZero(fileName,surveyNumber):Observable<string[]> {
    return this.httpclient.get<string[]>(this.baseUrl + "AccessFilesControllers/UploadAccess/getsectionswhereconsistlanesequalzero"+`?fileName=${fileName}&surveyNumber=${surveyNumber}`);
  }


  // HERE IS THE FUNCTION THAT GET SELECTED SECTIONS DISTRESSES
  GetSelectedSectionsPCIDistressURL=this.baseUrl + "AccessFilesControllers/UploadAccess/getselectedsectionsdedistress"
  GetSelectedSectionsPCIDistress(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.GetSelectedSectionsPCIDistressURL+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  // HERE IS THE FUNCTION THAT GET SELECTED SECTIONS IRI
  GetSelectedSectionsPCIIRIURL=this.baseUrl + "AccessFilesControllers/UploadAccess/getselectedsectionsdeiri"
  GetSelectedSectionsPCIIRI(selectedsections:any,surveynumber:number):Observable<string[]> {
    return this.httpclient.get<string[]>(this.GetSelectedSectionsPCIIRIURL+`?selectedsections=${selectedsections}&surveynumber=${surveynumber}`);
  }

  // CHECK IF STATUS IN MD_REFRESH !=-2 TO PREVENT UPLOADING FILE WHILE CALCULATING MD
  ChechMDRefreshStatusURL=this.baseUrl + "AccessFilesControllers/UploadAccess/chechmdrefreshstatus"
  ChechMDRefreshStatus():Observable<boolean> {
    return this.httpclient.get<boolean>(this.ChechMDRefreshStatusURL);
  }
}
