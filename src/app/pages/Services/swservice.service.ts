import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SwserviceService {

  constructor(private httpclient:HttpClient , private baseurl: AssetsSettingsService) {}

  baseUrl: string = this.baseurl.hostaddress2;
  GetDistrictByMunicId(minic_id):Observable<any>
  {
    return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetDistrictByMunicipalityId?MunicipalityId=${minic_id}`);
  }
  GetDistricts():Observable<any>
  {
    return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetDistricts`);
  }

  GetDistress():Observable<any>
  {
         return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetDistress`);
  }
  GetRegions(surveyNo):Observable<any>
  {
         return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetRegions?surveyNo=${surveyNo}`);
  }
GetMainStreets():Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetAllMainStreets`);
}
GetPCIReports(surveyNo,streetId):Observable<any>
{
  return this.httpclient.get(`${this.baseurl.ReportsHost}PCI_SECTIONLANES2_V1.aspx?rname=PCI_Section_Lanes1&module=pci&surveyNo=${surveyNo}&streetId=${streetId}`);
}
GetSecondaryStreets(surveyNo,regionId):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetSecondaryStreetsByRegionId?regionId=${regionId}&surveyNo=${surveyNo}`);
}
GetRegionsByDistrictId(districtId):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetRegionsByDistrictId?districtId=${districtId}`);
}
GetSectionByStreetId(streetId):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetSectionByStreetId?streetId=${streetId}`);
}

GetSectionByMainNo(mainNo):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetSectionByMainNo?mainNo=${mainNo}`);
}
getInterSectionByStreetId(mainStreetId):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/getInterSectionByStreetId?mainStreetId=${mainStreetId}`);
}
GetSideWalksBySectionId(id):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetSideWalksByStreetId?id=${id}`);
}
GetSideWalkBySideWalkId(id):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetSideWalkBySideWalkId?id=${id}`);
}
GetSideWalksByIntersectionId(id):Observable<any>
{
  return this.httpclient.get<any>(`${this.baseUrl}DistressSWalk/GetSideWalksByStreetId?id=${id}`);
}
GetDistressSideWalks(id):Observable<any>
{
  return this.httpclient.get<any>(`${this.baseUrl}DistressSWalk/GetDistressSideWalks?id=${id}`);
}
Munic():Observable<any>
{
       return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetMunicipalities`);
}
AddDistressSideWalks(distressObject):Observable<any>
{
  return this.httpclient.post(`${this.baseUrl}DistressSWalk/InsertDistress`,distressObject);
}
GetMainStreetsByFilteration(mainNo):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetStreetsByMainNo?mainNo=${mainNo}`);
}
GetAllLanesBySectionNo(sectionNo:any):Observable<any>
{
  return this.httpclient.get(`${this.baseUrl}DistressSWalk/GetAllLanesBySectionNo?sectionNo=${sectionNo}`);
}

}
