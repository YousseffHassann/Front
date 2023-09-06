import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Contract } from '../../../Models/contract.model';
import { ContractsFormDbService } from '../../../Services/contracts-form-db.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ContractorsDBService } from '../../Services/contractors-db.service';

@Component({
  selector: 'ngx-contracts-form',
  templateUrl: './contracts-form.component.html',
  styleUrls: ['./contracts-form.component.scss']
})
export class ContractsFormComponent implements OnInit {

  MunicMP = new Map();
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode:"external",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
    //selectMode: 'multi',
    actions: {
      // custom: [
      //   {
      //     name: 'Button',
      //     title: '... ',
      //   }
      // ],
      delete: true,
      add: false,
      edit: true,
      //select: true,
    },
    columns: {
      CONTRACT_ID: {
        title: 'Contract ID',
        type: 'number',
      },
      CONTRACT_NAME: {
        title: 'Contract Name',
        type: 'string',
      },
      CONTRACTOR_ID: {
        title: 'Contractor ID',
        type: 'number',
      },
      CONTRACT_DATE: {
        title: 'Contract Date',
        type: 'Date',
      },
      CONTRACT_NO: {
        title: 'Contract Number',
        type: 'string',
      },
      CONT_AMOUNT: {
        title: 'Contract Amount',
        type: 'number',
      },
      CONT_DESCR: {
        title: 'Descrition',
        type: 'string',
      },
      START_DATE: {
        title: 'Start Date',
        type: 'Date',
      },
      END_DATE: {
        title: 'End Date',
        type: 'Date',
      },
      MUNICIPALITY_ID:{
        title: 'Municipality ID',
        type: 'number',
      },
    },
  };

  contractToAdd:Contract={
    //CONTRACTOR_NAME:'',
    CONTRACT_NAME:'',
    CONT_DESCR:'',
    START_DATE:{} as Date,
    END_DATE:{} as Date,
    CONT_AMOUNT:null,
    CONTRACT_NO:'',
    CONTRACT_DATE:{} as Date,
    CONTRACTOR_ID:{} as number,
    CONTRACT_ID:0,
    MUNICIPALITY_ID:0
  };

  constructor(private DB:ContractsFormDbService,private contractordb:ContractorsDBService,private datePipe: DatePipe){}


  ////////////////////////////////////////
  municdropdownList = [];
  municselectedItems = [];
  municdropdownSettings = {};
  municdropdownselectedzones:number;
  ////////////////////////////////////////
  contdropdownList = [];
  contselectedItems = [];
  contdropdownSettings = {};
  contdropdownselected:number;
  ////////////////////////////////////////

  ngOnInit(): void {
    this.getallcontracts()
    this.getallmunic()

    this.municdropdownselectedzones=0;
    this.municdropdownList = [];
    this.municselectedItems = [];
    this.municdropdownSettings={
      singleSelection: true,
      idField: 'MUNIC_ID',
      textField: 'MUNIC_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    }

    ////////////////////////////////////
    this.contdropdownselected=0;
    this.contdropdownList = [];
    this.contselectedItems = [];
    this.contdropdownSettings={
      singleSelection: true,
      idField: 'CONTRACTOR_ID',
      textField: 'CONTRACTOR_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    }
    // console.log(this.municselectedItems);
    // console.log(this.contselectedItems);
  }

  getallcontracts(){
    this.DB.getallcontracts().
    subscribe((res)=>{
      console.log(res)
      this.source.load(res);
    });
  }

  addcontract(form: NgForm){
    this.contractToAdd.CONTRACTOR_ID=this.contdropdownselected;
    this.contractToAdd.MUNICIPALITY_ID=this.municdropdownselectedzones;
    console.log(this.contractToAdd)
    this.DB.addcontract(this.contractToAdd).
    subscribe((res)=>{
      console.log(res);
      this.getallcontracts();
      this.celarForm(form);
    });
  }

  deletecontract(event){
    if (window.confirm('Are you sure you want to delete?')) {
      var id=+event.data.CONTRACT_ID
      this.DB.deletecontract(id).
      subscribe((res)=>{
        console.log(res);
        this.getallcontracts();
      });
    }
  }

  updatecontract(form: NgForm){
    console.log(this.contractToAdd);
    console.log(this.municdropdownselectedzones);
    console.log(this.contdropdownselected);
    this.contractToAdd.CONTRACTOR_ID=this.contdropdownselected;
    this.contractToAdd.MUNICIPALITY_ID=this.municdropdownselectedzones;
    this.DB.updatecontract(this.contractToAdd.CONTRACT_ID,this.contractToAdd).
    subscribe((res)=>{
      console.log(res);
      this.celarForm(form);
      this.getallcontracts();
    });
  }

  onSubmit(forminfo: FormGroup,form: NgForm){
    console.log(forminfo)
    console.log(this.contractToAdd)
    this.DB.findifcontexists(this.contractToAdd.CONTRACT_ID).
    subscribe((res)=>{
      if(res==true){
        console.log("Update")
        this.updatecontract(form);
      }
      else{
        console.log("Add")
        this.addcontract(form);
      }
    });
  }

  celarForm(form: NgForm){
    // this.contractToAdd={
    //   //CONTRACTOR_NAME:'',
    //   CONTRACT_NAME:'',
    //   CONT_DESCR:'',
    //   START_DATE:{} as Date,
    //   END_DATE:{} as Date,
    //   CONT_AMOUNT:0,
    //   CONTRACT_NO:'',
    //   CONTRACT_DATE:{} as Date,
    //   CONTRACTOR_ID:{} as number,
    //   CONTRACT_ID:0,
    //   MUNICIPALITY_ID:0,
    // };
    form.reset();
    this.municselectedItems = [];
    this.contselectedItems = [];
    this.municdropdownselectedzones=0;
    this.contdropdownselected=0;
  }

  getallmunic(){
    this.contractordb.getzones().
    subscribe((res)=>{
      this.municdropdownList=res;
      this.municdropdownList.forEach(element => {
        this.MunicMP.set(+element.MUNIC_ID,[element])
      });
      console.log(this.MunicMP);
    });

  }

  onmunicDDItemSelect(item: any){
    console.log(item);
    var y: number = +item.MUNIC_ID;
    this.municdropdownselectedzones=y;
    console.log(this.municdropdownselectedzones);
    this.getcontractorsbymunic()
  }

  onmunicDDItemDeSelect(item:any){
    console.log(item);
    this.municdropdownselectedzones=0;
    console.log(this.municdropdownselectedzones);
    this.getcontractorsbymunic()
  }

  getcontractorsbymunic(){
    this.DB.getcontractorsinmunic(this.municdropdownselectedzones).
    subscribe((res)=>{
      console.log(res);
      this.contdropdownList=res;
    });
  }

  oncontDDItemSelect(item: any){
    console.log(item);
    var y: number = +item.CONTRACTOR_ID;
    this.contdropdownselected=y;
    console.log(this.contdropdownselected);
  }

  oncontDDItemDeSelect(item:any){
    console.log(item);
    this.contdropdownselected=0;
    console.log(this.contdropdownselected);
  }

  x:any;
  getcontractorbyid(id:number){
    this.DB.getcontractorbyid(id).
    subscribe((res)=>{
      this.contselectedItems=res;
      console.log(this.contselectedItems)
    })
  }

  refillform(event){
    console.log(event);
    this.contractToAdd.CONTRACT_ID=+event.data.CONTRACT_ID
    this.contractToAdd.CONTRACTOR_ID=+event.data.CONTRACTOR_ID
    this.contractToAdd.CONT_AMOUNT=+event.data.CONT_AMOUNT
    this.contractToAdd.MUNICIPALITY_ID=+event.data.MUNICIPALITY_ID
    this.contractToAdd.CONTRACT_NAME=event.data.CONTRACT_NAME
    this.contractToAdd.CONT_DESCR=event.data.CONT_DESCR
    this.contractToAdd.CONTRACT_NO=event.data.CONTRACT_NO
    ///////////////////////////////////////////
    const tmp=event.data.CONTRACT_DATE.slice(0,10)
    const tmp2=tmp.split('/')
    const a=tmp2[2]+'-'+tmp2[1]+'-'+tmp2[0]
    this.contractToAdd.CONTRACT_DATE=event.data.CONTRACT_DATE.replace(event.data.CONTRACT_DATE.slice(0,10),a).slice(0,10)

    ////////////////////////////////////////////
    const tmp3=event.data.START_DATE.slice(0,10)
    const tmp4=tmp3.split('/')
    const b=tmp4[2]+'-'+tmp4[1]+'-'+tmp4[0]
    this.contractToAdd.START_DATE=event.data.START_DATE.replace(event.data.START_DATE.slice(0,10),b).slice(0,10)

    ///////////////////////////////////////////
    const tmp5=event.data.END_DATE.slice(0,10)
    const tmp6=tmp5.split('/')
    const c=tmp6[2]+'-'+tmp6[1]+'-'+tmp6[0]
    this.contractToAdd.END_DATE=event.data.END_DATE.replace(event.data.END_DATE.slice(0,10),c).slice(0,10)

    this.getallcontracts();
    this.municselectedItems=this.MunicMP.get(+event.data.MUNICIPALITY_ID)
    this.municdropdownselectedzones=+event.data.MUNICIPALITY_ID
    this.contdropdownselected=+event.data.CONTRACTOR_ID
    this.getcontractorbyid(+event.data.CONTRACTOR_ID)
    console.log("*********************************")
    console.log(this.municselectedItems)
    console.log("*********************************")
    console.log(this.contdropdownselected)
    this.getcontractorsbymunic()
  }


  registerationForm: FormGroup = new FormGroup({
    contractname: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    contractdesc: new FormControl(null, [Validators.required]),
    contractnumber: new FormControl(null, [Validators.required]),
    contractamount: new FormControl(null, [Validators.required]),
    startdate: new FormControl(null, [Validators.required]),
    enddate: new FormControl(null, [Validators.required]),
    contractdate: new FormControl(null, [Validators.required]),
    zones: new FormControl(),
    contractor: new FormControl(),
  });

}
