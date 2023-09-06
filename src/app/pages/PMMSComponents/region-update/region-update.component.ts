import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { DistressService } from '../../Services/distress.service';
import { SectionServiceService } from '../../Services/section-service.service';

@Component({
  selector: 'ngx-region-update',
  templateUrl: './region-update.component.html',
  styleUrls: ['./region-update.component.scss']
})
export class RegionUpdateComponent implements OnInit {

  regions:any[]=[];
  regionId:any;

  regionInfoArr:any=[];

  streets:any[]=[];
  streetId:any;


  tableshow:boolean=false;



  settings1 = {

    mode: "external",
    hideSubHeader: true,
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },

    columns: {
      REGION_NO: {
        title: '   REGION_NO  ',
        type: 'number',
      },
      REGION_NAME: {
        title: '  REGION_NAME ',
        type: 'string',
      },
      MUNIC_NAME: {
        title: '  MUNIC_NAME ',
        type: 'string',
      },
   

    
    },
  };


  settings2 = {

   // mode: "external",
  //  hideSubHeader: true,

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
      //delete: false,
      //edit: false,
      add: false,
      position: "right",
    },

    columns: {

      ARNAME: {
        title: '  Street Name  ',
        type: 'string',
        editable: false,
      },
      LENGTH: {
        title: 'LENGTH',
        type: 'string',
      },
      WIDTH: {
        title: 'WIDTH',
        type: 'string',
      },
      AR: {
        title: 'Area (m^2)',
        type: 'string',
        editable: false,
      },
      NOTES: {
        title: 'Notes',
        type: 'string',
      },
   

    
    },
  };

  source1: LocalDataSource = new LocalDataSource(); 
  source2: LocalDataSource = new LocalDataSource(); 

  MunicipalityId:any;
  District_Id:any;
  Districts:any[]=[];
  municipalities:any[]=[];






  constructor(private regionUpdateService:SectionServiceService,private distressService:DistressService) { }





  Municipalitieo(e)
  {
    this.MunicipalityId=  e.target.value;
    console.log(this.MunicipalityId);

    this.distressService.GetDistrictByMId(this.MunicipalityId).subscribe((res2)=>{
      console.log(res2);
      this.Districts=res2;
      console.log(this.Districts);
    });
  }

  Districtss(e)
  {
    this.District_Id=e.target.value;
    console.log(this.District_Id);

  this.distressService.GetRegionsByDistrictId(this.District_Id).subscribe((res)=>{
   console.log(res);
   this.regions=res;

   this.regionUpdateService.AllUpdateRegions(this.District_Id).subscribe((res)=>{   //check if outside
    console.log(res);
    this.regions=res;
});


  });



  }














  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
     
       ////
console.log(event.data.STREET_ID)
       this.regionUpdateService.DeleteRegionUpdate(event.data.STREET_ID).subscribe((res)=>{
            console.log(res);
       });

      event.confirm.resolve();

    } 
    else {
      event.confirm.reject();
    }

  }

  EditInterSampel(event)
{
   console.log(event.newData);
   console.log(event.data.STREET_ID)
   var data = {
    "LENGTH": event.newData.LENGTH,
    "WIDTH": event.newData.WIDTH,
    "NOTES": event.newData.NOTES,
  };


  this.regionUpdateService.UpdateStreet(data,event.data.STREET_ID).subscribe((res)=>{
       console.log(res);

       this.regionUpdateService.StreetsregionUpdate(this.regionId).subscribe((res)=>{
        console.log(res);
        this.streets=res;
        this.source2.load(res);
    });
    
  });


  //   this.regionUpdateService.StreetsregionUpdate(this.regionId).subscribe((res)=>{
  //     console.log(res);
  //     this.streets=res;
  //     this.source2.load(res);
  // });


}

AllRegions(e)
{
  console.log(e.target.value);
  this.regionId=e.target.value;
  this.regionUpdateService.regionUpdateInfo(this.regionId).subscribe((res)=>{
      console.log(res);
      this.regionInfoArr=res; 
      this.source1.load(res);
  });
      this.tableshow=true;
      this.regionUpdateService.StreetsregionUpdate(this.regionId).subscribe((res)=>{
      console.log(res);
      this.streets=res;
      this.source2.load(res);
  });

}

AllStreeto(e)
{
    console.log(e.target.value);
    this.streetId=e.target.value;
}


allStreets(e)
{
console.log(e.target.value);
this.streetId=e.target.value;
}



// registerationForm:FormGroup=new FormGroup({
//   DIST_CODE:new FormControl(null,[Validators.required,]),
//   DIST_SEVERITY:new FormControl(null,[Validators.required]),
//   DISTRESS_NOTES:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),  //max on numbers 
//   DIST_AREA:new FormControl(null,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
//   SURVEY_NO:new FormControl(null,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
//   SURVEY_DATE:new FormControl(null,[Validators.required,]),

// //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
// });


// submitFun(forminfo:FormGroup)
// {
//     console.log(forminfo.value);
// }



  ngOnInit(): void {

    this.distressService.GetAllMunicipality().subscribe((res)=>{
      console.log(res);
      this.municipalities=res;
      });



  //   this.regionUpdateService.AllUpdateRegions().subscribe((res)=>{
  //     console.log(res);
  //     this.regions=res;
  // });

  }

}
