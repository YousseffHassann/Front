import { Component, OnInit } from "@angular/core";
import { UncalculatedSectionsService } from "../../Services/uncalculated-sections.service";
import { LocalDataSource } from "ng2-smart-table";
import { UploadFileService } from "../../Services/upload-file.service";
import { AlertService } from "ngx-alerts";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-uncalculated-sections",
  templateUrl: "./uncalculated-sections.component.html",
  styleUrls: ["./uncalculated-sections.component.scss"],
})
export class UncalculatedSectionsComponent implements OnInit {
  constructor(
    private uncalcService: UncalculatedSectionsService,
    private sectionService: UploadFileService,
    private alertService: AlertService,
    private router: Router
  ) {}
  filename: any;
  surveyNumber = localStorage.getItem("surveynumber");

  /////////////////////////////////////////////////////////////////
  // Region Dropdown List
  regionsdropdownList = [];
  regionsselectedItems = [];
  regionsdropdownSettings = {};
  ////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // Streets Drowpdown List
  streetsdropdownList = [];
  streetsselectedItems = [];
  streetsdropdownSettings = {};

  regionselected = false;
  streetselected = false;
  /////////////////////////////////////////////////////////////////
  selectedStreet: any;
  /////////////////////////////////////////////////////////////////
  systemSectionLanesInfo: any;
  uploadedSectionLanesInfo: any;
  selectedrecords: any[];

  ngOnInit(): void {
    this.getallregions();
    this.filename = localStorage.getItem("FileName");
    console.log(this.filename);
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
    this.surveyNumber = localStorage.getItem("surveynumber");
  }

  getallregions() {
    this.uncalcService.getUnCalcRegions(this.surveyNumber).subscribe((res) => {
      console.log(res);
      this.regionsdropdownList = res;
    });
  }

  regionID;
  onRegionSelect(event) {
    console.log(event);
    this.sourceTab1 = new LocalDataSource();
    this.streetsselectedItems = [];
    this.regionselected = true;
    this.regionID = +event.REGION_ID;
    this.uncalcService
      .getUnCalcStreetsbyregion(+event.REGION_ID, this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.streetsdropdownList = res;
      });
  }

  onRegionDeSelect(event) {
    console.log(this.streetsselectedItems);
    this.sourceTab1 = new LocalDataSource();
    this.streetsselectedItems = [];
    this.streetsdropdownList = [];
  }

  onStreetSelect(event) {
    this.sourceTab1 = new LocalDataSource();
    console.log(event);
    this.streetselected = true;
    this.selectedStreet = event.MAIN_NO;
    this.loadData();
  }

  loadData() {
    this.uncalcService
      .getSectionsWithUnCalcPCI(
        this.selectedStreet,
        this.surveyNumber,
        this.regionID
      )
      .subscribe((res) => {
        console.log(res);
        this.sourceTab1.load(res);
      });
  }

  onStreetDeSelect(event) {
    this.sourceTab1 = new LocalDataSource();
  }

  ///////////////////////////////////////////////////////////////
  // SMART TABLE SETTINGS
  settingsTab1 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: "multi",
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      MAIN_NO: {
        title: "Main Number",
        type: "string",
      },
      REGION_NO: {
        title: "Region Number",
        type: "number",
      },
      FILE_NAME: {
        title: "File Name",
        type: "string",
      },
    },
  };

  sourceTab1: LocalDataSource = new LocalDataSource();

  onUserRowSelect(event) {
    console.log(event);
    this.selectedrecords = event.selected;
  }
  filesSelected = new Map<string, string>();
  tmpobj: {};

  onSubmit() {
    this.router.navigate(['/pages/UploadFileComponent'])
    // this.filesSelected = new Map<string, any>();
    // this.selectedrecords.forEach((element) => {
    //   if (this.filesSelected.has(element["FILE_NAME"])) {
    //     this.filesSelected.set(
    //       element["FILE_NAME"],
    //       this.filesSelected.get(element["FILE_NAME"]) +"," +element["SECTION_NO"]
    //     );
    //   } else {
    //     this.filesSelected.set(element["FILE_NAME"], element["SECTION_NO"]);
    //   }
    // });
    // console.log(this.filesSelected.keys);
    // this.filesSelected.forEach((value: string, key: string) => {
    //   console.log(key, value);
    //   this.tmpobj = {
    //     FileName: key,
    //     SURVEY_NO: this.surveyNumber.toString(),
    //     Sections: value,
    //   };
    //   console.log(this.tmpobj);
    //   this.sectionService.submitdata(this.tmpobj).subscribe((res) => {
    //     console.log(res);
    //     this.alertService.success("Survey Completed");
    //     this.alertService.info("Calculating PCI");
    //     this.sectionService
    //       .PCIcalculations(this.surveyNumber)
    //       .subscribe((res) => {
    //         console.log(res);
    //         if (res == true) {
    //           this.alertService.success("Calculation Completed");
    //         } else {
    //           this.alertService.warning("Calculations Failed");
    //         }
    //         this.loadData()
    //       });
    //   });
    // });
  }
}
