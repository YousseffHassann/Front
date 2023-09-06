import { Component, EventEmitter, Input, OnInit, Output, enableProdMode } from '@angular/core';
import { WorkOrder } from '../../../Models/work-order.model';
import { PCICalcService } from '../../Services/pci-calc.service';
import { AssetsSettingsService } from '../../AssetsMangement/assets-settings.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WosettlmentFormComponent } from '../wosettlment-form/wosettlment-form.component';







@Component({
  selector: 'ngx-work-orders-settlement',
  templateUrl: './work-orders-settlement.component.html',
  styleUrls: ['./work-orders-settlement.component.scss']
})
export class WorkOrdersSettlementComponent implements OnInit {
  checkAdd: boolean=false;
  recommendedDecisionPlaceHolder: string;
  clickupsdatedataformbufrombutton: any;
  rowdata: any;
  wodropdownList: string[];
  woselectedItems: [];
  wodropdownSettings: { };



  constructor(
    private workordersettlementService: WorkOrdersSettlementService,
    private dialog:MatDialog,

  ) { }
  
  mddropdownList: [];
  mdselectedItems: [];
  mddropdownSettings: {};

 mdId:number;


   
 MDList: string[];

  surveyNumber:any
  wordOrderObject:WorkOrder
  mainNo:string
  WOsource: LocalDataSource = new LocalDataSource();
mdID : string;
  ngOnInit(): void {
    this.workordersettlementService.getAllMaintenanceDecisions().subscribe(data => {
      console.log(data);
      this.MDList=data;
     });
     this.mddropdownList = [];
     this.mdselectedItems = [];
     this.mddropdownSettings = {
       singleSelection: true,
       idField: "RECOMMENDED_DECISION_ID",
       textField: "RECOMMENDED_DECISION",
       selectAllText: "Select All",
       unSelectAllText: "UnSelect All",
       itemsShowLimit: 3,
       allowSearchFilter: true,
       closeDropDownOnSelection: true,
     };
 

     this.wodropdownList = [];
     this.woselectedItems = [];
     this.wodropdownSettings = {
       singleSelection: true,
       idField: "WO_ID",
       textField: "WO_ID",
       selectAllText: "Select All",
       unSelectAllText: "UnSelect All",
       itemsShowLimit: 3,
       allowSearchFilter: true,
       closeDropDownOnSelection: true,
     };

    
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



    
    this.surveyNumber = localStorage.getItem("surveynumber");

    this.getAllContractors();

    this.wordOrderObject={ 
      WO_ID:0,
      CONTRACT_ID:0,
      FROM_DATE:{} as Date,
      TO_DATE:{} as Date,
    }
  }



onMDSelection(event) 
{
  
  this.mdId  =  event.RECOMMENDED_DECISION_ID;

}


  registerationForm: FormGroup = new FormGroup({
    MaintenanceDecision: new FormControl(null, [Validators.required,]),
    MaintenanceLength: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],),
    Maintenancewidth: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    MainNo:new FormControl(null, [Validators.required]),
    SectionNo:new FormControl(null, [Validators.required]),
    SampleNo:new FormControl(null, [Validators.required]),
    LaneType:new FormControl(null, [Validators.required]),
    MDCost:new FormControl(null, [Validators.required]),
    MDLevel:new FormControl(null, [Validators.required]),
    MDArea:new FormControl(null, [Validators.required]),
    UnitPrice:new FormControl(null, [Validators.required]),

