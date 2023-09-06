import { Component, EventEmitter, Injectable, Input, OnInit, Output } from "@angular/core";
import { CalculateMainStreetSectionsPCI } from "../Data/CalculateMainStreetSectionsPCI";

import { PmmsService } from "../pmms.service";
import { DataService } from "../data.service";
import { TranslateService } from "@ngx-translate/core";

import { AvailableSurveys } from "../Data/AvailableSurveys";
import { LocalDataSource, ViewCell } from "ng2-smart-table";

import { SmartTableData } from "../../../../../@core/data/smart-table";
import { PCICalcService } from "../../../../Services/pci-calc.service";
import { UploadFileService } from "../../../../Services/upload-file.service";
import { MatDialog } from "@angular/material/dialog";
import { UnFinishedLanesPopupComponent } from "../../../../PMMSComponents/pci-calc/un-finished-lanes-popup/un-finished-lanes-popup.component";





@Component({
  selector: "button-view",
  template: `
    <button (click)="onClick(renderValue)" class="smrttableButton">
      {{ renderValue }}
    </button>
  `,
  styleUrls: ["./dataresult.component.scss"],
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
    private dataResultComp:DataresultComponent,
    private pciService: PCICalcService,
  ) {}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    console.log(this.renderValue)
    this.systemSectionLanesInfo=this.dataResultComp.systemSectionLanesInfo
    //this.uploadedSectionLanesInfo=this.pciCalcComp.uploadedSectionLanesInfo
    this.selectedStreet=this.dataResultComp.selectedStreet
    this.surveyNumber=this.dataResultComp.surveyNumber
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(this.systemSectionLanesInfo)
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
    console.log("JKASJASJA")
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
  selector: "ngx-dataresult",
  templateUrl: "./dataresult.component.html",
  styleUrls: ["./dataresult.component.scss"],
  providers: [PmmsService],
})
export class DataresultComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private pmmsService: PmmsService,
    private dataService: DataService,
    private pciService: PCICalcService
  ) {}

  surveyNumber=+localStorage.getItem("surveynumber")
  selectedStreet:any
  ngOnInit() {
    this.getSystemSectionLanesInfo()
    console.log(this.dataService.street_id)
    this.dataService.mainorintrstreet.subscribe((value) => {
      if (value == "1") {
        this.valueaction = `1`;

        this.dataService.datemmiter.subscribe((value1) => {
          this.loading = true;
          this.pciService
            .getsectionscalc(
              this.dataService.MAIN_NO,
              this.surveyNumber
            )
            .subscribe((data) => {
              //this.lstCalculateMainStreetSectionsPCI = data;
              this.selectedStreet=this.dataService.MAIN_NO
              this.loading = false;
              console.warn(data);
              this.source1.empty;
              this.source1.refresh;

              this.source1.load(data);

              this.loading = false;
            });

          // this.inputText = value;
        });
      }
    });
  }

  lstCalculateMainStreetSectionsPCI: CalculateMainStreetSectionsPCI[];
  loading = false;
  valueaction: string;

  inputText: string;
  settings1 = {
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
      CONSIST_LANES: {
        title: "Consist Lanes",
        type: "string",
      },
    },
  };

  source1: LocalDataSource = new LocalDataSource();





  systemSectionLanesInfo:any

  getSystemSectionLanesInfo(){
    this.pciService.getSystemSectionLanesInfo()
    .subscribe((res)=>{
      this.systemSectionLanesInfo=res
      console.log(res)
    })
  }
}
