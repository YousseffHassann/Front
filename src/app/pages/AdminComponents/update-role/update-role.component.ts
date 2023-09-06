import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsertionService } from '../../Services/insertion.service';

@Component({
  selector: 'ngx-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {


  roleid:any;
  roledata:any;
  constructor(private insertionservice:InsertionService,private activatedroute:ActivatedRoute,private router:Router) {
  this.roleid=activatedroute.snapshot.params['roleid'];

   }


   registerationForm:FormGroup=new FormGroup({
    ROLE:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    EN_NAME:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
    AR_NAME:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),
      });



UpdateRole(roleid,forminfo:FormGroup)
{
   this.insertionservice.UpdateRole(roleid,forminfo.value).subscribe((response)=>{
    console.log(response);
   });
   this.router.navigate(['/pages/sec_roles']);
}


GetRoleByRoleId()
{
  this.insertionservice.GetByRoleId(this.roleid).subscribe((response)=>{
       console.log(response);
       console.log(response[0].AR_NAME);
       this.roledata=response;
       console.log(this.roledata);
       this.registerationForm.controls.ROLE.setValue(
       this. roledata[0].ROLE);
       this.registerationForm.controls.AR_NAME.setValue(
        this. roledata[0].AR_NAME);
       this.registerationForm.controls.EN_NAME.setValue(
        this. roledata[0].EN_NAME);
        console.log("this is getfunction");
        //this.registerationForm.get("ROLE")?.setValue(this.roledata[0].ROLE)
  });

}



  ngOnInit(): void {
    console.log(this.roleid);
    this.GetRoleByRoleId();
  }

}
