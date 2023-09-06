
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { AssetsSettingsService } from "../../../assets-settings.service";
import "rxjs/add/operator/map";

@Injectable({ providedIn: "root" })

export class equipmentsectionsdetailsService {

  constructor(   private httpClient: HttpClient,
    private AssetsSettingsService1: AssetsSettingsService) { }
    GetSectionsDetailsIRI_byST(): Observable<any> {
    var GetSectionsDetailsIRI_byST=this.AssetsSettingsService1.IRI.EquipmentSectionsDetails.GetSectionsDetailsIRI_byST

    return this.httpClient.get(
      GetSectionsDetailsIRI_byST
    );
  } 
     GetSectionsDetailsIRI_byST2(streetid): Observable<any> {
    var GetSectionsDetailsIRI_byST=this.AssetsSettingsService1.IRI.EquipmentSectionsDetails.GetSectionsDetailsIRI_byST

    return this.httpClient.get(
      GetSectionsDetailsIRI_byST+'?MAIN_NO='+ streetid
    );
  }
  GetSectionsDetailsSYS_ST(streetid): Observable<any> {
    var GetSectionsDetailsSYS_ST=this.AssetsSettingsService1.IRI.EquipmentSectionsDetails.GetSectionsDetailsSYS_ST

    return this.httpClient.get(
      GetSectionsDetailsSYS_ST+'?MAIN_NO='+ streetid
    );
  }


  
  GetSectionsDetailsNewIRI_St(streetid): Observable<any> {
    var GetSectionsDetailsNewIRI_St=this.AssetsSettingsService1.IRI.EquipmentSectionsDetails.GetSectionsDetailsNewIRI_St

    return this.httpClient.get(
      GetSectionsDetailsNewIRI_St+'?MAIN_NO='+streetid
    );
  }
}
