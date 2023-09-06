import { Component, OnInit } from "@angular/core";
import { WorkOrdersService } from "../../Services/work-orders.service";
import { LocalDataSource } from "ng2-smart-table";
import { PCICalcService } from "../../Services/pci-calc.service";
import { EditCellComponent } from "ng2-smart-table/lib/components/cell/cell-edit-mode/edit-cell.component";
import { WorkOrder } from "../../../Models/work-order.model";
import { AssetsSettingsService } from "../../AssetsMangement/assets-settings.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "ngx-work-orders",
  templateUrl: "./work-orders.component.html",
  styleUrls: ["./work-orders.component.scss"],
})
export class WorkOrdersComponent implements OnInit {
  constructor(
    private workorderService: WorkOrdersService,
    private pciService: PCICalcService,
    private assetSettingsService: AssetsSettingsService,
    private sanitizer: DomSanitizer
  ) {}

  surveyNumber:any
  wordOrderObject:WorkOrder
  mainNo:string

  ngOnInit(): void {
    /////////////////////////////////////////////////////
    //Contractor Dropdown list options
    this.contractorsdropdownList = [];
    this.contractorsselectedItems = [];
    this.contractorsdropdownSettings = {
      singleSelection: true,
      idField: "CONTRACTOR_ID",
      textField: "CONTRACTOR_NAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    ///////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    //Contractor Dropdown list options
    this.contractsdropdownList = [];
    this.contractsselectedItems = [];
    this.contractsdropdownSettings = {
      singleSelection: true,
      idField: "CONTRACT_ID",
      textField: "CONTRACT_NAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    ///////////////////////////////////////////////////////


    /////////////////////////////////////////////////////
    //Region Dropdown list options
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
    //Street Dropdown list options
    this.streetsdropdownList = [];
    this.streetsselectedItems = [];
    this.streetsdropdownSettings = {
      singleSelection: true,
      idField: "STREET_ID",
      textField: "ENNAME",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.surveyNumber = localStorage.getItem("surveynumber");

    this.getAllContractors();

    this.wordOrderObject={
      WO_ID:0,
      CONTRACT_ID:0,
      FROM_DATE:{} as Date,
      TO_DATE:{} as Date,
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Start First ROW

  contractStartDate:string
  contractEndDate:string

  ///////////////////////////////////////////////////////////
  // Contractor Dropdown list
  contractorsdropdownList = [];
  contractorsselectedItems = [];
  contractorsdropdownSettings = {};

  ////////////////////////////////////////////////////////
  // Contract Dropdown list
  contractsdropdownList = [];
  contractsselectedItems = [];
  contractsdropdownSettings = {};

  getAllContractors() {
    this.workorderService.getAllContractors().subscribe((res) => {
      this.contractorsdropdownList = res;
    });
  }

  onContractorSelection(event) {
    console.log(event);
    this.contractStartDate=""
    this.contractEndDate=""
    this.wordOrderObject.FROM_DATE={} as Date
    this.wordOrderObject.TO_DATE={} as Date
    this.getContractByContractor(event.CONTRACTOR_ID);
    this.contractsselectedItems = [];
  }

  onContractorDeSelection(event){
    this.contractsdropdownList = [];
    this.contractsselectedItems = [];
    this.wordOrderObject.FROM_DATE={} as Date
    this.wordOrderObject.TO_DATE={} as Date
  }

  getContractByContractor(contractor_id) {
    this.workorderService
      .getContractByContractor(contractor_id)
      .subscribe((res) => {
        this.contractsdropdownList = res;
      });
  }

  onContractSelection(event) {
    console.log(event);
    this.contractStartDate=""
    this.contractEndDate=""
    this.wordOrderObject.FROM_DATE={} as Date
    this.wordOrderObject.TO_DATE={} as Date
    this.wordOrderObject.CONTRACT_ID=+event.CONTRACT_ID
    this.getAllRegions()
    this.getContractDates(event.CONTRACT_ID)
  }


  getContractDates(contract_id){
    this.workorderService.getContractDates(contract_id).
    subscribe(res=>{
      console.log(res);
      this.contractStartDate=res[0]["START_DATE"]
      this.contractEndDate=res[0]["END_DATE"]
      this.contractStartDate=this.contractStartDate.split(" ")[0]
      this.contractStartDate=this.contractStartDate.split("/").reverse().join("-")
      this.contractEndDate=this.contractEndDate.split(" ")[0]
      this.contractEndDate=this.contractEndDate.split("/").reverse().join("-")
      console.log(this.contractStartDate)
    })
  }


  //End of First ROW
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //
  //
  //





  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Start Second ROW

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


  getAllRegions(){
    this.pciService.getallregions().subscribe((res) => {
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
    this.sourceTab4 = new LocalDataSource();
    //this.regionselected = true;
    this.pciService.getstreetsbyregion(+event.REGION_ID).subscribe((res) => {
      console.log(res);
      this.streetsdropdownList = res;
    });
  }

  onRegionDeSelect(event){
    this.streetsselectedItems=[];
    this.streetsdropdownList=[];
    this.sourceTab1 = new LocalDataSource();
    this.sourceTab2 = new LocalDataSource();
    this.sourceTab3 = new LocalDataSource();
    this.sourceTab4 = new LocalDataSource();
  }



  onStreetSelect(event){
    console.log(event)
    this.sourceTab1 = new LocalDataSource();
    this.sourceTab2 = new LocalDataSource();
    this.sourceTab3 = new LocalDataSource();
    this.mainNo=event.ENNAME
    this.getSampleMaintenanceDecision(event.ENNAME)
    this.getLaneMaintenanceDecision(event.ENNAME)
    this.getSectionMaintenanceDecision(event.ENNAME)
    this.getAllSectionsByMainNo(event.ENNAME)
  }

  onStreetDeSelect(event){
    this.sourceTab1 = new LocalDataSource();
    this.sourceTab2 = new LocalDataSource();
    this.sourceTab3 = new LocalDataSource();
    this.sourceTab4 = new LocalDataSource();
  }











  //End of Second ROW
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Start Third ROW

  workOrderStartDate
  workOrderEndDate


  //End of Third ROW
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////////////
  // TAB1 SMART TABLE SETTINGS (SAMPLE)
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
      perPage: 5,
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
      LANE: {
        title: "Lane Type",
        type: "string",
      },
      SAMPLE_NO: {
        title: "Sample Number",
        type: "number",
      },
      MAINT_AREA2: {
        title: "Maintenance Area",
        type: "number",
      },
      MD_COST:{
        title: "Maintenance Decision Cost",
        type: "number",
      },
      RECOMMENDED_DECISION: {
        title: "RECOMMENDED DECISION",
        type: "string",
      },
    },
  };

  sourceTab1: LocalDataSource = new LocalDataSource();

  getSampleMaintenanceDecision(main_no) {
    this.workorderService
      .getSampleMaintenanceDecision(main_no)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab1.load(res);
      });
  }

  // TAB1 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////
  // TAB2 SMART TABLE SETTINGS (Lane)
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
      perPage: 5,
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
      LANE: {
        title: "Lane Type",
        type: "string",
      },
      MD_COST: {
        title: "MD Cost",
        type: "number",
      },
      MAINT_AREA: {
        title: "Maintenance Area",
        type: "number",
      },
    },
  };

  sourceTab2: LocalDataSource = new LocalDataSource();

  getLaneMaintenanceDecision(main_no) {
    this.workorderService
      .getLaneMaintenanceDecision(main_no)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab2.load(res);
      });
  }

  // TAB2 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////
  // TAB3 SMART TABLE SETTINGS (Section MD)
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
      perPage: 5,
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
      MD2:{
        title: "Maintenance Decision",
        type: "number",
      },
      MD_COST: {
        title: "MD Cost",
        type: "number",
      },
      MAINT_AREA: {
        title: "Maintenance Area",
        type: "number",
      },
    },
  };

  sourceTab3: LocalDataSource = new LocalDataSource();

  getSectionMaintenanceDecision(main_no) {
    this.workorderService
      .getSectionMaintenanceDecision(main_no)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab3.load(res);
      });
  }

  // TAB3 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////




  ///////////////////////////////////////////////////////////////
  // TAB4 SMART TABLE SETTINGS (Section)
  settingsTab4 = {
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
      perPage: 5,
    },
    selectMode: 'multi',
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
        title: "Street Number",
        type: "string",
      },
    },
  };

  sourceTab4: LocalDataSource = new LocalDataSource();


  getAllSectionsByMainNo(main_no){
    this.workorderService.getAllSectionsByMainNo(main_no).
    subscribe(res=>{
      console.log(res);
      this.sourceTab4.load(res);
    })
  }

  // TAB4 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////



  selections = new Set<string>();

  addWorkOrder(){
    console.log(this.wordOrderObject)
    this.workorderService.addWorkOrder(this.wordOrderObject).
    subscribe(res=>{
      console.log(res)
      this.workorderService.addWorkOrderDetails(res.wO_ID,this.mainNo,Array.from(this.selections.values())).
      subscribe(res=>{
        console.log(res);
        this.getAllSectionsByMainNo(this.mainNo)
        this.selections.clear();
      })
    })
  }


  onSectionSelection(event){
    console.log(event);
    this.selections.add(event.data.SECTION_NO)
    console.log(this.selections)
  }

  onSectionDeSelection(event){
    console.log(event);
    this.selections.delete(event.data.SECTION_NO);
    console.log(this.selections)
  }







  reportLink:any
  showReportFlag=false



  showReport(){
    this.reportLink=this.assetSettingsService.ReportsHost + 'WorkOrder.aspx?rname=WorkOrder&module=pci'
    this.reportLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.reportLink);
    this.showReportFlag=true
  }
}
