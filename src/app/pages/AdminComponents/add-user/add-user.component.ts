import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { TranslateService } from '@ngx-translate/core';

import { InsertionService } from '../../Services/insertion.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {









  settings1 = {

    add: {
      // addButtonContent: '<i class="nb-plus"></i>',
      // createButtonContent: '<i class="nb-checkmark"></i>',
      // cancelButtonContent: '<i class="nb-close"></i>',
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

    actions: {
      add: false,
      position: "left",
    },


    columns: {
      USER_ID: {
        // title: 'الرقم التعريفي',
        title: this.translate.instant('add-user.user_id'),
        type: 'number',
      },
      USERNAME: {
        // title: 'اسم المستخدم',
        title: this.translate.instant('add-user.username'),

        type: 'string',
      },
      ENTRY_DATE: {
        // title: 'تاريخ الدخول',
        title: this.translate.instant('add-user.ENTRY_DATE'),

        type: 'string',
      },
      ROLE: {
        // title: 'الصلاحية ',
        title: this.translate.instant('add-user.ROLE_ID'),

        type: 'string',
      },


    },
  };

  source1: LocalDataSource = new LocalDataSource();
  constructor(private translate: TranslateService, private service: SmartTableData, private insertionservice: InsertionService, private fb: FormBuilder) {
    /* const data = this.service.getData();
     this.source.load(data);*/
    translate.setDefaultLang('en');
    translate.use('en');
    this.insertionservice.showAllUsers().subscribe((response) => {
      this.usersArray = response;
      console.log(this.usersArray);
      console.log(response);
      console.log('heloooooooooooooooooooo');

      const data = this.usersArray;
      this.source1.load(data);
    });

  }



  myRolesArray: any = [];
  selectedRoleId: any = '';
  MySelectedRoleId: any;
  userId: any;
  roleid: any;
  roleids: any;
  UserRow: any;
  messageSuccess: boolean = false;
  deletedMessage: boolean = false;
  usersArray: any = [];
  rolename: any;

  rolearray: any = new Array();
  passedObjectToThird: object = {};
  mydate: any = moment();

  registerationForm: FormGroup = new FormGroup({
    USERNAME: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    PASSWORD: new FormControl(null, [Validators.required,]),
    // PASSWORD:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z]{2,40}$/)]),
    // ENTRY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
    ENTRY_DATE: new FormControl(null, [Validators.required]),
    ROLE_ID: new FormControl(null, [Validators.required]),
  });


  SubmitRegisteration(forminfo: FormGroup) {
    console.log(forminfo.value);
    console.log(forminfo.value.ENTRY_DATE);
    const date = moment(forminfo.value.ENTRY_DATE);
    let formate = date.format('DD-MM-YYYY');
    console.log(formate);
    forminfo.value.ENTRY_DATE = formate;
    console.log(forminfo.value.ENTRY_DATE);
    this.insertionservice.AddUserData(forminfo.value).subscribe((re) => {
      console.log(re);

      this.insertionservice.showAllUsers().subscribe((response) => {
        this.usersArray = response;
        console.log(this.usersArray);
        console.log(response);

        const data = this.usersArray;
        this.source1.load(data);


        //console.log('heloooooooooooooooooooo');
      });
      this.insertionservice.userids.subscribe(() => {
        // location.reload();
        console.log(this.insertionservice.roleids.getValue());
        console.log(this.insertionservice.userids.getValue());
        this.roleids = this.insertionservice.roleids.getValue();
        /*  this.insertionservice.AddingSecUserRoles({ "ROLEID":this.roleids ,"USER_ID": this.insertionservice.userids.getValue()}).subscribe((data)=>{
            console.log(data);
            console.log(this.MySelectedRoleId.getValue());
            console.log(this.MySelectedRoleId.getValue());
           });*/
        /*  for(let i=0;i<this.selectedItems.length;i++)
          {
           this.passedObjectToThird={
             "ROLEID":this.selectedItems[i].ROLEID,
             "USER_ID":this.userId
           }
           this.rolearray.push(this.passedObjectToThird);
          }
         console.log(this.passedObjectToThird);
         console.log(this.rolearray); //will pass this  to the third Relation 
         this.insertionservice.insertSecUserRoles2(this.rolearray).subscribe((response)=>{
           console.log(response);
        });
        */
        forminfo.reset();

      })
    });

    //  this.messageSuccess="Welcome Sir";

    this.messageSuccess = true;
    this.deletedMessage = false;

    this.insertionservice.refresh.next(1);
    // to Empty The Form Values After Subbetion
    // location.reload();
    console.log(this.form.value);
    console.log(this.selectedItems);
    console.log(this.userId);

    /* for(let i=0;i<this.selectedItems.length;i++)
     {
      this.passedObjectToThird={
        "ROLEID":this.selectedItems[i].ROLEID,
        "USER_ID":this.userId
      }
      this.rolearray.push(this.passedObjectToThird);
     }

   
    console.log(this.passedObjectToThird);
    console.log(this.rolearray); //will pass this  to the third Relation */

    /*   this.insertionservice.insertSecUserRoles2(this.rolearray).subscribe((response)=>{
          console.log(response);
       });*/


    // forminfo.reset(); 



    // location.reload();
  }

  DeleteUser(userId: any) {
    this.insertionservice.DeleteUser(userId).subscribe((data) => {
      console.log(data);
      console.log(userId);
    });

    this.insertionservice.showAllUsers().subscribe((response) => {
      this.usersArray = response;
      console.log(this.usersArray);
      console.log(response);
      console.log('heloooooooooooooooooooo');
    });

    /* this.insertionservice.DeleteSec_UserRoles(userId).subscribe((response)=>{
         console.log(response);
         console.log(userId);
     });*/

    this.insertionservice.showAllUsers().subscribe((response) => {
      this.usersArray = response;
      console.log(this.usersArray);
      console.log(response);
      //console.log('heloooooooooooooooooooo');
      this.deletedMessage = true;
      this.messageSuccess = false;
    });

    // location.reload();
    this.messageSuccess = false;

  }

  get() {

    this.insertionservice.showAllUsers().subscribe((response) => {
      this.usersArray = response;
      console.log(this.usersArray);
      console.log(response);
      console.log('heloooooooooooooooooooo');
    });

  }

  getallRoles(e) {
    /*  this.insertionservice.showdatroles().subscribe((allRoles)=>{
      this.myRolesArray=allRoles;*/ //15/2


    this.MySelectedRoleId = e.target.value;
    console.log(this.myRolesArray);
    this.insertionservice.roleids.next(e.target.value);
    console.log(this.insertionservice.roleids.getValue());
    //  });


    this.insertionservice.getuserId().subscribe((useridfrombackend) => {
      this.userId = useridfrombackend;
      console.log(useridfrombackend);
      this.insertionservice.userids.next(useridfrombackend);
      // console.log( this.userId.getValue());
      console.log(this.insertionservice.userids.getValue());
      console.log(this.userId);
      console.log(this.MySelectedRoleId);

      this.insertionservice.GetByRoleId(this.MySelectedRoleId).subscribe((rol) => {
        console.log(rol[0].ROLE);
        this.rolename = rol[0].ROLE;
      });

    });
  }


  rolesarray: any;
  dropdownList = [];
  selectedItems = [];
  // dropdownSettings:IDropdownSettings;
  form: any;
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  //rolearray:any = new Array(); 
  //  passedObjectToThird:object={};
  i: number = 0;
  handlebuttonclick() ///////////////////////////////
  {
    console.log(this.form.value);
    console.log(this.selectedItems);

    /* for(let i=0;i<this.selectedItems.length;i++)
     {
      this.passedObjectToThird={
        "ROLEID":this.selectedItems[i].ROLEID,
        "USER_ID":this.userId
      }
      this.rolearray.push(this.passedObjectToThird);
     }
          console.log(this.passedObjectToThird);
          console.log(this.rolearray);*/
    /* for(let i=0;i<this.selectedItems.length;i++)
     {
       this.rolearray.push(this.selectedItems[i].ROLEID);
     }
   
       console.log("ROLEID:"+this.rolearray);  */
    console.log(this.selectedItems);
    this.insertionservice.movedSelectedItems.next(this.selectedItems);
    console.log(this.insertionservice.movedSelectedItems.getValue());
  }


  moveSelectedItemsToService() {
    console.log(this.selectedItems);
    this.insertionservice.movedSelectedItems.next(this.selectedItems);
    console.log(this.insertionservice.movedSelectedItems.getValue());
  }


  //usersArray:any=[];

  ngOnInit(): void {
    console.log(this.selectedItems);
    console.log(moment.locale('fr'));
    const date = moment();
    let formate = date.format('YYYY.M.D');
    console.log(formate);
    this.insertionservice.getallroles().subscribe((all) => {
      this.rolesarray = all;
      console.log(this.rolesarray);
    });
    this.insertionservice.refresh.subscribe(() => {
      this.insertionservice.showAllUsers().subscribe((response) => {
        this.usersArray = response;
        console.log(this.usersArray);
        console.log(response);
        console.log('heloooooooooooooooooooo');
      });
    });




    /*this.selectedItems = [
   
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ROLEID',
      textField: 'ROLE',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  
  this.form=this.fb.group({
    roles:['']
  })*/

    this.insertionservice.showdatroles().subscribe((allRoles) => {
      this.myRolesArray = allRoles;
    });

  }








  onEditConfirm(event): void {
    console.log(event);
    var data = {
      "USER_ID": event.newData.USER_ID,
      "USERNAME": event.newData.USERNAME,
      "ENTRY_DATE": event.newData.ENTRY_DATE,
      "ROLE": event.newData.ROLE,
      "ROLE_ID": event.newData.ROLE_ID
    };
    console.log("UPDATE user");
    console.log(data);
    event.confirm.resolve(event.newData);
    this.insertionservice.Updateuser(event.data.USER_ID, data).subscribe((e) => {
      console.log(e);
    });
    //this.alertService.info('تم التعديل بنجاح');
  }







  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {

      this.insertionservice.DeleteUser(event.data.USER_ID).subscribe((data) => {
        console.log(data);
        console.log(event.data.USER_ID);
      });
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }

  }

}
