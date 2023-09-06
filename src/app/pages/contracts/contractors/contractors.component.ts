import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Contractor } from '../../../Models/contractor.model';
import { ContractorsDBService } from '../../Services/contractors-db.service';


@Component({
  selector: 'ngx-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss']
})
export class ContractorsComponent implements OnInit {

  ContractorMP = new Map();

  @ViewChild('table') table: Ng2SmartTableComponent;

  settings = {
    mode: "external",
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
      CONTRACTOR_ID: {
        title: 'ID',
        type: 'number',
      },
      CONTRACTOR_NAME: {
        title: 'Name',
        type: 'string',
      },
      DESCRIPTION: {
        title: 'Description',
        type: 'string',
      },
      MOBILE: {
        title: 'Mobile',
        type: 'string',
      },
      CONTRACTOR_NO: {
        title: 'Number',
        type: 'number',
      },
      FAX: {
        title: 'Fax',
        type: 'string',
      },
      PHONE: {
        title: 'Phone',
        type: 'string',
      },
      EMAIL: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  tmpobj: Contractor = {
    CONTRACTOR_NAME: '',
    DESCRIPTION: '',
    MOBILE: '',
    CONTRACTOR_NO: {} as number,
    FAX: '',
    PHONE: '',
    EMAIL: '',
    CONTRACTOR_ID: {} as number
  };

  selectedMode: boolean = true;

  source: LocalDataSource = new LocalDataSource();

  selections: any[];
  alreadyselected: any[] = [];
  domSanitizer: any;
  ALLDATA: any;

  constructor(private db: ContractorsDBService, private e: ElementRef) { }
  // // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // ngAfterViewInit() {
  //   /* You can call this with a timeOut because if you don't you'll only see one checkbox... the other checkboxes take some time to render and appear, which is why we wait for it */
  //   setTimeout(() => {
  //     this.disableCheckboxes();
  //   }, 1500);
  // }

  // disableCheckboxes() {
  //   var checkbox = this.e.nativeElement.querySelectorAll('input[type=checkbox]');
  //   console.log(checkbox);
  //   checkbox.forEach((element, index) => {
  //     if (index >0 && this.ALLDATA[index-1].checked == true) {
  //       checkbox[index].checked=true;
  //       this.alreadyselected.push(this.ALLDATA[index-1]);
  //     }
  //   });
  // }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownselectedzones = [];

  ngOnInit(): void {
    console.log(this.source);
    this.getallcontractors();
    this.getzones();
    this.selections = [];

    this.dropdownList = [

    ];

    this.selectedItems = [

    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'MUNIC_ID',
      textField: 'MUNIC_NAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    }
  }

  onDDItemSelect(item: any) {
    console.log(item);
    var y: number = +item.MUNIC_ID;
    this.dropdownselectedzones.push(y);
    console.log(this.dropdownselectedzones);
  }
  onDDSelectAll(items: any) {
    console.log(items);
    this.dropdownselectedzones = [];
    this.dropdownList.forEach(element => {
      var y: number = +element.MUNIC_ID;
      this.dropdownselectedzones.push(y);
    });
    console.log(this.dropdownselectedzones);
  }

  onDDItemDeSelect(item: any) {
    console.log(item);
    var x = +item.MUNIC_ID;
    var idx = this.dropdownselectedzones.indexOf(x);
    this.dropdownselectedzones.splice(idx, 1);
    console.log(this.dropdownselectedzones);
  }

  onDDdeSelectAll(items: any) {
    console.log(items);
    this.dropdownselectedzones = [];
    console.log(this.dropdownselectedzones);
  }

  getallcontractors() {
    this.db.getallcont().subscribe((res) => {
      this.source.load(res);
      this.ALLDATA = res;
      this.ALLDATA.forEach(element => {
        this.ContractorMP.set(+element.CONTRACTOR_ID, { CONTRACTOR_ID: element.CONTRACTOR_ID, CONTRACTOR_NAME: element.CONTRACTOR_NAME })
      });
      console.log(this.ContractorMP)
    });
  }

  DeleteCont(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.db.deletecont(event.data.CONTRACTOR_ID).
        subscribe((res) => {
          console.log(res);
          this.getallcontractors();
        });
    } else {
      event.confirm.reject();
    }
  }

  UpdateCont(form: NgForm) {
    console.log(this.contToAdd);
    this.db.updatecont(this.contToAdd).
      subscribe((res) => {
        console.log(this.dropdownselectedzones)
        console.log(this.contToAdd.CONTRACTOR_ID)
        this.db.updatecontzones(this.dropdownselectedzones, this.contToAdd.CONTRACTOR_ID).
          subscribe((res) => { console.log(res) });
        this.getallcontractors();
        this.selectedItems = [];
        this.celarForm(form);
        this.dropdownselectedzones = [];
      });
  }

  // AddCont(event){
  //   this.tmpobj=event.newData;
  //   this.tmpobj.checked=false;
  //   this.db.addcont(this.tmpobj).
  //   subscribe((res)=>{
  //     console.log(res);
  //     this.getallcontractors();
  //   });
  // }

  returnChecked() {
    console.log(this.selections);
    var ARR = this.selections.concat(this.alreadyselected);
    this.db.checkoutconts(ARR).
      subscribe((res) => {
        console.log(res);
        window.alert("Check Out Completed")
        this.getallcontractors();
        location.reload();
      });
  }

  onUserRowSelect(event) {
    console.log(event);
    console.log(this.alreadyselected);
    this.selections = event.selected;
  }

  contToAdd: Contractor = {
    CONTRACTOR_NAME: '',
    DESCRIPTION: '',
    MOBILE: '',
    CONTRACTOR_NO: null,
    FAX: '',
    PHONE: '',
    EMAIL: '',
    CONTRACTOR_ID: 0
  };

  celarForm(form: NgForm) {
    // this.contToAdd={
    //   CONTRACTOR_NAME:'',
    //   DESCRIPTION:'',
    //   MOBILE:'',
    //   CONTRACTOR_NO:0,
    //   FAX:'',
    //   PHONE:'',
    //   EMAIL:'',
    //   CONTRACTOR_ID:0
    // };
    form.reset();
    this.selectedItems = [];
    this.dropdownselectedzones = [];
    console.log(this.contToAdd)
  }

  addContractor(form: NgForm) {
    console.log(this.contToAdd);
    console.log("*******************************")
    console.log(this.dropdownselectedzones);
    //this.contToAdd.checked=false;
    console.log(this.contToAdd);
    this.db.addcont(this.contToAdd).
      subscribe((res) => {
        console.log(res);
        this.db.addcontzones(this.dropdownselectedzones).
          subscribe((res) => {
            console.log(res);
            this.selectedItems = []
          });
        this.getallcontractors();
        this.celarForm(form);
        this.dropdownselectedzones = [];
      });
  }

  onSubmit(forminfo: FormGroup, form: NgForm) {
    console.log(forminfo)
    console.log(this.contToAdd);
    this.db.findifcontexists(this.contToAdd.CONTRACTOR_ID).
      subscribe((res) => {
        console.log(res)
        if (res === false) {
          console.log("ADD");
          this.addContractor(form)
        }
        else {
          console.log("UPDATE");
          this.UpdateCont(form)
        }
      });
  }

  getzones() {
    this.db.getzones().
      subscribe((res) => {
        console.log(res)
        this.dropdownList = res;
      });
  }

  refillform(event) {
    console.log(event);
    var ID: number = +event.data.CONTRACTOR_ID;
    console.log(ID);
    this.db.getcontzones(ID).
      subscribe((res) => {
        console.log(res);
        this.selectedItems = res;
        res.forEach(element => {
          this.dropdownselectedzones.push(+element.MUNIC_ID)
        });
      });
    this.contToAdd.CONTRACTOR_NAME = event.data.CONTRACTOR_NAME;
    this.contToAdd.DESCRIPTION = event.data.DESCRIPTION;
    this.contToAdd.EMAIL = event.data.EMAIL;
    this.contToAdd.FAX = event.data.FAX;
    this.contToAdd.MOBILE = event.data.MOBILE;
    this.contToAdd.PHONE = event.data.PHONE;
    this.contToAdd.CONTRACTOR_NO = +event.data.CONTRACTOR_NO;
    this.contToAdd.CONTRACTOR_ID = ID;
    this.getallcontractors();
  }


  registerationForm: FormGroup = new FormGroup({
    contractorname: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    contractordesc: new FormControl(null, [Validators.required]),
    contractoremail: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    contractornumber: new FormControl(null, [Validators.required]),
    contractormobile: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    contractorfax: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    contractorphone: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    zones: new FormControl(),
  });

}
