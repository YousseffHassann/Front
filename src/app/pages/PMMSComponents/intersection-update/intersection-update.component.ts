import { sanitizeIdentifier } from '@angular/compiler';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { DistressService } from '../../Services/distress.service';
import { SectionServiceService } from '../../Services/section-service.service';

import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from 'ngx-alerts';
import { RegiionStreetSectionService } from '../../Services/regiion-street-section.service';


@Component({
  selector: 'ngx-intersection-update',
  templateUrl: './intersection-update.component.html',
  styleUrls: ['./intersection-update.component.scss']
})
export class IntersectionUpdateComponent implements OnInit {

  streets:any[]=[];
  intersections:any[]=[];
  streetId:any;
  intersectionId:any;
  intesectionInfo:any;
  IntersectionName:any;
  inter_no:any;
  types:any[]=[];
  controls:any[]=[];
  TypeId:any;
  ControlId:any;
  interinfo:any[]=[];
  BinaryButes:any;

  second:boolean=false;
  firsttable:boolean=false;

  UpdateMessage:boolean=false;
  
  AllInterSample:any[]=[];

  inter_samp_id:any;
  SAMPLES_COUNT:any;
  realCount:any;

  check:boolean=false;


  regions:any[]=[]
    
  settings2 = {
    /* add: {
       addButtonContent: '<i class="nb-plus"></i>',
       createButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
     },*/

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


   // selectMode:'multi',

   //  mode: "external",
     
    //hideSubHeader: true,

     actions: {
       //delete: false,
      // edit: false,
       add: false,
       position: "right",
     },


     columns: {
      INTER_SAMP_NO: {
         title: 'Sample No',
         type: 'number',
         editable:false
       },
       LENGTH: {
         title: 'Length',
         type: 'number',
       },
       WIDTH: {
         title: 'Width',
         type: 'number',
       },

       NOTES: {
        title: 'Notes',
        type: 'string',
      },

     },
   };

//    onRowSelect(event)
//    {
//     console.log("MultiSelect");
//     console.log(event);
//     console.log(event.selected);
// console.log(event.source.filterConf.andOperator)
//     console.log(event.selected[0]);

//     if(!event.isSelected)
//     {
//       event.isSelected=true;
//       console.log(event.isSelected);
//       this.check=true;
//       console.log(event.source.filterConf.andOperator)
//      // event.selected[0]
//     }
 
//     console.log(event.isSelected)

//     //(userRowSelect)="onRowSelect($event)"


//    }

   
    // (userRowSelect)="onRowSelect($event)"


  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
     
       this.intersectionService.DeleteInterSampleFinal(event.data.INTER_SAMP_ID).subscribe((res)=>{
                 console.log(res);
       });

      event.confirm.resolve();

    } 
    else {
      event.confirm.reject();
    }

  }
  
  constructor(private intersectionService:SectionServiceService,private distressService:DistressService,private sanitizer: DomSanitizer,
              private alertService: AlertService,private UpdateRegionSection:RegiionStreetSectionService,
    ) {

   }

   settings1 = {

    /* add: {
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
     },*/

     mode: "external",
 
     hideSubHeader: true,

     actions: {
       delete: false,
       edit: false,
       add: false,
       position: "right",
     },

     columns: {

      INTER_NO: {
         title: '  رقم التقاطع',
         type: 'number',
       },

       INTEREC_STREET1: {
         title: ' الطريق رئيسي',
         type: 'string',
       },

       INTEREC_STREET2: {
         title: 'مع الطريق الرئيسي',
         type: 'string',
       },
 
     
     },
   };


   settingstest = {

    // add: {
    //    addButtonContent: '<i class="nb-plus"></i>',
    //    createButtonContent: '<i class="nb-checkmark"></i>',
    //    cancelButtonContent: '<i class="nb-close"></i>',
    //  },
     edit: {
       editButtonContent: '<i class="nb-edit"></i>',
       saveButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
       confirmSave: true,
     },
    //  delete: {
    //    deleteButtonContent: '<i class="nb-trash"></i>',
    //    confirmDelete: true,
    //  },

   //  mode: "external",
 
    // hideSubHeader: true,

     actions: {
       delete: false,
      // edit: false,
       add: false,
       position: "right",
     },

     columns: {

      //  ARNAME: {
      //    title: ' اسم الحارة  ',
      //    type: 'string',
      //    editable: false,
      //  },
       SECTION_NO: {
         title: ' SECTION_NO',
         type: 'string',
         editable: false,
       },
       SECTION_ID: {
         title: 'SECTION_ID',
         type: 'string',
         editable: false,
       },
       LANE_TYPE: {
         title: ' LANE_TYPE',
         type: 'string',
         editable: false,
       },
  
       LANE_LENGTH: {
         title: ' LANE_LENGTH',
         type: 'number',
       },
  
       LANE_WIDTH: {
        title: 'LANE_WIDTH ',
        type: 'number',
      },
    
  
     
     },
   };



