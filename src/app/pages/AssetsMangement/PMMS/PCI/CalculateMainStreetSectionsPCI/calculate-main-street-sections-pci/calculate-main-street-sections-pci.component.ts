import { Component, OnInit } from "@angular/core";
import { AvailableSurveys } from "../../Data/AvailableSurveys";
import { PmmsService } from "../../pmms.service";
import { DataService } from "../../data.service";

 import { MainStreetsHavingSurveyDistresses } from "../../Data/MainStreetsHavingSurveyDistresses";
import { PCICalcService } from "../../../../../Services/pci-calc.service";

@Component({
  selector: "ngx-calculate-main-street-sections-pci",
  templateUrl: "./calculate-main-street-sections-pci.component.html",
  styleUrls: ["./calculate-main-street-sections-pci.component.scss"],
})
export class CalculateMainStreetSectionsPCIComponent implements OnInit {
  constructor(
    private pmmsService: PmmsService,
    private dataService: DataService,
    private pciService: PCICalcService,
  ) { }
  AvailableSurveys: any[];
 MainStreetsHavingSurveyDistresses: MainStreetsHavingSurveyDistresses[];

  survey: string;
  mainorintrstreet: string = "1";


  /////////////////////////////////////////////////////////////////
  // Region Dropdown List
  regionsdropdownList = [];
  regionsselectedItems = [];
  regionsdropdownSettings = {};
  ////////////////////////////////////////////////////////////////

  // Streets Drowpdown List
  streetsdropdownList = [];
  streetsselectedItems = [];
  streetsdropdownSettings = {};

  regionselected = false;
  streetselected = false;

  STREET_ID:any



  ngOnInit() {

    /////////////////////////////////////////////////////
    this.regionsdropdownList = [];
    this.regionsselectedItems = [];
    this.regionsdropdownSettings = {
      singleSelection: true,
      idField: "REGION_ID",
      textField: "ENNAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    ///////////////////////////////////////////////////////
    this.streetsdropdownList = [];
    this.streetsselectedItems = [];
    this.streetsdropdownSettings = {
      singleSelection: true,
      idField: "MAIN_NO",
      textField: "ENNAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };

    /////Hi all2333   9999
    // this.pciService.getallregions().subscribe((data) => {
    //   console.log(data)
    //   this.AvailableSurveys = data;
    // });
    // this.pmmsService
    //   .GetMainStreetsHavingSurveyDistressesjson()
    //   .subscribe((data) => {
    //     this.MainStreetsHavingSurveyDistresses = data;
    //   });

    this.getallregions();
  }

  radioChange() {
    this.mainorintrstreet = "1";
  }
  radioChange1() {
    this.mainorintrstreet = "2";
  }
  ondatasubmit() {

    let data={survey:localStorage.getItem("surveynumber"),STREET_ID:this.STREET_ID}
    console.log(data)
    this.dataService.raisSTREET_ID(this.STREET_ID);
    this.dataService.raismainorintrstreet(this.mainorintrstreet);
    this.dataService.street_id=this.STREET_ID

    //let obj=JSON.stringify(data);

    this.dataService.raisdatemmiter(data);
    //console.warn(JSON.stringify(data));


  }
















  survey_no=localStorage.getItem("surveynumber")
  streetIDHashMap=new Map<string, string>()


  //////////////////////////////////////////////////////////////////////////////////////////////////////
  getallregions() {
    this.dataService.getcalcregions(this.survey_no).subscribe((res) => {
      console.log(res);
      this.regionsdropdownList = res;
      console.log(this.regionsdropdownList)
    });
  }

  onRegionSelect(event) {
    console.log(event);
    this.regionselected = true;
    this.dataService.getcalcstreetsbyregion(+event.REGION_ID,this.survey_no).subscribe((res) => {
      console.log(res);
      this.streetsdropdownList = res;
      res.forEach(element => {
        this.streetIDHashMap.set(element["MAIN_NO"],element["STREET_ID"])
      });
    });
  }

  onStreetSelect(event){
    console.log(event)
    this.STREET_ID = this.streetIDHashMap.get(event.MAIN_NO);
    this.dataService.MAIN_NO=event.MAIN_NO
  }
  onRegionDeSelect(event){
    console.log(this.streetsselectedItems)
    this.streetsselectedItems=[];
    this.streetsdropdownList=[];
    this.STREET_ID=null
  }
}
