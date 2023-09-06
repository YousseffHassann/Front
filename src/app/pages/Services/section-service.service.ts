import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { retry } from 'rxjs-compat/operator/retry';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';
@Injectable({
  providedIn: 'root'
})
export class SectionServiceService {

  constructor(private httpclient: HttpClient, private first_part: AssetsSettingsService) { }

  baseUrl: string = this.first_part.hostaddress2;


  //المسارات والعينات 


  GetAllStreets(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/SectionsPCI/getAllStreets");
  }

  GetSectionByStreetId(streetId) {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllRegionsByStreetId?StreetId=${streetId}`);
  }

  GetSectionInfo(sectionId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetSectionInfo?sectionID=${sectionId}`);
  }



  GetAllLanes(SectionId: any): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetLanes?SectionId=${SectionId}`);
  }

  GetSampleByLaneId(LaneId: any): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetSampleByLaneId?LaneId=${LaneId}`);
  }


  GetBySampleId(sampleId: any): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetBySampleId?sample_id=${sampleId}`);
  }


  UpdateSample(sampleId, MyObj): Observable<any> {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateSample?SAMPLEID=${sampleId}`, MyObj);
  }


  GetSpecifiedSample(sample_no, laneId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetSpecifiedSample?Sample_no=${sample_no}&LaneId=${laneId}`);
  }


  GetBySample2(SId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetBySample2?SampleId=${SId}`);
  }



  UpdateFullSample2(sampleId, MyObj): Observable<any> {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateFullSample?SAMPLEID=${sampleId}`, MyObj);
  }












































  //المساح 




  GetAllSurvevors(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/SectionsPCI/GetAllSurvevors");
  }





  //   الاستخدامات المجاورة


  GetAllSECTION_DETAILS(sectionId: any): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllSECTION_DETAILS?sectionId=${sectionId}`);
  }


  UpdateSectionDetails(sectionId: any, MyObject: any): Observable<any> {
    // return this.httpclient.put(`https://localhost:44310/api/pci/SectionsPCI/UpdateSectionDetails?sectionId=${sectionId}`,MyObject);
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateSectionDetails?sectionId=${sectionId}`, MyObject);

  }






























































  //intersectionSrvice for intersectionUpdate 






  GetControl(): Observable<any> {
    //return this.httpclient.get("https://localhost:44310/api/pci/SectionsPCI/GetControl");
    return this.httpclient.get(this.baseUrl + 'pci/SectionsPCI/GetControl');

  }


  GetAllIntersectionTypes(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/SectionsPCI/GetAllIntersectionTypes");
  }


  GetPhotoNameByIntersectionTypeId(IntersectionTypeId: any): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetPhotoNameByIntersectionTypeId?typeID=${IntersectionTypeId}`);
  }


  UpdateIntersection(MyObject: any, interid: any): Observable<any> {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateIntersection?inter_id=${interid}`, MyObject);
  }

  names(id): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/names?intersectionId=${id}`);
  }


































  GetAllIntersampleByIntesectionId(IntersampleId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllIntersampleByIntesectionId?IntersectionId=${IntersampleId}`);
  }

  UpdateInterSampleFinal(MyObject, interid): Observable<any> {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateInterSampleFinal?inter_id=${interid}`, MyObject);
  }


  realCount(IntersampleId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/realCount?IntersectionId=${IntersampleId}`);
  }


  DeleteInterSampleFinal(IntersampleId): Observable<any> {
    return this.httpclient.delete(this.baseUrl + `pci/SectionsPCI/DeleteInterSampleFinal?InterSampleId=${IntersampleId}`);
  }

















  // regionUpdateService


  AllUpdateRegions(DistrictId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/AllUpdateRegion?District_Id=${DistrictId}`);
  }


  regionUpdateInfo(regionId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/regionUpdateInfo?regionId=${regionId}`);
  }


  StreetsregionUpdate(regionId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/StreetsregionUpdate?regionId=${regionId}`);

  }



  UpdateStreet(MyObject, re): Observable<any> {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateStreet?regionId=${re}`, MyObject);
  }


  DeleteRegionUpdate(re): Observable<any> {
    return this.httpclient.delete(this.baseUrl + `pci/SectionsPCI/DeleteRegionUpdate?regionId=${re}`);
  }


















  //Uploading File task

  UploadFile(fileName: any): Observable<any>   //ARAMCO-16-03-2023.mdb
  {
    return this.httpclient.get(this.baseUrl+`Archive/AccessDBSample/transfereAccessData_SysItems?File_Name=${fileName}&SURVEY_NO=3`);
  }



  
UploadFile2(formData: any): Observable<any>   //ARAMCO-16-03-2023.mdb
{
return this.httpclient.post( this.baseUrl+'Archive/AccessDBSample/Upload', formData);
}









//getallservURL="https://localhost:44310/api/Archive/AccessDBSample/getallsurveys?fileName=$";
submitdataURL=this.baseUrl+"Archive/AccessDBSample/updateSectionsReview";
pcicalcURL=this.baseUrl+"PCI/SectionsPCI/PCI_Direct_Calculation?SURVEY_NO=3";



// getallsurveys(filename,survey):Observable<string[]>{
//   return this.httpclient.get<string[]>(this.getallservURL);
// }

// getallsurveys(filename,survey):Observable<any>{
//   return this.httpclient.get(this.baseUrl+`Archive/AccessDBSample/getallsurveys?fileName=${filename}&surveyNumber=${survey}`)
// }

getallsurveys(filename,survey):Observable<any>{
  return this.httpclient.get(this.baseUrl+`Archive/AccessDBSample/getallsurveys?fileName=${filename}&surveyNumber=${survey}`)
}

submitdata(obj:any):Observable<any>{
  return this.httpclient.post<any>(this.submitdataURL,obj);
}

PCIcalculations():Observable<any>{
  return this.httpclient.get(this.pcicalcURL);
}




  // ADDED BY MOSTAFA

  

getlanecalcURL=this.baseUrl+"Archive/AccessDBSample/getlanecalc";
getsectionsamplecalcURL=this.baseUrl+"Archive/AccessDBSample/getsectionsamplecalc";
getsectionsURL=this.baseUrl+"Archive/AccessDBSample/getsectionscalc";


  getlanecalc(fileName:string):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getlanecalcURL+`?fileName=${fileName}`);
  }

  getsectionsamplecalc(fileName:string):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getsectionsamplecalcURL+`?fileName=${fileName}`);
  }

  getsectionscalc(fileName:string):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getsectionsURL+`?fileName=${fileName}`);
  }



  


}