EditSection(event)
{
  console.log(event.newData);
  console.log(event.data.SECTION_ID)
  var data = {
    "LANE_LENGTH": event.newData.LANE_LENGTH,
    "LANE_WIDTH": event.newData.LANE_WIDTH,
 };
this.UpdateRegionSection.UpdateLane(event.newData.LANE_ID,data).subscribe((res)=>{
  console.log(res);
  //this.intersectionsTest=res;

  // this.UpdateRegionSection.GetAllSectionByIntersectionIdtest(this.Intersection_idtest).subscribe((res)=>{
  //   console.log(res);
  //   this.sourcetest.load(res);
  //   this.sections_test=res;
  //   });

  this.UpdateRegionSection.GetAllLanesBySectionId(this.section_IdTest).subscribe((res)=>{
    console.log(res);
   // this.sourcetest.refresh();
    this.sourcetest.load(res);
    this.LANEES=res;
    });




  });



}



   source1: LocalDataSource=  new LocalDataSource();
   source2:LocalDataSource=new LocalDataSource();
   sourcetest:LocalDataSource=new LocalDataSource();
   
   Streets(e):any
   {
            this.SAMPLES_COUNT='';
            this.streetId=e.target.value;
            console.log(this.streetId);
            console.log("streets");

      //       this.distressService.getIntersectionByStreetId(this.streetId).subscribe((res)=>{
      //       console.log(res);
      //       this.intersections=res;
      //       console.log(this.intersections);

      //       //  this.source1.load(this.intersections)
      //       this.second=true;
      //       this.UpdateMessage=false;
          
      //       this.firsttable=false;
      //       this.TypeId=0;
      //       this.intersectionId ='اختيار'
      
      //  });

       this.UpdateRegionSection.GetAllIntersectionByStreetIdOrMainStreetId(this.streetId).subscribe((res)=>{
        console.log(res);
        this.intersectionsTest=res;
        });

   }



   getIntesectionByStreetId(e):any
   {
     this.intersectionId=e.target.value;
     console.log("intersectionId");
     console.log(this.intersectionId);
     this.intersectioninfoByIntersectionId(this.intersectionId);

     this.intersectionService.realCount(this.intersectionId).subscribe((res)=>{
      console.log(res);
      this.realCount=res;
 });

     this.intersectionService.names(this.intersectionId).subscribe((res)=>{
            console.log(res);
            this.SAMPLES_COUNT=res[0].SAMPLES_COUNT;
            console.log("Count");
            console.log(this.SAMPLES_COUNT);



if(this.SAMPLES_COUNT!=this.realCount)
{
  this.alertService.info("Inter Sample Number Must Be"+'  '+this.SAMPLES_COUNT + ' -> '+ "realCount is" +' ->' + this.realCount);
}
     console.log(this.realCount);
            this.interinfo=res;
            console.log(this.interinfo[0].INTERSECT_CTRL_TYPE);
            this.updateForm.controls.INTERSECT_TYPE_ID.setValue(
              this.interinfo[0].INTERSECT_TYPE_ID);

            this.updateForm.controls.INTERSECT_CTRL_TYPE_ID.setValue(
                this.interinfo[0].INTERSECT_CTRL_TYPE_ID);


            this.TypeId=  this.interinfo[0].INTERSECT_TYPE_ID;
            console.log("TestType");
            console.log(this.TypeId);
            this.UpdateMessage=false;
                this.intersectionService.GetAllIntersampleByIntesectionId(this.intersectionId).subscribe((res)=>{
                   console.log(res);
                   this.source2.load(res);
                   this.intersectionService.realCount(this.intersectionId).subscribe((res)=>{
                        console.log(res);
                        this.realCount=res;
                   });
                });
     });

 
   }

   intersectioninfoByIntersectionId(sid)
   {
     this.distressService.intersectioninfoByIntersectionId(sid).subscribe((res)=>{
           console.log(res);
           this.intesectionInfo=res;
           this.source1.load(this.intesectionInfo);
           console.log(this.intesectionInfo);
           console.log(this.intesectionInfo[0].INTEREC_STREET1);
           this.IntersectionName= this.intesectionInfo[0].INTEREC_STREET1+ "+"+this.intesectionInfo[0].INTEREC_STREET1;
           this.inter_no=res[0].INTER_NO;
           console.log("INTER_NO");
           console.log(this.inter_no);
           this.firsttable=true;
     });
   }

      GetAllIntersectionTypes()
      {
        this.intersectionService.GetAllIntersectionTypes().subscribe((res)=>{
             console.log(res);
             this.types=res;
        });
      }

