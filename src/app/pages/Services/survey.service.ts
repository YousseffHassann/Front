import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private httpclient:HttpClient,private baseurl: AssetsSettingsService) { }
  baseUrl: string = this.baseurl.hostaddress2;

  GetSurvey():Observable<any>
  {
         return this.httpclient.get(`${this.baseUrl}Surveys/GetSurveys`);
  }

  GetSurveysFiltered(date:string , date1:string , SURVEY_NO:number):Observable<boolean>
  {
         return this.httpclient.get<boolean>(`${this.baseUrl}Surveys/GetSurveysFiltered?DATE_FROM=${date}&DATE_TO=${date1}&SURVEY_NO=${SURVEY_NO}`);
  }
  GetSurveysFilteredDates(date:string ):Observable<boolean>
  {
         return this.httpclient.get<boolean>(`${this.baseUrl}Surveys/GetSurveysFilteredDates?date=${date}`);
  }

  DeleteSurvey(id):Observable<any>
  {
         return this.httpclient.delete(`${this.baseUrl}Surveys/DeleteSurvey?id=${id}`);
  }
  AddSurvey(surveyObject):Observable<any>
{
  return this.httpclient.post(`${this.baseUrl}Surveys/AddSurvey`,surveyObject);
}
AddSurveyDatesValidation(surveyObject):Observable<any>
{
  return this.httpclient.post(`${this.baseUrl}Surveys/AddSurveyDatesValidation`,surveyObject);
}
UpdateSurvey(surveyObject):Observable<any>
{
  return this.httpclient.put(`${this.baseUrl}Surveys/UpdateSurvey`,surveyObject);
}
}
