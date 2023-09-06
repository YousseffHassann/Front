import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertionService } from '../../Services/insertion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import * as moment  from 'moment';
import 'moment/locale/pt-br'
@Component({
  selector: 'ngx-updating-user',
  templateUrl: './updating-user.component.html',
  styleUrls: ['./updating-user.component.scss']
})
export class UpdatingUserComponent implements OnInit {
userid:any;
userdata:any;

mess:any;






myRolesArray:any=[];
selectedRoleId:any='';
MySelectedRoleId:any;
userId:any;
roleid:any;
roleids:any;
UserRow:any;
messageSuccess:string='';
usersArray:any=[];
mydate:any=moment();

rolename:any;

nameofrole:any;


rolearray:any = new Array(); 
passedObjectToThird:object={};
      dropdownList = [];
      selectedItems = [];
      dropdownSettings:IDropdownSettings;
      form:any;



  constructor(private insertionservice:InsertionService,private activatedroute:ActivatedRoute,private router:Router,private fb: FormBuilder) { 
    this.userid=activatedroute.snapshot.params['userid'];
    
  }

        

  registerationForm:FormGroup=new FormGroup({
    USERNAME:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
   //15/2 PASSWORD:new FormControl(null,[Validators.required,]),
    //Validators.pattern(/^[A-Z][a-z]{2,40}$/)
    //ENTRY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
    ENTRY_DATE:new FormControl(null,[],),
    ROLE_ID:new FormControl(null,[Validators.required]),
      });

      getallRoles(e)
      {
         /* this.insertionservice.showdatroles().subscribe((allRoles)=>{
          this.myRolesArray=allRoles;*/


          this.MySelectedRoleId=e.target.value;
     
          console.log(this.myRolesArray);
          this.insertionservice.roleids.next(e.target.value);  
          console.log(this.insertionservice.roleids.getValue());
        //  });
           this.insertionservice.getuserId().subscribe((useridfrombackend)=>{
           this.userId=useridfrombackend;
           console.log(useridfrombackend);
           this.insertionservice.userids.next(useridfrombackend);

          // console.log( this.userId.getValue());
           console.log(this.insertionservice.userids.getValue());   
           console.log( this.userId);
           console.log(this.MySelectedRoleId);
           this.insertionservice.GetByRoleId(this.MySelectedRoleId).subscribe((rol)=>{
            console.log(rol[0]. ROLE);
            this.rolename=rol[0].ROLE;
                       });
         });
      }

      UpdateUser(userid,forminfo:FormGroup)
      {
        
//this can deleted 
      console.log(forminfo.value);
      
      
       const date=moment(forminfo.value.ENTRY_DATE);
       let formate=date.format('MM-DD-YYYY');
       console.log(formate);
       forminfo.value.ENTRY_DATE=formate;
       console.log(forminfo.value.ENTRY_DATE);



         this.insertionservice.Updateuser(userid,forminfo.value).subscribe((response)=>{
          console.log(response);
          this.router.navigate(['/pages/adduser']);
         });
         //this.router.navigate(['/pages/adduser']);
      }   

      GetUserByUserId()
      {





        this.insertionservice.GetUsrByUserId(this.userid).subscribe((response)=>{
             console.log(response);
             console.log(response[0].USERNAME );
         

//this can deleted 
console.log(response[0]);
console.log(response[0].ENTRY_DATE);
 const date=moment(response[0].ENTRY_DATE);
 let formate=date.format('DD-MM-YYYY');
 console.log(formate);
 response[0].ENTRY_DATE=formate;
 console.log(response[0].ENTRY_DATE);





             this.userdata=response;
          this. nameofrole=  response[0].ROLE_ID
          console.log(this.nameofrole);

          this.insertionservice.GetByRoleId(this.nameofrole).subscribe((rol)=>{
            console.log(rol[0]. ROLE);
            this.rolename=rol[0].ROLE;
                       });
         //    this. userdata[0].ENTRY_DATE=moment(this. userdata[0].ENTRY_DATE );
           
            // console.log((this. userdata[0].ENTRY_DATE).format("DD/MM/YYYY")); 
            // console.log(this. userdata[0].ENTRY_DATE.format("yyyy-MM-dd"));
          //  this.mess=(this. userdata[0].ENTRY_DATE).format("DD/MM/YYYY");
           //  console.log(this.userdata);
             this.registerationForm.controls.USERNAME.setValue(
             this. userdata[0].USERNAME);

           /*15/2  this.registerationForm.controls.PASSWORD.setValue(
              this. userdata[0].PASSWORD);*/

              this.registerationForm.controls.ROLE_ID.setValue(
                this. userdata[0].ROLE_ID);
             this.registerationForm.controls.ENTRY_DATE.setValue(
            // ( this. userdata[0].ENTRY_DATE.format("YYYY/MM/DD ")));
             (  response[0].ENTRY_DATE))
              console.log("this is getfunction");
              //this.registerationForm.get("ROLE")?.setValue(this.roledata[0].ROLE)
        });
      
      }

  rolesarray:any;
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
movedObject:object={};
  ngOnInit(): void {
    console.log(this.insertionservice.movedSelectedItems.getValue());
    this.movedObject=  this.insertionservice.movedSelectedItems.getValue();
    console.log(this.movedObject);

    console.log(this.userid);
   this. GetUserByUserId()

   this.insertionservice.getallroles().subscribe((all)=>{
    this.rolesarray=all;
    console.log(this.rolesarray);
  })

  this.selectedItems = [
   // {ROLEID: '3', ROLE: 'Manager'}
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
 });
 

this.insertionservice.GetAllRolesByUserId(this.userid).subscribe((resp)=>{
console.log(resp);
this.selectedItems=resp
})


this.insertionservice.showdatroles().subscribe((allRoles)=>{
  this.myRolesArray=allRoles;
});

  }

}