image:any;
 hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
      type(e)
      {
        console.log(this.realCount)
        console.log(this.SAMPLES_COUNT)
         this.TypeId=e.target.value;
         console.log(this.TypeId);
         this.UpdateMessage=false;

if(this.SAMPLES_COUNT!=this.realCount)
{
  this.alertService.info("check the sample count VS Real Count ");
}

         this.intersectionService.GetPhotoNameByIntersectionTypeId(this.TypeId).subscribe((res)=>{
               console.log(res);
              //  this.image=res;
              //  const reader = new FileReader();
              //  reader.onload = (e) => this.image = e.target.result;
              //  reader.readAsDataURL(new Blob([this.image])); 
               this.sanitizer.bypassSecurityTrustResourceUrl(res);
               console.log(this.image);
               var img = document.createElement('img');
               img.src ='data:image/jpeg;base64,'+btoa(this.BinaryButes);
               document.body.appendChild(img);
               this.BinaryButes=img;
               console.log(this.BinaryButes);
         });
      }

      GetControl()
      {
        this.intersectionService.GetControl().subscribe((res)=>{
          console.log(res);
          this.controls=res;
          this.UpdateMessage=false;
        });
      }

      control(e)
      {
          this.ControlId=e.target.value;
          console.log(this.ControlId);
          this.UpdateMessage=false;
      }


      GetPhotoNameByIntersectionTypeId()
      {
       this.intersectionService.GetPhotoNameByIntersectionTypeId(5).subscribe(()=>{
       });
      }

      updateForm:FormGroup=new FormGroup({
        INTERSECT_TYPE_ID:new FormControl(null,[Validators.required,]),
        INTERSECT_CTRL_TYPE_ID:new FormControl(null,[Validators.required]),
});



submitupdateSampleFunction(forminfo:FormGroup)
{
     console.log(forminfo.value);
     this.intersectionService.UpdateIntersection(forminfo.value,this.intersectionId).subscribe((res)=>{
          console.log(res);
          this.interinfo=res;
          console.log(this.interinfo);
          this.UpdateMessage=true;
     });
}



