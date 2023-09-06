import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observable } from 'rxjs/internal-compatibility';
import { AssetsSettingsService } from '../AssetsMangement/assets-settings.service';

@Injectable({
  providedIn: 'root'
})
export class DistressService {

  constructor(private httpclient:HttpClient,private first_part:AssetsSettingsService) { 

  }



baseUrl:string=this.first_part.hostaddress2;
  

AllStreests():Observable<any>
{
  // return this.httpclient.get(this.baseUrl+"PCI/DistressEntryPCI/GetAllStresstes");
  return this.httpclient.get(this.baseUrl+"PCI/DistressEntryPCI/GetAllStresstes");
}

GetSectionByStreetId(Street_Id:any):Observable<any>
{
   return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetSectionByStreetId?StreetId=${Street_Id}`);
}

GetAllLanesBySectionId(sectionId:any):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetAllLanesBySectionId?sectionId=${sectionId}`);
}

GetAllSamplesByLaneId(laneId:any):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetAllSamplesByLaneId?laneId=${laneId}`);
}

GetLanTypeByLanId(laneId:any):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetLanTypeByLanId?laneId=${laneId}`);
}


GetDistressBySampleId(sampleId:any):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressBySampleId?sampleId=${sampleId}`);
}

/*GetDistressBySampleId(sampleId:any,surveyDate):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`NewDistress/GetDistressBySampleId?sampleId=${sampleId}&surveyDate=${surveyDate}`);
}*/

GetSampleArea(length:any,width:any):Observable<any>
{
 return  this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetAreaOfSample?length=${length}&width=${width}`);
}


savirity(Dist_code):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getSaverityByDistressCode?dist_code=${Dist_code}`);
}


DistressAll():Observable<any>
{
  return this.httpclient.get(this.baseUrl+"PCI/DistressEntryPCI/GetDistress");
}


updateSample(myObject,sample_no):Observable<any>
{
 return this.httpclient.put(this.baseUrl+`PCI/DistressEntryPCI/UpdateSample?sample_no=${sample_no}`,myObject);
}



GetSampleBySample_no(sample_no):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetSampleBySample_no?sample_no=${sample_no}`);
}


/*insertrDistress( sampleID,  surveyDate,  surveyNo,  distressNameCode,  severity, distArea,
   SampleArea,  sectioNo,  notes,  user,  sectionID,  userID,  streetID):Observable<any>
{
  return  this.httpclient.post(this.baseUrl+`NewDistress/InsertDistress?sampleID=${sampleID}&surveyDate=${surveyDate}&surveyNo=${surveyNo}&distressNameCode=${distressNameCode}&severity=${severity}&distArea=${distArea}&SampleArea=${SampleArea}&sectioNo=${sectioNo}&notes=${notes}&user=${user}&sectionID=${sectionID}&userID=${userID}&streetID=${streetID}`,null);
}*/


insertrDistress( distressObject):Observable<any>
{
 return  this.httpclient.post(this.baseUrl+"PCI/DistressEntryPCI/InsertSectionDistress",distressObject);
}



getsampleArea(sampleId):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetSampleAreaBYSampleId?sampleId=${sampleId}`);
}

filterByDate(sampleId):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getdateBysampleId?sampleId=${sampleId}`);
}


/*filterByDate11(sampleId):Observable<any>  //2/8/2023 updated
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/surveyNoBySampleId?sampleId=${sampleId}`);
}*/

filterByDate11():Observable<any>  //2/8/2023 updated
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/surveyNoBySampleId`);
}


getdateData(sampleId,SurveyDate):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressBySampleIdAndSurveyDate?sampleId=${sampleId}&surveyDate=${SurveyDate}`);
}



getdateData11(sampleId,survey_no):Observable<any>   //updated 2/8/2023
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressBySampleIdAndSurveyNo?sampleId=${sampleId}&survey_no=${survey_no}`);
}

getsectioninfoBysectionId(setionId):Observable<any>
{
   return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getsectioninfo?sectionId=${setionId}`);
}


getmaxSurveyDateBySampleId(sampleId):Observable<any>
{
     return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetMaxSurveyDateFromDistress?sampleId=${sampleId}`);
}


GetMaxSurveyNOFromDistress():Observable<any>    ///updated 2/8/2023
{
     return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetMaxSurveyNOFromDistress`);
}



getAllDistressPci2BySampleId(Sample_Id):Observable<any>  ///////
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getAllDistressPci2BySampleId?Sample_Id=${Sample_Id}`);
}











































/////////////////////////////intersection second task 



//&intersectSampleID=${intersectSampleID}&intersectSampleNo=${intersectSampleNo}&INTER_NO=${INTER_NO}&surveyDate=${surveyDate}
insertIntersectionDistress( distressCode,  intersectSampleID,  intersectSampleNo,  surveyDate,  surveyNo ,  severity, distArea,
  SAMPLE_LENGTH,  SAMPLE_WIDTH,  intersectNo,  notes,  user,  intersectID,  userID,  streetID):Observable<any>
{
 return this.httpclient.post(this.baseUrl+`PCI/DistressEntryPCI/InsertIntersectionDistress?distressCode=${distressCode}
 &intersectSampleID=${intersectSampleID}&intersectSampleNo=${intersectSampleNo}&surveyDate=${surveyDate}
 &surveyNo=${surveyNo}&severity=${severity}&distArea=${distArea}&SAMPLE_LENGTH=${SAMPLE_LENGTH}
 &SAMPLE_WIDTH=${SAMPLE_WIDTH}&intersectNo=${intersectNo}&notes=${notes}
 &user=${user}&intersectID=${intersectID}&userID=${userID}&streetID=${streetID}`,null);
}

getIntersectionByStreetId(streetId:number):Observable<any>
{
return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getInterSectionByStreetId?mainStreetId=${streetId}`);
}


