import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';
@Injectable({
  providedIn: 'root'
})
export class InsertionService {

  constructor(private httpclient:HttpClient,private first_part:AssetsSettingsService) { }

  userids=new BehaviorSubject(0);
  roleids=new BehaviorSubject('');
  refresh=new BehaviorSubject(0);

movedSelectedItems=new BehaviorSubject({});

baseUrl:string=this.first_part.hostaddress2;


  SendData(data:object):Observable<any>
  {
    return this.httpclient.post(this.baseUrl+`Role/insertRole`,data);
  }
     
 showdatroles():Observable<any>
 {
  return this.httpclient.get(this.baseUrl+"Role/showingRoles");
 }

 AddUserData(data:any):Observable<any>
 { 
  return this.httpclient.post(this.baseUrl+"UserA/insertUser",data);
 }


 showAllUsers():Observable<any>
 {
  return this.httpclient.get(this.baseUrl+"UserA/showingUsers");
 }

 AddingSecUserRoles(data:object):Observable<any>  //M TO M RELATIONShip
 {
  return this.httpclient.post(this.baseUrl+"Role/AddingSec_user_roles",data);
 }

 getuserId():Observable<any>
 {
    return this.httpclient.get(this.baseUrl+"UserA/GETUSERID");
 }



 DeleteRole( roleid:any):Observable<any>
 {
  return this.httpclient.delete(this.baseUrl+`Role/DeleteRoleByRoleId?RoleId=${roleid}`);
 }

 DeleteUser(userid:any):Observable<any>
 {
  return this.httpclient.delete(this.baseUrl+`UserA/DeleteUserByUserId?UserId=${userid}`);
 }
 

 DeleteSec_UserRoles(userid:number):Observable<any>
 {
    return this.httpclient.delete(this.baseUrl+`UserA/DeletSecUserRoleBySystem_users_id?UserId=${userid}`);
 }


 UpdateRole(roleid:any,newobject:any):Observable<any>
 {
    return this.httpclient.put(this.baseUrl+`Role/UpdateRoleByRoleId?roleid=${roleid}`,newobject);
 }
 
 /*UpdateRole(newobject:any):Observable<any>
 {
    return this.httpclient.post(this.baseUrl+`Role/UpdateRoleByRoleId?roleid=${newobject.ROLEID}`,newobject);
 }*/
GetByRoleId(roleid:number):Observable<any>
{
   return this.httpclient.get(this.baseUrl+`Role/GetByRoleId?roleid=${roleid}`);
}
GetUsrByUserId(UserId:number):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`UserA/GetUserByUserId?UserId=${UserId}`);
}


getallroles():Observable<any>
{
  return this.httpclient.get(this.baseUrl+"Role/getallroles");
}


insertSecUserRoles2(third):Observable<any>
{
  return this.httpclient.post(this.baseUrl+"Role/insertintoSe_User_roles",third);
}

Updateuser(userid:any,newobject:any):Observable<any>
{
   return this.httpclient.put(this.baseUrl+`UserA/UpdateUserByUserId?userid=${userid}`,newobject);
}

GetAllRolesByUserId(userid:any):Observable<any>
{
   return  this.httpclient.get(this.baseUrl+`UserA/GetAllRolesByUserId?userid=${userid}`);
}

UpdateThird(obj:any):Observable<any>
{
   return this.httpclient.put(this.baseUrl+"UserA/UpdateThird",obj);  //m to m
}


getroleByRoleId(roleid:any):Observable<any>
{
   return this.httpclient.get(this.baseUrl+`Role/GetByRoleId?roleid=${roleid}`);
}

}