EditInterSampel(event)
{
   console.log(event);
   var data = {
    "INTER_SAMP_NO": event.newData.INTER_SAMP_NO,
    "LENGTH": event.newData.LENGTH,
    "WIDTH": event.newData.WIDTH,
    "NOTES": event.newData.NOTES,

  };
  console.log("QWEFJJJSDVJSDVJ J")
  console.log(event)
console.log(data);
console.log(event.data.INTER_SAMP_ID);
//event.data.INTER_SAMP_ID=300459
// console.log(event.data);
// console.log(this.intersectionId);
  this.intersectionService.UpdateInterSampleFinal(data,event.data.INTER_SAMP_ID).subscribe((res)=>{  //WILL bE UpdateFunction
     console.log(res);
     this.inter_samp_id=event.data.INTER_SAMP_ID;  //Not Used 
     this.intersectionService.GetAllIntersampleByIntesectionId(this.intersectionId).subscribe((res)=>{
      console.log(res);
      this.source2.load(res);
     
     // this.alertService.info('تم التعديل بنجاح');

   });
  });
}

regionId:any;

dropdownList = [];
selectedItems = [];
dropdownSettings = {
  
};

Intersection_idtest:any;
intersectionsTest:any[]=[];

ShowIntersection(e)
{
console.log(e.target.value);
this.Intersection_idtest=e.target.value;
console.log(this.streetId);

// this.UpdateRegionSection.GetAllIntersectionByStreetIdOrMainStreetId(this.streetId).subscribe((res)=>{
// console.log(res);
// this.intersectionsTest=res;
// });


// this.UpdateRegionSection.GetAllSectionByIntersectionIdtest(this.Intersection_idtest).subscribe((res)=>{
//   console.log(res);
//   this.intersectionsTest=res;
//   });

  this.UpdateRegionSection.GetAllSectionByIntersectionIdtest(this.Intersection_idtest).subscribe((res)=>{
    console.log(res);
   // this.sourcetest.load(res);
    this.sections_test=res;
    });

}

section_IdTest:any;
showsectiontable:boolean=false;
sections_test:any[]=[];
LANEES:any[]=[];
showSectionsByIntersectionId(e)
{

  this.section_IdTest=e.target.value
  console.log(e.target.value);
  this.showsectiontable=true;

  this.UpdateRegionSection.GetAllLanesBySectionId(this.section_IdTest).subscribe((res)=>{
    console.log(res);    //THIS IF NULL HIDE TABLE
    if(res)
    {
      this.sourcetest.load(res);
      this.LANEES=res;
    }
    else
    {
      this.sourcetest.load([]);
    }
 
    });


}



onItemSelect(item: any) {
  console.log(item);
  this.streetId=item.STREET_ID;
console.log(this.streetId)
  this.regionId=item.REGION_ID;
  console.log(this.regionId);



  this.UpdateRegionSection.GetStreetByRegionId(this.regionId).subscribe((res)=>{
    console.log(res);
    this.streets=res;
    
    this.source2.load(res);
   // this.checkload=true;
});




}
onSelectAll(items: any) {
  console.log(items);
}







  ngOnInit(): void {
  
   // console.log(this.alertService.info)
  //   this. distressService.AllStreests().subscribe((response)=>{
  //     console.log(response);
  //     this.streets=response;
  //     console.log(this.streets[0].ARNAME);
  //     this.dropdownList =response;
    
  //  });


  this.UpdateRegionSection.AllRegion().subscribe((res)=>{
    this.regions=res;
    console.log(res);
    this.dropdownList =res;
   });
   


  //  this.UpdateRegionSection.AllRegion().subscribe((res)=>{
  //   this.regions=res;
  //   console.log(res);
  //   this.dropdownList =res;
  //  });
   

      this.GetAllIntersectionTypes();
      this.GetControl();



          
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'REGION_ID',
      textField: 'ENNAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };
  }

}
