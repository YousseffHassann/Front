import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../Models/contract.model';
import { AssetsSettingsService } from '../pages/AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ContractsFormDbService {
  baseUrl2: string = this.first_part.hostaddress2;

  getallcontractsURL=this.baseUrl2+"Contracts/getallcontracts"
  getcontractorsinmunicURL=this.baseUrl2+"Contracts/getcontractorbymunic/";
  addcontractURL=this.baseUrl2+"Contracts/addcontract";
  deletcontractURL=this.baseUrl2+"Contracts/deletecontract/";
  updatecontractURL=this.baseUrl2+"Contracts/updatecontract/";
  getcontractorbyidURL=this.baseUrl2+"Contracts/getcontractorbyid/"
  findifexistsURL=this.baseUrl2+"Contracts/findifidexists/"

  constructor(private http:HttpClient,private first_part: AssetsSettingsService) { }

  getallcontracts():Observable<string[]>{
    return this.http.get<string[]>(this.getallcontractsURL);
  }

  getcontractorsinmunic(id:number):Observable<string[]>{
    return this.http.get<string[]>(this.getcontractorsinmunicURL+id);
  }

  addcontract(obj:any):Observable<any>{
    return this.http.post(this.addcontractURL,obj);
  }


  deletecontract(id:number):Observable<string>{
    return this.http.delete<string>(this.deletcontractURL+id);
  }

  updatecontract(id:number, obj:Contract):Observable<Contract>{
    return this.http.put<Contract>(this.updatecontractURL+id,obj);
  }

  getcontractorbyid(id:number):Observable<string[]>{
    return this.http.get<string[]>(this.getcontractorbyidURL+id);
  }

  findifcontexists(cont_id:number):Observable<boolean>{
    return this.http.get<boolean>(this.findifexistsURL+cont_id)
  }
}
