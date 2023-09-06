import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class RegiionStreetSectionService {

  constructor(private httpclient: HttpClient, private first_part: AssetsSettingsService) { 

  }
  baseUrl: string = this.first_part.hostaddress2;

  AllRegion(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/SectionsPCI/AllRegion");
  }

  GetStreetByRegionId(regionId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetStreetByRegionId?REGION_ID=${regionId}`);
  }


  StreetUpD(data,street_id):Observable<any>
  {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/StreetUpD?street_id=${street_id}`,data);
  }

  
  GetOAllSectionsBYStreetId(streetId): Observable<any> {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetOAllSectionsBYStreetId?streetId=${streetId}`);
  }

  UpdateSecTionRegionByStreetId(data,street_id):Observable<any>
  {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/StreetUpD?street_id=${street_id}`,data);
  }

  GetAllLanesBySectionId(sectionId):Observable<any>
  {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllLanesBySectionId?sectionId=${sectionId}`);
  }

  UpdateLane(laneid,data):Observable<any>
  {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateLane?laneid=${laneid}`,data);
  }


  

  GetAllIntersectionByStreetIdOrMainStreetId(street_id:any):Observable<any>
  {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllIntersectionByStreetIdOrMainStreetId?street_id=${street_id}`);
  }


  GetAllSectionByIntersectionIdtest(intesectionId:any):Observable<any>
  {
    return this.httpclient.get(this.baseUrl + `pci/SectionsPCI/GetAllSectionByIntersectionIdtest?Intesection_id=${intesectionId}`);
  }

  UpdateSectionTest0(data,section_id):Observable<any>
  {
    return this.httpclient.put(this.baseUrl + `pci/SectionsPCI/UpdateSectionTest0?section_id=${section_id}`,data);
  }
  
  
}
