import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DataMdService {
  // dataEmmiter = new EventEmitter<any>();
  STREET_IDMd = new Subject<string>();
  SURVEY_NOMd = new Subject<string>();
  mainorintrstreetMd = new Subject<string>();
  regionselect = new Subject<string>();

  app = new Subject<string>();
  datemmiterMd = new Subject();
  datemmiterMd2 = new Subject();

  raisSURVEY_NOMd(SURVEY_NO: string) {
    this.SURVEY_NOMd.next(SURVEY_NO);
  }
  raisSTREET_IDMd(STREET_ID: string) {
    this.STREET_IDMd.next(STREET_ID);
  }
  raisregionselect(regionselect: string) {
    this.regionselect.next(regionselect);
  }
  raismainorintrstreetMd(mainorintrstreetMd: string) {
    this.mainorintrstreetMd.next(mainorintrstreetMd);
  }
  raisdatemmiterMd(data: any) {
    this.datemmiterMd.next(data);
  }

  raisdatemmiterMd2(data: string) {
    this.datemmiterMd2.next(data);
  }
  raisapp(app: string) {
    this.app.next(app);
  }
}
