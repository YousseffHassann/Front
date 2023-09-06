import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class PlLanesService {

  constructor(private httpclient: HttpClient, private first_part: AssetsSettingsService) { 

  }
  baseUrl: string = this.first_part.hostaddress2;

  PL_Planning_Lanes_Calc(data:any): Observable<any> {
    return this.httpclient.post(this.baseUrl + "pci/BudgetPlanning/PL_Planning_Lanes_Calc",data);
  }

  Get_PL_Planning_Lanes(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/BudgetPlanning/Get_PL_Planning_Lanes");
  }

  GetPlRegions(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/BudgetPlanning/GetPlRegionsLanes    ");
  }


  GetPlINTERSECTIONS2(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "pci/BudgetPlanning/GetPlINTERSECTIONS2Lanes");
  }

  InsertPL_BUDGETLanes(data): Observable<any> {
    return this.httpclient.post(this.baseUrl + "pci/BudgetPlanning/InsertPL_BUDGETLanes",data);       
  }

  


}