    //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
  });

  WOSettlement: {}

  SubmitRegisteration(forminfo: FormGroup) { 
    this.checkAdd=false;
    this.clickupsdatedataformbufrombutton = forminfo.value;
   

    this.WOSettlement = {
      "MAIN_NO": this.clickupsdatedataformbufrombutton['MAIN_NO'],
      "SECTION_NO": this.clickupsdatedataformbufrombutton['SECTION_NO'],
      "LANE": this.clickupsdatedataformbufrombutton['LANE'],
      "SAMPLE_NO": +this.clickupsdatedataformbufrombutton['SAMPLE_NO'],
      "MD": +this.mdId,
      "MD_LENGTH": +this.clickupsdatedataformbufrombutton['MD_LENGTH'],
      "MD_WIDTH": +this.clickupsdatedataformbufrombutton['MD_WIDTH'],
    }
    console.log(this.WOSettlement);

    
    forminfo.reset();
  }




  // openForm(event)
  // {
  //   this.rowdata = event;
  //   console.log(event.data.RECOMMENDED_DECISION);
  //         this.recommendedDecisionPlaceHolder=event.data.RECOMMENDED_DECISION;
  //   console.log(event.data.MAIN_NO);

  //   this.registerationForm.controls.MaintenanceDecision.setValue(event.data.RECOMMENDED_DECISION);
  //     this.registerationForm.controls.MainNo.setValue(event.data.MAIN_NO);
  //     this.registerationForm.controls.SectionNo.setValue(event.data.SECTION_NO);
  //     this.registerationForm.controls.SampleNo.setValue(event.data.SAMPLE_NO);
  //     this.registerationForm.controls.LaneType.setValue(event.data.LANE);
  //     this.registerationForm.controls.MDCost.setValue(event.data.MD_COST);
  //     this.registerationForm.controls.MDLevel.setValue(event.data.MD_LEVEL);
  //     this.registerationForm.controls.MDArea.setValue(event.data.MD_AREA);
  //     this.registerationForm.controls.UnitPrice.setValue(event.data.UNIT_PRICE);
  
  //     this.checkAdd=true;

  // }
  Close(userForm: NgForm) {
    this.checkAdd = false;
    userForm.resetForm();

  }

  openForm(event){
    this.dialog.open(WosettlmentFormComponent,{
      data:{
        editedrow:event
      },
      width:'50rem'
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Start First ROW

  contractStartDate:string
  contractEndDate:string

  ///////////////////////////////////////////////////////////
  // Contractor Dropdown list
  contractorsdropdownList = [];
  maintenancedecisionList = [];
  contractorsselectedItems = [];
  contractorsdropdownSettings = {};

  ////////////////////////////////////////////////////////
  // Contract Dropdown list
  contractsdropdownList = [];
  contractsselectedItems = [];
  contractsdropdownSettings = {};

  getAllContractors() {
    this.workordersettlementService.getAllContractors().subscribe((res) => {
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

  onContractorDeSelection(){
    this.contractsdropdownList = [];
    this.contractsselectedItems = [];


    this.WOsource =  new LocalDataSource();
  }


  onContractDeSelection(){


    this.WOsource =  new LocalDataSource();
  }
  getContractByContractor(contractor_id) {
    this.workordersettlementService
      .getContractByContractor(contractor_id)
      .subscribe((res) => {
        this.contractsdropdownList = res;
      });
  }
  getWorkOrdersByContract(contract_id) {
    this.workordersettlementService
      .getWorkOrdersByContract(contract_id)
      .subscribe((res) => {
        console.log(res);

      this.wodropdownList= res;
      });
  }
  getWorkOrderdetailsByWOId(wo_id) {
    this.workordersettlementService
      .getWorkOrderDetailsByWOId(wo_id)
      .subscribe((res) => {
        console.log(res);
        this.WOsource.load(res)  ;
      });
  }
  onContractSelection(event) 
  {
    console.log(event);
    
    this.getWorkOrdersByContract(event.CONTRACT_ID)
   ;
  }
  onWOSelection(event) 
  {
    console.log(event);
    
    this.getWorkOrderdetailsByWOId(event.WO_ID);
  }
  WOsettings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
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
      edit: true,
      select: true,
    },
    columns: {
      RECOMMENDED_DECISION: {
        title: "Expected Maintenance Decision",
        type: 'html',
  
        editor: {
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          component: MaintenanceDecisionDDL,
         },
      },
      MAIN_NO:{
        title: "Main No",
        type: "string",
        editable: false,
      },
      SAMPLE_NO:{
     title: "Sample No",
    type: "number",
    editable: false,
      },
      SECTION_NO: {
        title: "Section Number",
        type: "string",
        editable: false,
      },
      LANE: {
        title: "Lane Type",
        type: "string",
        editable: false,
      },

      MD_AREA: {
        title: "Maintenance Area",
        type: "number",
      },
      MD_COST: {
        title: "MD Cost",
        type: "number",
      },
      MD_LEVEL: {
        title: "MD Cost",
        type: "number",
      },
      UNIT_PRICE:{
        title: "Unit Price",
        type: "number",
      },
 
    },
  };

  user: string = localStorage.getItem("username");

  confirmConfig: ConfirmConfig = {
    title: `${this.user}`,
    titleSize: 28,
    message: 'Are you sure you want to delete?!',
    messageSize: 16,
    matIcon: 'edit',
    iconAnimation: 'shake',
    iconColor: '#277DA1',
    buttons: [],
    disableClose: false,
    autoFocus: true,
    restoreFocus: false,
    width: undefined
  }

  buttonArr: Array<ConfirmButtonConfig> = [{
    id: 'default',
    text: 'Confirm',
    color: 'accent',
    type: "stroked",
    icon: ''
  },
  {
    id: 'cancel',
    text: 'Cancel',
    color: 'primary',
    type: "stroked",
    icon: ''
  }]



}
function newEventEmitter<T>() {
  throw new Error('Function not implemented.');
}

