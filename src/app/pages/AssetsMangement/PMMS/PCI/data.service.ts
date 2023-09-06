import { map } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AssetsSettingsService } from "../../assets-settings.service";

@Injectable({ providedIn: "root" })
export class DataService {

  constructor(
    private httpclient: HttpClient,
    private first_part: AssetsSettingsService
  ) {}
  baseUrl: string = this.first_part.hostaddress2;
  // dataEmmiter = new EventEmitter<any>();
  STREET_ID = new Subject<string>();
  SURVEY_NO = new Subject<string>();
  mainorintrstreet = new Subject<string>();
  regionselect = new Subject<string>();
  MAIN_NO:any

  app = new Subject<string>();
  datemmiter = new Subject();
  datemmiter2 = new Subject();
  street_id:any

  raisSURVEY_NO(SURVEY_NO: string) {
    this.SURVEY_NO.next(SURVEY_NO);
  }
  raisSTREET_ID(STREET_ID: string) {
    this.STREET_ID.next(STREET_ID);
  }
  raisregionselect(regionselect: string) {
    this.regionselect.next(regionselect);
  }
  raismainorintrstreet(mainorintrstreet: string) {
    this.mainorintrstreet.next(mainorintrstreet);
  }
  raisdatemmiter(data: any) {
    this.datemmiter.next(data);
  }

  raisdatemmiter2(data: string) {
    this.datemmiter2.next(data);
  }
  raisapp(app: string) {
    this.app.next(app);
  }

  STREET_IDMd = new Subject<string>();
  SURVEY_NOMd = new Subject<string>();
  mainorintrstreetMd = new Subject<string>();

  datemmiterMd = new Subject();
  datemmiterMd2 = new Subject();

  raisSURVEY_NOMd(SURVEY_NO: string) {
    this.SURVEY_NOMd.next(SURVEY_NO);
  }
  raisSTREET_IDMd(STREET_ID: string) {
    this.STREET_IDMd.next(STREET_ID);
  }

  raismainorintrstreetMd(mainorintrstreetMd: string) {
    this.mainorintrstreetMd.next(mainorintrstreetMd);
  }
  raisdatemmiterMd(data: string) {
    this.datemmiterMd.next(data);
  }

  raisdatemmiterMd2(data: string) {
    this.datemmiterMd2.next(data);
  }








  ////////////////////////////////////////////////////////////////////////
  // GET REGIONS WITH CALCULATED PCI
  calcregionsURL= this.baseUrl + "Archive/AccessDBSample/getcalcregions";
  getcalcregions(survey_no):Observable<string[]> {
    return this.httpclient.get<string[]>(this.calcregionsURL+`?survey_no=${survey_no}`);
  }

  ////////////////////////////////////////////////////////////////////////
  // GET sreets WITH CALCULATED PCI by region
  streetsbyregionURL=this.baseUrl + "Archive/AccessDBSample/getcalcstreets";
  getcalcstreetsbyregion(region_id,survey_no):Observable<string[]> {
    return this.httpclient.get<string[]>(this.streetsbyregionURL+`?region_id=${region_id}&survey_no=${survey_no}`);
  }
}
