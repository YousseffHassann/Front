import { Component, EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
//import { PCICalcService } from "../Services/pci-calc.service";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
//import { UploadFileService } from "../Services/upload-file.service";
import { AlertService } from "ngx-alerts";
//import { PCICalcService } from "../../Services/pci-calc.service";
import { UploadFileService } from "../../Services/upload-file.service";
import { PCICalcService } from "../../Services/pci-calc.service";
import { MatDialog } from "@angular/material/dialog";
import { UnFinishedLanesPopupComponent } from "./un-finished-lanes-popup/un-finished-lanes-popup.component";







@Component({
  selector: "button-view",
  template: `
    <button (click)="onClick(renderValue)" class="smrttableButton">
      {{ renderValue }}
    </button>
  `,
  styleUrls: ["./pci-calc.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  systemSectionLanesInfo:any
  uploadedSectionLanesInfo:any
  selectedStreet:any
  surveyNumber:any
  accessfileMAP = new Map<any, any>();
  actualDataMap = new Map<any, any>();

  constructor(
    private sectionService: UploadFileService,
    private dialog:MatDialog,
    private pciCalcComp:PCICALCComponent,
    private pciService: PCICalcService,
  ) {}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    console.log(this.renderValue)
    this.systemSectionLanesInfo=this.pciCalcComp.systemSectionLanesInfo
    //this.uploadedSectionLanesInfo=this.pciCalcComp.uploadedSectionLanesInfo
    this.selectedStreet=this.pciCalcComp.selectedStreet
    this.surveyNumber=this.pciCalcComp.surveyNumber
    this.getUploadedSectionLanesInfo(this.selectedStreet)
    this.systemSectionLanesInfo.forEach(element => {
      if(this.actualDataMap.get(element['SECTION_NO'])==undefined){
        this.actualDataMap.set(element['SECTION_NO'],[{LANE_LENGTH:element['LANE_LENGTH'],LANE_WIDTH:element['LANE_WIDTH'],LANE_TYPE:element['LANE_TYPE']}])
      }
      else{
        this.actualDataMap.get(element['SECTION_NO'])!.push({LANE_LENGTH:element['LANE_LENGTH'],LANE_WIDTH:element['LANE_WIDTH'],LANE_TYPE:element['LANE_TYPE']})
      }
    });
    console.log(this.accessfileMAP)
    console.log(this.selectedStreet)
    console.log(this.uploadedSectionLanesInfo)

  }

  onClick(renderValue) {
    console.log("BUTTON");
    console.log(renderValue);
    console.log(this.systemSectionLanesInfo)
    console.log(this.uploadedSectionLanesInfo)
    this.openDialog();

  }

  openDialog(){
    console.log(this.accessfileMAP)
    this.dialog.open(UnFinishedLanesPopupComponent,{
      data:{
        actualLanes:this.actualDataMap.get(this.renderValue),
        accessfileMAP:this.accessfileMAP,
        sectionNo:this.renderValue
      },
      width:'50rem'
    })
  }


  getUploadedSectionLanesInfo(selectedStreet){
    this.pciService.getUploadedSectionLanesInfo(selectedStreet,this.surveyNumber)
    .subscribe((res)=>{
      this.uploadedSectionLanesInfo=res
      console.log(res)
      res.forEach(element => {
        if(this.accessfileMAP.get(element['SECTION_NO'])==undefined){
          this.accessfileMAP.set(element['SECTION_NO'],[{LANE_LENGTH:element['LANE_LENGTH'],LANE_WIDTH:element['LANE_WIDTH'],LANE_TYPE:element['LANE_TYPE']}])
        }
        else{
          this.accessfileMAP.get(element['SECTION_NO'])!.push({LANE_LENGTH:element['LANE_LENGTH'],LANE_WIDTH:element['LANE_WIDTH'],LANE_TYPE:element['LANE_TYPE']})
        }
      });

    })
  }
}
















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












































@Component({
  selector: "ngx-pci-calc",
  templateUrl: "./pci-calc.component.html",
  styleUrls: ["./pci-calc.component.scss"],
})
export class PCICALCComponent implements OnInit {
  Sections: string;
  tmpobj: { FileName: any; SURVEY_NO: any; Sections: string };
  filename: any;
  surveyNumber=localStorage.getItem("surveynumber");

  constructor(
    private pciService: PCICalcService,
    private sectionService: UploadFileService,
    private alertService: AlertService
  ) {}

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
  fileName=localStorage.getItem("FileName")
  /////////////////////////////////////////////////////////////////
  selectedStreet:any
  /////////////////////////////////////////////////////////////////
  systemSectionLanesInfo:any
  uploadedSectionLanesInfo:any




  ngOnInit(): void {
    this.getallregions();
    this.filename=localStorage.getItem("FileName")
    console.log(this.filename)
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
    // this.getlanecalc();
    // this.getsectionsamplecalc();
    // this.getsectionscalc();
    this.getSystemSectionLanesInfo()

  }



  getSystemSectionLanesInfo(){
    this.pciService.getSystemSectionLanesInfo()
    .subscribe((res)=>{
      this.systemSectionLanesInfo=res
      console.log(res)
    })
  }




  getallregions() {
    this.pciService.getcalcregions(this.surveyNumber).subscribe((res) => {
      console.log(res);
      this.regionsdropdownList = res;
    });
  }

  onRegionSelect(event) {
    console.log(event);
    this.streetsselectedItems=[];
    this.sourceTab1 = new LocalDataSource();
    this.sourceTab2 = new LocalDataSource();
    this.sourceTab3 = new LocalDataSource();
    this.regionselected = true;
    this.pciService.getcalcstreetsbyregion(+event.REGION_ID,this.surveyNumber).subscribe((res) => {
      console.log(res);
      this.streetsdropdownList = res;
    });
  }

  onRegionDeSelect(event){
    console.log(this.streetsselectedItems)
    this.streetsselectedItems=[];
    this.streetsdropdownList=[];
  }

  onStreetSelect(event) {
    console.log(event);
    this.streetselected = true;
    this.selectedStreet=event.MAIN_NO
    this.finalstreet = event.MAIN_NO;
    this.getlanecalc(this.selectedStreet);
    this.getsectionsamplecalc(this.selectedStreet);
    this.getsectionscalc(this.selectedStreet);
  }

  finalstreet: any;

  selectedrecords: any[];



  onUserRowSelect(event) {
    console.log(event);
    this.selectedrecords = event.selected;
    console.log(this.selectedrecords)
  }















  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  seccalccompleted: boolean = true;
  samplecalccompleted: boolean = true;
  lanecalccompleted: boolean = true;
  submitbuttonpressed: boolean = false;
  ///////////////////////////////////////////////////////////////
  // TAB1 SMART TABLE SETTINGS (LANES)
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
    //selectMode: 'multi',
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
      LANE_TYPE: {
        title: "Lane Type",
        type: "string",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      NO_OF_SAMPLES: {
        title: "Number Of Samples",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
      CONSIST_LANES:{
        title: "Consist Lanes",
        type: "string",
      },
    },
  };

  sourceTab1: LocalDataSource = new LocalDataSource();

  getlanecalc(streetID) {
    console.log("****************************");
    console.log(this.Sections);
    this.pciService
      .getlanecalc(streetID, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab1.load(res);
        this.lanecalccompleted = true;
      });
  }

  // TAB1 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB2 SMART TABLE SETTINGS (SAMPLES)
  settingsTab2 = {
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
    //selectMode: 'multi',
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
      LANE_TYPE: {
        title: "Lane Type",
        type: "string",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      SAMPLE_NO: {
        title: "Sample Number",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
      CONSIST_LANES:{
        title: "Consist Lanes",
        type: "string",
      },
    },
  };

  sourceTab2: LocalDataSource = new LocalDataSource();

  getsectionsamplecalc(streetID) {
    console.log("LOL")
    this.pciService
      .getsectionsamplecalc(streetID, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab2.load(res);
        this.samplecalccompleted = true;
      });
  }

  // TAB2 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB3 SMART TABLE SETTINGS (SECTIONS)
  settingsTab3 = {
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
      perPage: 20,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    rowClassFunction: (row: any) => {
      if (row.data.CONSIST_LANES == "0") {
        return "red";
      }
      // else {
      //   return 'green'
      // }
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "custom",
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe((row) => {});
        },
      },
      // LANE_TYPE: {
      //   title: 'Lane Type',
      //   type: 'string',
      // },
      NO_OF_LANES: {
        title: "Number Of Lanes",
        type: "number",
      },
      SECTION_AREA: {
        title: "Section Area",
        type: "number",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
      CONSIST_LANES:{
        title: "Consist Lanes",
        type: "string",
      },
    },
  };

  sourceTab3: LocalDataSource = new LocalDataSource();

  getsectionscalc(streetID) {
    this.pciService
      .getsectionscalc(streetID, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab3.load(res);
        this.seccalccompleted = true;
      });
  }

  // TAB3 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////





}
