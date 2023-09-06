import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { BehaviorSubject } from 'rxjs';
import { InsertionService } from '../../Services/insertion.service';

@Component({
  selector: 'ngx-sec-roles',
  templateUrl: './sec-roles.component.html',
  styleUrls: ['./sec-roles.component.scss']
})
export class SecRolesComponent implements OnInit {

constructor(private insertionservice:InsertionService) { }
messageSuccess:string='';
RoleRow:any;
clickSubmit=new BehaviorSubject(false);
//updateObject:object={ ROLE: 'Admin', EN_NAME: 'wetttttww', AR_NAME: 'wwww'};
updateObject:any;
myupdateId:any;

  registerationForm:FormGroup=new FormGroup({
    ROLE:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    EN_NAME:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    AR_NAME:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      });



      SubmitRegisteration(forminfo:FormGroup)
      {
       console.log(forminfo.value);
       this.insertionservice.SendData(forminfo.value).subscribe((response)=>{
       console.log(response);
      // this.updateObject=forminfo.value;
      this.insertionservice.showdatroles().subscribe((response)=>{
        this.rolesarray=response;
        console.log(this.rolesarray);
        console.log(response);
        console.log('heloooooooooooooooooooo');
     });
       });
       forminfo.reset();
       this.messageSuccess="Welcome Sir";

       this.insertionservice.showdatroles().subscribe((response)=>{
        this.rolesarray=response;
        console.log(this.rolesarray);
        console.log(response);
        console.log('clicked Submit');
        this.clickSubmit.next(true);
     });
   // location.reload();
      }
      DeleteRole(roleid:any)
      {
        this.insertionservice.DeleteRole(roleid).subscribe((myrow)=>{
          console.log(myrow);
          console.log(roleid);
          this.insertionservice.showdatroles().subscribe((response)=>{
            this.rolesarray=response;
            console.log(this.rolesarray);
            console.log(response);
            console.log('heloooooooooooooooooooo');
         });
        });
    

 
    
      //location.reload();
    
      }

/*UpdateRole(roleid:any,myobject:any)
{
   this.insertionservice.UpdateRole(roleid,myobject).subscribe((response)=>{
    console.log(response);
    console.log(myobject);
    console.log(roleid);
    console.log(document.getElementById("ROLE"));
 

   });
   var input1 = document.getElementById('ROLE')    as HTMLInputElement | null;
   var input3 = document.getElementById('ar_name') as HTMLInputElement | null;
   var input2 = document.getElementById('en_name') as HTMLInputElement | null;
 
var role=input1.value;
var en_name=input2.value;
var ar_name=input3.value;


this.updateObject= {
 "ROLE": role,
 "AR_NAME":ar_name,
 "EN_NAME": en_name
}


//this.updateObject={ROLE:role.toString(),EN_NAME:en_name.toString(),AR_NAME:ar_name.toString()}
     console.log(this.updateObject);
     console.log(input1.value); 
     console.log(input2.value); 
     console.log(input3.value); 

}*/



GetRoleByRoleId(roleid:any)
{
  this.insertionservice.GetByRoleId(roleid).subscribe((response)=>{
      console.log(response);
      console.log(response[0].AR_NAME);
     // this.updateObject=response;
   
    /*  this.RoleRow=response;
      this.registerationForm.controls.ROLE.setValue(
        response[0].ROLE);
        this.registerationForm.controls.AR_NAME.setValue(
          response[0].AR_NAME);
          this.registerationForm.controls.EN_NAME.setValue(
            response[0].EN_NAME);*/

        /*   this.myupdateId=roleid;
           var input1 = document.getElementById('ROLE')    as HTMLInputElement | null;
           var input3 = document.getElementById('ar_name') as HTMLInputElement | null;
           var input2 = document.getElementById('en_name') as HTMLInputElement | null;
         
       var role=input1.value;
       var en_name=input2.value;
       var ar_name=input3.value;
       
       
       this.updateObject= {
         "ROLE": role,
         "AR_NAME":ar_name,
         "EN_NAME": en_name
       }*/
       

    /*       var input1 = document.getElementById('ROLE')    as HTMLInputElement | null;
           var input3 = document.getElementById('ar_name') as HTMLInputElement | null;
           var input2 = document.getElementById('en_name') as HTMLInputElement | null;
         
       var role=input1.value;
       var en_name=input2.value;
       var ar_name=input3.value;
       
       
       this.updateObject= {
         "ROLE": role,
         "AR_NAME":ar_name,
         "EN_NAME": en_name
       }*/
       


/*this.clickSubmit.subscribe(()=>{
  console.log("clicksubmitlisten");
  console.log(this.clickSubmit.getValue())
if(this.clickSubmit.getValue()===true)
{
  console.log("clicksubmitlistenAfterIf");
  this.DeleteRole(roleid);
  //this.UpdateRole(roleid,response);
  location.reload();
 
}
})*/

  });
}



      rolesarray:any=[];
      ngOnInit(): void {
        this.insertionservice.showdatroles().subscribe((response)=>{
           this.rolesarray=response;
           console.log(this.rolesarray);
           console.log(response);
           console.log('heloooooooooooooooooooo');
        });





}
}
