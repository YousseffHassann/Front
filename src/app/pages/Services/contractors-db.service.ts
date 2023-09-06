import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contractor } from '../../Models/contractor.model';
import { MunicipalModel } from '../../Models/municipal.model';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ContractorsDBService {
  baseUrl2: string = this.first_part.hostaddress2;

  getUrl=this.baseUrl2+"contractor2/getallcontractors";
  addUrl=this.baseUrl2+"contractor2/addcontractor";
  deleteUrl=this.baseUrl2+"contractor2/deletecontractor/";
  updateUrl=this.baseUrl2+"contractor2/updatecontractor/";
  checkoutUrl=this.baseUrl2+"Values/checkedrows";
  addzonesURL=this.baseUrl2+"contractor2/addcontractorzones";
  getzonesURL=this.baseUrl2+"contractor2/getallzones";
  getcontzoneURL=this.baseUrl2+"contractor2/getcontractorzones/"
  updatecontandzoneURL=this.baseUrl2+"contractor2/updatezones/"
  findifexistsURL=this.baseUrl2+"contractor2/findifidexists/"
  cont_arr:any=new Array;

  constructor(private http:HttpClient,private first_part: AssetsSettingsService) { }

  getallcont(): Observable<Contractor[]>{
    return this.http.get<Contractor[]>(this.getUrl);
  }

  addcont(obj:Contractor): Observable<Contractor>{
    return this.http.post<Contractor>(this.addUrl,obj);
  }

  deletecont(id:number):Observable<Contractor>{
    return this.http.delete<Contractor>(this.deleteUrl+id);
  }

  updatecont(obj:Contractor):Observable<Contractor>{
    return this.http.put<Contractor>(this.updateUrl+obj.CONTRACTOR_ID,obj);
  }

  checkoutconts(obj:Contractor[]):Observable<Contractor[]>{
    return this.http.post<Contractor[]>(this.checkoutUrl,obj);
  }

  addcontzones(arr:number[]):Observable<void>{
    return this.http.post<void>(this.addzonesURL,arr);
  }

  getzones():Observable<MunicipalModel[]>{
    return this.http.get<MunicipalModel[]>(this.getzonesURL);
  }

  getcontzones(id:number):Observable<MunicipalModel[]>{
    return this.http.get<MunicipalModel[]>(this.getcontzoneURL+id);
  }

  updatecontzones(arr:number[],contid:number):Observable<void>{
    return this.http.put<void>(this.updatecontandzoneURL+contid,arr);
  }

  findifcontexists(cont_id:number):Observable<boolean>{
    return this.http.get<boolean>(this.findifexistsURL+cont_id)
  }
}
