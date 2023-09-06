import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';
import { Observable } from 'rxjs';
import { WorkOrder } from '../../Models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {
  http: any;

  constructor(
    private httpclient: HttpClient,
    private first_part: AssetsSettingsService
  ) {}
  baseUrl: string = this.first_part.hostaddress2;

  //////////////////////////////////////////////////////////////////////
  // URLs
  getAllContractorsURL=this.baseUrl+"WorkOrders/getallcontractors"
  getContractByContractorURL=this.baseUrl+"WorkOrders/getcontractbycontractor"

  getSampleMaintenanceDecisionURL=this.baseUrl+"WorkOrders/getsamplemaintenancedecision"
  getLaneMaintenanceDecisionURL=this.baseUrl+"WorkOrders/getlanemaintenancedecision"
  getSectionMaintenanceDecisionURL=this.baseUrl+"WorkOrders/getsectionmaintenancedecision"

  addWorkOrderURL=this.baseUrl+"WorkOrders/addworkorder"
  getAllSectionsByMainNoURL=this.baseUrl+"WorkOrders/getallsectionsbymainno"
  addWorkOrderDetailsURL=this.baseUrl+"WorkOrders/addworkorderdet"

  getContractDatesURL=this.baseUrl+"WorkOrders/getcontractdates"

  //////////////////////////////////////////////////////////////////////
  // Get all contractors
  getAllContractors():Observable<string[]>{
    return this.httpclient.get<string[]>(this.getAllContractorsURL);
  }

  //////////////////////////////////////////////////////////////////////
  // Get contract by contractor id
  getContractByContractor(contractor_id:number):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getContractByContractorURL+`?contractor_id=${contractor_id}`);
  }



  //////////////////////////////////////////////////////////////////////
  // Get sample MD
  getSampleMaintenanceDecision(main_no):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getSampleMaintenanceDecisionURL+`?main_no=${main_no}`);
  }

  //////////////////////////////////////////////////////////////////////
  // Get lane MD
  getLaneMaintenanceDecision(main_no):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getLaneMaintenanceDecisionURL+`?main_no=${main_no}`);
  }

  //////////////////////////////////////////////////////////////////////
  // Get section MD
  getSectionMaintenanceDecision(main_no):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getSectionMaintenanceDecisionURL+`?main_no=${main_no}`);
  }


  ///////////////////////////////////////////////////////////////////////
  // ADD to table WO_WORK_ORDER
  addWorkOrder(work_order:WorkOrder):Observable<any>{
    return this.httpclient.post(this.addWorkOrderURL,work_order);
  }


  ////////////////////////////////////////////////////////////////////////
  //Get all sections
  getAllSectionsByMainNo(main_no):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getAllSectionsByMainNoURL+`?main_no=${main_no}`);
  }


  ///////////////////////////////////////////////////////////////////////
  // ADD to table WO_WORK_ORDER_DET
  addWorkOrderDetails(wo_id,main_no,sections):Observable<any>{
    return this.httpclient.post(this.addWorkOrderDetailsURL+`?WO_ID=${wo_id}&main_no=${main_no}`,sections);
  }


  getContractDates(contract_id):Observable<string[]>{
    return this.httpclient.get<string[]>(this.getContractDatesURL+`?contract_id=${contract_id}`);
  }
}
