import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntersectiondistressService {

  constructor(private httpclient:HttpClient) { }

insertIntersectionDistress( distressCode,  intersectSampleID,  intersectSampleNo,  INTER_NO,  surveyDate,  surveyNo ,  severity, distArea,
    SAMPLE_LENGTH,  SAMPLE_WIDTH,  intersectNo,  notes,  user,  intersectID,  userID,  streetID):Observable<any>
{
   return this.httpclient.post(`https://localhost:44310/api/PCI/DistressEntryPCI/InsertIntersectionDistress?distressCode=${distressCode}
   &intersectSampleID=${intersectSampleID}&intersectSampleNo=${intersectSampleNo}&INTER_NO=${INTER_NO}&surveyDate=${surveyDate}
   &surveyNo=${surveyNo}&severity=${severity}&distArea=${distArea}&SAMPLE_LENGTH=${SAMPLE_LENGTH}&intersectNo=${intersectNo}
   &SAMPLE_WIDTH=${SAMPLE_WIDTH}&notes=${notes}
   &user=${user}&intersectID=${intersectID}&userID=${userID}&streetID=${streetID}`,null);
}


}
