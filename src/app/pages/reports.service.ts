import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpclient: HttpClient, private baseurl: AssetsSettingsService) { }

  baseUrl: string = this.baseurl.hostaddress2;

  GetSurvey(): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/GetSurveys`);
  }

  GetRegions(surveyNo): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/GetRegions?surveyNo=${surveyNo}`);
  }
  GetReports(tableName): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/export?tableName=${tableName}`,{ responseType: 'blob'});
  }

  GetSecondaryStreets(surveyNo, regionNo): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/GetSecondaryStreetsByRegionId?regionNo=${regionNo}&surveyNo=${surveyNo}`);
  }

  GetSectionByMainNo(mainNo): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/GetSectionByMainNo?mainNo=${mainNo}`);
  }

  GetAllLanesBySectionNo(sectionNo: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}Reports/GetAllLanesBySectionNo?sectionNo=${sectionNo}`);
  }
}
