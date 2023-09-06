import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkOrdersSettlementService } from '../../Services/work-orders-settlement.service';
import { startWith } from 'rxjs-compat/operator/startWith';
import { Observable, defer, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ngx-wosettlment-form',
  templateUrl: './wosettlment-form.component.html',
  styleUrls: ['./wosettlment-form.component.scss']
})
export class WosettlmentFormComponent implements OnInit {

  checkAdd: boolean=false;
  clickupsdatedataformbufrombutton: any;
  mdId:number;
  mddropdownList: [];
  mdselectedItems: [];
  mddropdownSettings: {};
  MDList: any;
  recommendedDecisionPlaceHolder: string;
  mDCost: number;


  constructor(@Inject(MAT_DIALOG_DATA) public data,private workordersettlementService: WorkOrdersSettlementService,) { }

  ngOnInit(): void {

    // this.registerationForm.valueChanges.subscribe(values => {
    //   if (values.MaintenanceLength.touched || values.Maintenancewidth.touched || values.UnitPrice.touched) {
    //     this.registerationForm.controls.MDCost.setValue ({
    //       MDCost: values.Maintenancewidth.value*values.MaintenanceLength.value*values.UnitPrice.value,
    //     });
    //   }
    // });

    this.workordersettlementService.getAllMaintenanceDecisions().subscribe(data => {
      console.log(data);

      this.MDList=data;
     });
     this.mddropdownList = [];
     this.mdselectedItems = [];
     this.mddropdownSettings = {
       singleSelection: true,
       text:`${this.recommendedDecisionPlaceHolder}`,
       idField: "RECOMMENDED_DECISION_ID",
       textField: "RECOMMENDED_DECISION",
       selectAllText: "Select All",
       unSelectAllText: "UnSelect All",
       itemsShowLimit: 3,
       allowSearchFilter: true,
       closeDropDownOnSelection: true,
     };





    console.log(this.data)
    console.log(this.data.editedrow.data.RECOMMENDED_DECISION)
    
    this.mDCost =this.data.editedrow.data.MD_COST;
    this.recommendedDecisionPlaceHolder =this.data.editedrow.data.RECOMMENDED_DECISION;
    this.registerationForm.controls.MaintenanceDecision.setValue(this.data.editedrow.data.RECOMMENDED_DECISION);
    this.registerationForm.controls.MainNo.setValue(this.data.editedrow.data.MAIN_NO);
    this.registerationForm.controls.SectionNo.setValue(this.data.editedrow.data.SECTION_NO);
    this.registerationForm.controls.SampleNo.setValue(this.data.editedrow.data.SAMPLE_NO);
    this.registerationForm.controls.LaneType.setValue(this.data.editedrow.data.LANE);
    this.registerationForm.controls.MDCost.setValue(this.data.editedrow.data.MD_COST);
    this.registerationForm.controls.MDLevel.setValue(this.data.editedrow.data.MD_LEVEL);
    this.registerationForm.controls.MDArea.setValue(this.data.editedrow.data.MD_AREA);
    this.registerationForm.controls.UnitPrice.setValue(this.data.editedrow.data.UNIT_PRICE);

    this.checkAdd=true;
  }
  onMDSelection(event) 
  {
    for(let item of this.MDList){
      if(item.RECOMMENDED_DECISION_ID==event.RECOMMENDED_DECISION_ID)
      {
        this.registerationForm.controls.UnitPrice.setValue(item.UNIT_PRICE);
        this.registerationForm.controls.MDCost.setValue(item.UNIT_PRICE*this.registerationForm.controls.MaintenanceLength.value*this.registerationForm.controls.Maintenancewidth.value);

      }
    }
    console.log(event);
  this.mdId =event.RECOMMENDED_DECISION_ID;
  
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
   
    console.log(this.clickupsdatedataformbufrombutton);

    this.WOSettlement = {
      "ORDER_ID": +this.data.editedrow.data.WO_ID,
      "MAIN_NO": this.clickupsdatedataformbufrombutton['MainNo'],
      "SECTION_NO": this.clickupsdatedataformbufrombutton['SectionNo'],
      "LANE": this.clickupsdatedataformbufrombutton['LaneType'],
      "SAMPLE_NO": +this.clickupsdatedataformbufrombutton['SampleNo'],
      "MD": +this.mdId,
      "MD_LENGTH": +this.clickupsdatedataformbufrombutton['MaintenanceLength'],
      "MD_WIDTH": +this.clickupsdatedataformbufrombutton['Maintenancewidth'],
      "UNIT_COST": +this.clickupsdatedataformbufrombutton['UnitPrice'],
      "MD_COST": +this.clickupsdatedataformbufrombutton['Maintenancewidth'] *+this.clickupsdatedataformbufrombutton['MaintenanceLength']*+this.clickupsdatedataformbufrombutton['UnitPrice'],
    }
    console.log(this.WOSettlement);

    

this.workordersettlementService.AddWOSettlement(this.WOSettlement).
subscribe((res) => {console.log(res);});


    forminfo.reset();
 
  }
  Close(userForm: NgForm) {
    this.checkAdd = false;
    userForm.resetForm();

  }

}
// function concatWith(valueChanges: Observable<any>): import("rxjs").OperatorFunction<any, any> {
//   throw new Error('Function not implemented.');
// }

// this.registerationForm.controls.MDCost.setValue(defer(() => of(this.registerationForm.value)).pipe(concatWith(this.registerationForm.valueChanges),
// map(value => value.MaintenanceLength*value.Maintenancewidth*value.UnitPrice)
// ));