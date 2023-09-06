import { SurveyedDistricts } from "../Data/SurveyedDistricts";
import { Component, OnInit } from "@angular/core";
import { PmmsService } from "../pmms.service";
import { DataService } from "../data.service";
import { SurveyedMunicipalities } from "../Data//SurveyedMunicipalities";
import { SurveyedRegions } from "../Data//SurveyedRegions";
import { AvailableSurveys } from "../Data//AvailableSurveys";

import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { asLiteral } from "@angular/compiler/src/render3/view/util";

@Component({
  selector: "ngx-intersectionstreet",
  templateUrl: "./intersectionstreet.component.html",
  styleUrls: ["./intersectionstreet.component.scss"],
})
export class IntersectionstreetComponent implements OnInit {
  SurveyedMunicipalities: SurveyedMunicipalities[];
  SurveyedDistricts: SurveyedDistricts[];
  SurveyedRegions: SurveyedRegions[];
  Region_ID: string;
  regionselect: string = "3";
  mainorintrstreet: string = "3";

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
    private pmmsService: PmmsService,
    private fb: FormBuilder,
    private dataService: DataService
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
    this.dataService.raismainorintrstreet(this.regionselect);

    this.dataService.raisdatemmiter2(streetForm);
    // console.log(JSON.stringify(streetForm));
    // console.warn(JSON.stringify(streetForm));

  }

  ondatasubmit2(data: any) {
    this.dataService.raismainorintrstreet(this.regionselect);

    this.dataService.raisdatemmiter2(data);

    // console.warn(JSON.stringify(data));
  }
  ngOnInit() {
    this.pmmsService.GetAvailableSurveys().subscribe((data) => {
      this.AvailableSurveys = data;
    });
  }
}