intersectioninfoByIntersectionId(intesection_Id):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/intersectioninfoByIntersectionId?inter_id=${intesection_Id}`);
}


getsamplesByIntersectionId(intesection_Id):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getsamplesByIntersectionId?inter_Id=${intesection_Id}`);
}


getIntersectionSampleBySampleNomer(intesection_no,intersectionId):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getIntersectionSampleBySampleNomer?inter_no=${intesection_no}&IntersectionId=${intersectionId}`);
}

UpdateIntersectionSample(obj:any,sample_no:any,interId:any):Observable<any>
{
  return this.httpclient.put(this.baseUrl+`PCI/DistressEntryPCI/UpdateintersectionSample?interId=${interId}&sample_no=${sample_no}`,obj);
}


getDistressByIntesectionSampleId(intersampId):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getDistressByIntesectionSampleId?intersampId=${intersampId}`);
}

GetMaxSurveyDateFrominterDistress(inter_sample_no):Observable<any>
{
     return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetMaxSurveyDateFrominterDistress?inter_sample_no=${inter_sample_no}`);
}

GetMaxSurvey_noFrominterDistress():Observable<any>  //2/8/2023  updated ok
{
     return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetMaxSurvey_noFrominterDistress`);
}


filterByDate2(INTER_SAMPLE_ID):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getdateByInterSampleId?inter_sample_id=${INTER_SAMPLE_ID}`);
}

filterByDate22():Observable<any>
{
  //return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getsURVEY_NOByInterSampleId?inter_sample_id=${INTER_SAMPLE_ID}`);
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getsURVEY_NOByInterSampleId`);
}

getdateData2(inter_samp_id,SurveyDate):Observable<any>    //GetDistressByInterSampleIdAndSurveyDate
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressByInterSampleIdAndSurveyDate?inter_samp_id=${inter_samp_id}&surveyDate=${SurveyDate}`);
}

getdateData22(inter_samp_id,SurveyDate):Observable<any>    //GetDistressByInterSampleIdAndSurveyDate  2/82/2023 ok
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressByInterSampleIdAndsurveyno?inter_samp_id=${inter_samp_id}&survey_no=${SurveyDate}`);
}



filterByDate2AfterInsert(INTER_SAMPLE_ID):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getdateByInterSampleIdafterInsert?inter_samp_id=${INTER_SAMPLE_ID}`);
}




filterByDate2AfterInsert2(INTER_SAMPLE_ID):Observable<any> ////////////2/8/555   not used
{  
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/getsurvey_noByInterSampleIdafterInsert2?inter_samp_id=${INTER_SAMPLE_ID}`);
}



















































//regionDistress 2/9/2023  region




insertrDistressForRegion(distressObject):Observable<any>
{
  return  this.httpclient.post(this.baseUrl+"PCI/DistressEntryPCI/InsertRegionSecondaryStreetDistress",distressObject);
}


GetAllRegions():Observable<any>
{
    return this.httpclient.get(this.baseUrl+"PCI/DistressEntryPCI/GetAllRegions") ;
}

GetRegionInfoByRegionId(region_id):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetRegionInfoByRegionId?regionId=${region_id}`) ;
}

GetAllStreetsByRegionId(region_id):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetAllStreetsByRegionId?regionId=${region_id}`) ;
}


GetDistressByStreetIdAndSurveyNo(streetId,Survey_no):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressByStreetIdAndSurveyNo?streetId=${streetId}&survey_no=${Survey_no}`) ;
}


GetMaxSurveyNoFromDistress():Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetMaxSurveyNoFromDistressRegion`) ;
}

GetDistressByStreetId(streetId):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressByStreetId?streetId=${streetId}`) ;
}


GetDistressBySurvey_NoAndStreetId(streetId,Survey_no):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistressBySurvey_NoAndStreetId?streetId=${streetId}&survey_no=${Survey_no}`);
}

GetStreetByStreetId(streetId):Observable<any>
{
    return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetStreetByStreetId?streetId=${streetId}`);
}


UpdateStreetByStreetId(StreetObject,streetId):Observable<any>
{
    return this.httpclient.put(this.baseUrl+`PCI/DistressEntryPCI/UpdateStreetByStreetId?StreetId=${streetId}`,StreetObject);
}






































//Searching  in Region BY Municipality And District



GetAllMunicipality():Observable<any>
{
  return  this.httpclient.get(this.baseUrl+"PCI/DistressEntryPCI/GetAllMunicipality2");
}


GetDistrictByMId(MunicipalityId:any):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetDistrictByMunicipalityId2?MunicipalityId2=${MunicipalityId}`);
}


GetRegionsByDistrictId(Distyrict_Id):Observable<any>
{
  return this.httpclient.get(this.baseUrl+`PCI/DistressEntryPCI/GetAllRegionsByDistrictId2?District_Id=${Distyrict_Id}`);
}










}





