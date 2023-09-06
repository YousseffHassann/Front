import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { RegiionStreetSectionService } from '../../Services/regiion-street-section.service';




@Component({
  selector: 'ngx-update-rgion-section',
  templateUrl: './update-rgion-section.component.html',
  styleUrls: ['./update-rgion-section.component.scss']
})
export class UpdateRgionSectionComponent implements OnInit {

  constructor(
    private UpdateRegionSection:RegiionStreetSectionService
     ) { }


regions:any[]=[];
streets:any[]=[];
sections:any[]=[];

regionId:any;
streetId:any;
sectionId:any;

checkload:boolean=false;
checksections:boolean=false;

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
     delete: false,
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

 settings1 = {

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
     delete: false,
    // edit: false,
     add: false,
     position: "right",
   },

   columns: {

     ARNAME: {
       title: '  Section Name  ',
       type: 'string',
       editable: false,
     },
    SEC_LENGTH: {
       title: 'SEC_LENGTH',
       type: 'string',
     },
     SEC_WIDTH: {
       title: 'SEC_WIDTH',
       type: 'string',
     },
     SEC_AREA: {
       title: 'SEC_AREA(m^2)',
       type: 'string',
       editable: false,
     },

    //  NOTES: {
    //    title: 'الملاحظات',
    //    type: 'string',
    //  },
  

   
   },
 };




 
 settings3 = {

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





  source2: LocalDataSource = new LocalDataSource(); 

  source1: LocalDataSource = new LocalDataSource(); 

  source3: LocalDataSource = new LocalDataSource(); 


EditLane(event)
{
  var data = {
    "LANE_LENGTH": event.newData.LANE_LENGTH,
    "LANE_WIDTH": event.newData.LANE_WIDTH,
    
  };
console.log(event.newData)
console.log(this.lane_id)
console.log(event.newData.LANE_ID)
  this.UpdateRegionSection.UpdateLane(event.newData.LANE_ID,data).subscribe((res)=>{  //will be sectionid
    console.log(res);

    this.UpdateRegionSection.GetAllLanesBySectionId(this.sectionId).subscribe((res)=>{
      console.log(res);
      this.lanes=res;
      this.source3.load(res);
  });

  })
}

DeleteLane(e)
{

}




  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
     
       ////
console.log(event.data.STREET_ID)
      //  this.regionUpdateService.DeleteRegionUpdate(event.data.STREET_ID).subscribe((res)=>{
      //       console.log(res);
      //  });

      event.confirm.resolve();

    } 
    else {
      event.confirm.reject();
    }

  }

  EditStreet(event)
{
   console.log(event.newData);
   console.log(event.data.STREET_ID)
   var data = {
    "LENGTH": event.newData.LENGTH,
    "WIDTH": event.newData.WIDTH,
    "NOTES": event.newData.NOTES,
  };


  this.UpdateRegionSection.StreetUpD(data,event.data.STREET_ID).subscribe((res)=>{
       console.log(res);

       this.UpdateRegionSection.GetStreetByRegionId(this.regionId).subscribe((res)=>{
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



EditSection(event)
{
  
  console.log(event);
  console.log("editn section will be here ");

  console.log(event.newData);
   console.log(event.data.STREET_ID)
   var data = {
    "SEC_LENGTH": event.newData.LENGTH,
    "SEC_WIDTH": event.newData.WIDTH,
  };


  this.UpdateRegionSection.UpdateSecTionRegionByStreetId(data,event.data.STREET_ID).subscribe((res)=>{
       console.log(res);

       this.UpdateRegionSection.GetOAllSectionsBYStreetId(this.streetId).subscribe((res)=>{
        console.log(res);
        this.sections=res;
        this.source1.load(res);
        this.checksections=true;
        //here
  });
    
  });


  //   this.regionUpdateService.StreetsregionUpdate(this.regionId).subscribe((res)=>{
  //     console.log(res);
  //     this.streets=res;
  //     this.source2.load(res);
  // });

}

DelSec(e)
{
  console.log(e);
  console.log("delete section will Be Here ");
}


GettStreetbyRegionId(e)
{
  
  console.log("streeeetttttId");
  this.streetId=e.target.value;
  console.log(this.streetId);
  
  console.log(e);

  // this.UpdateRegionSection.GetOAllSectionsBYStreetId(this.streetId).subscribe((res)=>{
  //       console.log(res);
  //       this.sections=res;
  //       this.source1.load(res);
  //       this.checksections=true;
  //       //here
  // });



  this.UpdateRegionSection.GetOAllSectionsBYStreetId(this.streetId).subscribe((res)=>{  //this.streetId  62758
    console.log(res);
    this.sections=res;
    this.source1.load(res);
    this.checksections=true;
    //here

  });
  
}

checklane:boolean=false;


getallsectionByStreetId(e)
{
  console.log(e);
  console.log("S(eSECTIONiD");
  console.log(e.target.value);
  this.sectionId=e.target.value;


  this.checklane=true;


  // this.UpdateRegionSection.GetOAllSectionsBYStreetId(62758).subscribe((res)=>{  //this.streetId
  //   console.log(res);
  //   this.sections=res;
  //   this.source1.load(res);
  //   this.checksections=true;
  //   //here

  // });

  this.UpdateRegionSection.GetAllLanesBySectionId(this.sectionId).subscribe((res)=>{
    console.log(res);
    this.lanes=res;
    this.source3.load(res);
});
  
}

lanes:any[];
lane_id:any;


GetAllLanesBySectionId(e)
{
  this.lane_id=e.target.value;
  console.log("lane_id");
  console.log(this.lane_id);
  
  // this.UpdateRegionSection.GetAllLanesBySectionId(this.sectionId).subscribe((res)=>{
  //       console.log(res);
  //       this.lanes=res;
  //       this.source2.load(res);
  // });
}





  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    
  };
  
  onItemSelect(item: any) {
    console.log(item);
    this.streetId=item.STREET_ID;
  
    this.regionId=item.REGION_ID;
    console.log(this.regionId);



    this.UpdateRegionSection.GetStreetByRegionId(this.regionId).subscribe((res)=>{
      console.log(res);
      this.streets=res;
      
      this.source2.load(res);
      this.checkload=true;
});




  }
  onSelectAll(items: any) {
    console.log(items);
 
  }

  ngOnInit(): void {


    this.UpdateRegionSection.AllRegion().subscribe((res)=>{
     this.regions=res;
     console.log(res);
     this.dropdownList =res;
    });
    
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'REGION_ID',
      textField: 'ENNAME',     //+street.DIST_NO   ARNAME 
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };

  }

}
