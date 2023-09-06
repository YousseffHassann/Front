import { SurveyedDistricts } from "../Data/SurveyedDistricts";
import { Component, OnInit } from "@angular/core";
import { PmmsMdService } from "../pmmsMd.service";
import { DataMdService } from "../dataMd.service";
import { SurveyedMunicipalities } from "../Data/SurveyedMunicipalities";
import { SurveyedRegions } from "../Data/SurveyedRegions";
import { AvailableSurveys } from "../Data/AvailableSurveys";

import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { asLiteral } from "@angular/compiler/src/render3/view/util";

@Component({
  selector: "ngx-intersectionstreetMd",
  templateUrl: "./intersectionstreetMd.component.html",
  styleUrls: ["./intersectionstreetMd.component.scss"],
})
export class IntersectionstreetMdComponent implements OnInit {
  SurveyedMunicipalities: SurveyedMunicipalities[];
  SurveyedDistricts: SurveyedDistricts[];
  SurveyedRegions: SurveyedRegions[];
  Region_ID: string;
  regionselect: string = "3";

  AvailableSurveys: AvailableSurveys[];
  survey: string;

  munic_id: string;
  DIST_ID: string;
  favouretcolorcontrol = new FormControl();
  favcolor = "";

  profilegroup: FormGroup;

  radio1: boolean = true;
  radio2: boolean = true;
  radio3: boolean = true;

  constructor(
    private pmmsService: PmmsMdService,
    private fb: FormBuilder,
    private dataServiceMd: DataMdService
  ) {}

  radioChange1() {
    this.pmmsService.GetSurveyedRegions().subscribe((data) => {
      this.SurveyedRegions = data;
    });
    this.radio1 = false;
    this.radio2 = true;
    this.radio3 = true;
  }
  radioChange2() {
    this.pmmsService.GetSurveyedDistricts().subscribe((data) => {
      this.SurveyedDistricts = data;
    });
    this.SurveyedMunicipalities = [];
    this.regionselect = "4";
    this.radio1 = true;
    this.radio2 = false;
    this.radio3 = true;
  }
  radioChange3() {
    this.pmmsService.GetSurveyedMunicipalities().subscribe((data) => {
      this.SurveyedMunicipalities = data;
    });
    this.regionselect = "5";
    this.radio1 = true;
    this.radio2 = true;
    this.radio3 = false;
  }

  ons2(streetForm) {
    this.dataServiceMd.raismainorintrstreetMd(this.regionselect);

    this.dataServiceMd.raisdatemmiterMd(streetForm);
    console.log(JSON.stringify(streetForm));
    console.warn(JSON.stringify(streetForm));

  }

  ondatasubmitMd2(data: any) {
    this.dataServiceMd.raismainorintrstreetMd(this.regionselect);


    this.dataServiceMd.raisdatemmiterMd(data);
    console.warn(JSON.stringify(data));

    // console.warn(JSON.stringify(data));
  }
  ngOnInit() {
    this.pmmsService.GetAvailableSurveysjson().subscribe((data) => {
      this.AvailableSurveys = data;
    });
  }
}
