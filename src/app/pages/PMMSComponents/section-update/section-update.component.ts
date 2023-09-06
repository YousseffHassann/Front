import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { SectionServiceService } from '../../Services/section-service.service';

@Component({
  selector: 'ngx-section-update',
  templateUrl: './section-update.component.html',
  styleUrls: ['./section-update.component.scss']
})
export class SectionUpdateComponent implements OnInit {

  //المسارات والعينات 
  streets:any[]=[];
  StreetId:any;
  Sections:any;
  SectionId:any;
  SectionInfo:any;
  lane_id:any;
  lanes:any[]=[];
  samples:any[]=[];
  sample_Id:any;
  LaneType:any;
  sample_no:any;
  dataFoundArray:any[]=[];

  
  links:boolean=false;
  firstTable:boolean=false; 
  laneandsamples:boolean=false;   //nine
  massah:boolean=false;  //ten
  smaplesCheck:boolean=false;
  update1:boolean=false;
  update2:boolean=false;


  sample_length:any;
  sample_width:any;
  sample_area:any;

  parking_method:any;
  u_tern_length:any;
  utern_width:any;
  concrete_blocks_count:any;
  speed_bumbes_count:any;

     
  SPEED_BUMPS_ILLEGAL:any=false;
  SPEED_BUMPS_LEGAL:any=false;
  SIDEWALK_PAINT_TRUE:any=false;
  SIDEWALK_PAINT_GOOD:any=false;
  CONCRETE_BLOCKS:any=false;
  U_TURN_TRUE:any=false;

  HANDICAPPED_SLOPE_GOOD:any=false;
  HANDICAPPED_SLOPE_TRUE:any=false;
  SPEED_BUMPS_TRUE:any=false;

  messageSuccess:boolean=false;



  //المساح


AllSurvevors:any[]=[];
SurvevorId:any;


//الاستخدامات المجاورة




neighbour_using:boolean=false;

sectionDetailsInfo:any[]=[];
neighbour_usingMessage:boolean=false;







  constructor(private sectionService:SectionServiceService) { 

  }






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
      MUNICIPALITY: {
         title: '  MUNICIPALITY',
         type: 'number',
       },
       SECTION_NO: {
         title: '  Section Number',
         type: 'string',
       },
       MAIN_ST_TITLE: {
         title: '  Main Street Title',
         type: 'string',
       },
       SEC_DIRECTION : {
         title: 'SEC_DIRECTION ',
         type: 'string',
       },

       FROM_STREET: {
         title: 'From ',
         type: 'number',
       },
       TO_STREET: {
         title: ' To',
         type: 'string',
       },
     
 
     
     },
    };

   settings2 = {
     mode: "external",
   // hideSubHeader: true
     actions: {
       delete: false,
       edit: false,
       add: false,
       custom: [{ name: 'ourCustomAction', title: '...' }],
       position: "left",
     },

   



     columns: {
      LANE_TYPE: {
         title: '   LANE_TYPE',
         type: 'number',
       },
       LANE_LENGTH: {
         title: '  LANE_LENGTH ',
         type: 'string',
       },
       LANE_WIDTH: {
         title: ' LANE_WIDTH ',
         type: 'string',
       },
       SAMPLE_COUNT : {
         title: ' SAMPLE_COUNT ',
         type: 'string',
       },

       SAMPLE_AREA: {
         title: ' SAMPLE_AREA ',
         type: 'string',
       },

     
 
     
     },
     };

   settings3 = {
  /*  add: {
       addButtonContent: '<i class="nb-plus"></i>',
       createButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
     },*/

     /*edit: {
       editButtonContent: '<i class="nb-edit"></i>',
       saveButtonContent: '<i class="nb-checkmark"></i>',
       cancelButtonContent: '<i class="nb-close"></i>',
     },*/

     delete: {
       deleteButtonContent: '<i class="nb-trash"></i>',
       confirmDelete: true,
     },

     mode: "external",
     
   // hideSubHeader: true,

     actions: {
       delete: false,
       edit: false,
       add: false,
       custom: [{ name: 'ourCustomAction', title: ' ...' }], 
       position: "left",
     },

     columns: {
      SAMPLE_NO: {
         title: '  SAMPLE_NO   ',
         type: 'number',
       },
       SAMPLE_LENGTH: {
         title: ' SAMPLE_LENGTH',
         type: 'string',
       },

       SAMPLE_WIDTH: {
        title: '   SAMPLE_WIDTH ',
        type: 'string',
      },
      AR: {
        title: '   Area (m^2) ',
        type: 'string',
      },

     },
     };

   settings4 = {
    /*  add: {
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
        // confirmDelete: true,
       },
  
      // mode: "external",
       
  
  
       actions: {
         delete: false,
         //edit: false,
         add: false,
         
         position: "left",
       },
  
       columns: {
        SAMPLE_NO: {
           title: '  SAMPLE_NO   ',
           type: 'number',
           editable:false,
         },
         SAMPLE_LENGTH: {
           title: ' SAMPLE_LENGTH',
           type: 'string',
         },
  
         SAMPLE_WIDTH: {
          title: '    ',
          type: 'string',
        },
        NOTES: {
          title: 'Notes ',
          type: 'string',
        },
  
       },
     };

   settings5 = {
      /*  add: {
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
          // confirmDelete: true,
         },
    
        // mode: "external",
         
    
    
         actions: {
           delete: false,
           //edit: false,
           add: false,
           
           position: "left",
         },


      


         columns: {

          CONCRETE_BLOCKS_COUNT: {
            title: ' CONCRETE_BLOCKS_COUNT ',
            type: 'number',
          },
   
          U_TURN_LENGTH: {
           title: 'U_TURN_LENGTH',
           type: 'number',
         },


         U_TURN_WIDTH: {
           title: '  U_TURN_WIDTH ',
           type: 'number',
         },

         PARKING_METHOD: {
          title: '  PARKING_METHOD   ',
          type: 'number',
        },
    
         },
     };
  

   source1: LocalDataSource=  new LocalDataSource();
   source2: LocalDataSource=  new LocalDataSource();
   source3: LocalDataSource=  new LocalDataSource();
   source4: LocalDataSource=  new LocalDataSource();
   source5: LocalDataSource=  new LocalDataSource();


   


   onCustomAction(event):void{

     this.smaplesCheck=true;
     this.update1=false;
     this.update2=false;
     this.messageSuccess=false;
     console.log("Custom Action");
     this.lane_id=event.data.LANE_ID;
     console.log(this.lane_id);
     this.LaneType=event.data.LANE_TYPE;
     console.log(this.LaneType);
     this.sectionService.GetSampleByLaneId(this.lane_id).subscribe((res)=>{
         console.log(res);
         if(res==null)
         {
          this.samples=[];
          this.source3.load([]);
         }
         
         else
         {
          this.samples=res;
          this.source3.load(res);
         }
        
     });
   }

   onCustomActions3(event):void{
  //  this.GetBySample2();
    console.log("Custom Action");
    this.update1=true;

    this.messageSuccess=false;
console.log(this.sample_length)

    this.sample_Id=event.data.SAMPLE_ID;
    console.log("Sample_id")
    console.log(this.sample_Id);

      
    //this.GetBySample();
    this.sectionService.GetBySampleId(this.sample_Id).subscribe((res)=>{
        //  console.log(res);      //Transfer Hire 
          this.dataFoundArray=res;
          console.log(this.dataFoundArray);

this.sample_no=res[0].SAMPLE_NO
this.sample_length=res[0].SAMPLE_LENGTH
this.sample_width=res[0].SAMPLE_WIDTH
this.sample_area=res[0].SAMPLE_AREA

          if(this.dataFoundArray!==null)
          {
           // this.GetBySample2();
                console.log(this.SPEED_BUMPS_LEGAL);
              
               // this.parking_method=this.dataFoundArray[0].PARKING_METHOD
                console.log(this.parking_method);
                //this.u_tern_length=this.dataFoundArray[0].U_TURN_LENGTH
               // this.utern_width=this.dataFoundArray[0].U_TURN_WIDTH
              //  this.concrete_blocks_count=this.dataFoundArray[0].CONCRETE_BLOCKS_COUNT
               // this.speed_bumbes_count=this.dataFoundArray[0].SPEED_BUMPS_COUNT
                
                //Y OR N all  Of Them
                if(this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL==="N")
                {
                  this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL=false;
                  this.SPEED_BUMPS_ILLEGAL=false;
                }
                else{
                  this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL=true;
                  this.SPEED_BUMPS_ILLEGAL=true;
                }

      


                if(this.dataFoundArray[0].SPEED_BUMPS_LEGAL==="N")
                {
                  this.dataFoundArray[0].SPEED_BUMPS_LEGAL=false;
                  this.SPEED_BUMPS_LEGAL=false;
                }
                else{
                  this.dataFoundArray[0].SPEED_BUMPS_LEGAL=true;
                  this.SPEED_BUMPS_LEGAL=true;
                }


                if(this.dataFoundArray[0].SIDEWALK_PAINT_TRUE==="N")
                {
                  this.dataFoundArray[0].SIDEWALK_PAINT_TRUE=false;
                  this.SIDEWALK_PAINT_TRUE=false;
                }
                else{
                  this.dataFoundArray[0].SIDEWALK_PAINT_TRUE=true;
                  this.SIDEWALK_PAINT_TRUE=true;
                }



                if(this.dataFoundArray[0].SIDEWALK_PAINT_GOOD==="N")
                {
                  this.dataFoundArray[0].SIDEWALK_PAINT_GOOD=false;
                  this.SIDEWALK_PAINT_GOOD=false;
                }
                else{
                  this.dataFoundArray[0].SIDEWALK_PAINT_GOOD=true;
                  this.SIDEWALK_PAINT_GOOD=true;
                }



                if(this.dataFoundArray[0].CONCRETE_BLOCKS==="N")
                {
                  this.dataFoundArray[0].CONCRETE_BLOCKS=false;
                  this.CONCRETE_BLOCKS=false;
                }
                else{
                  this.dataFoundArray[0].CONCRETE_BLOCKS=true;
                  this.CONCRETE_BLOCKS=true;
                }



                if(this.dataFoundArray[0].U_TURN_TRUE==="N")
                {
                  this.dataFoundArray[0].U_TURN_TRUE=false;
                  this.U_TURN_TRUE=false;
                }
                else{
                  this.dataFoundArray[0].U_TURN_TRUE=true;
                  this.U_TURN_TRUE=true;
                }



                if(this.dataFoundArray[0].HANDICAPPED_SLOPE_GOOD==="N")
                {
                  this.dataFoundArray[0].HANDICAPPED_SLOPE_GOOD=false;
                  this.HANDICAPPED_SLOPE_GOOD=false;
                }
                else{
                  this.dataFoundArray[0].HANDICAPPED_SLOPE_GOOD=true;
                  this.HANDICAPPED_SLOPE_GOOD=true;
                }
        


                
                if(this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE==="N")
                {
                  this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE=false;
                  this.HANDICAPPED_SLOPE_TRUE=false;
                }
                else{
                  this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE=true;
                  this.HANDICAPPED_SLOPE_TRUE=true;
                }

                if(this.dataFoundArray[0].SPEED_BUMPS_TRUE==="N")
                {
                  console.log("dbhjbbvhjsd");
                  this.SPEED_BUMPS_TRUE=false;
                  this.dataFoundArray[0].SPEED_BUMPS_TRUE=false;
                }
               else
               {
                console.log("dbhjbbvhjsd");
                this.SPEED_BUMPS_TRUE=true;
                this.dataFoundArray[0].SPEED_BUMPS_TRUE=true;
               }
                console.log(this.SPEED_BUMPS_ILLEGAL);
        

        
             //   this.SPEED_BUMPS_ILLEGAL=this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL
              //  this.SPEED_BUMPS_LEGAL=this.dataFoundArray[0].SPEED_BUMPS_LEGAL
              //  this.SIDEWALK_PAINT_TRUE=this.dataFoundArray[0].SIDEWALK_PAINT_TRUE
               // this.SIDEWALK_PAINT_GOOD=this.dataFoundArray[0].SIDEWALK_PAINT_GOOD
              //  this. CONCRETE_BLOCKS=this.dataFoundArray[0].CONCRETE_BLOCKS
               // this. U_TURN_TRUE=this.dataFoundArray[0].U_TURN_TRUE
                // this.  HANDICAPPED_SLOPE_GOOD=this.dataFoundArray[0]. HANDICAPPED_SLOPE_GOOD
               // this.HANDICAPPED_SLOPE_TRUE=this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE

    
                



           // this.source5.load(res);
            this.update2=true;
            this.messageSuccess=false;
          }

          else if(this.dataFoundArray===null)
          {
            //this.GetBySample2();
            console.log(this.speed_bumbes_count)
            this.dataFoundArray=[];
            console.log(this.speed_bumbes_count)
            console.log(this.speed_bumbes_count)

          /*  this.u_tern_length=''
            this.utern_width=''
            this.concrete_blocks_count=''
            this.speed_bumbes_count=''*/

            console.log("dataFoundArrAyIsNull");
            console.log(this.SPEED_BUMPS_ILLEGAL);
            this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL=false;
            console.log(  this.SPEED_BUMPS_LEGAL);
            this.source5.load([]);
            this.update2=false;
            this.dataFoundArray=[];

          /*  this.parking_method=''
            this.u_tern_length=''
            this.utern_width=''
            this.concrete_blocks_count=''
            this.speed_bumbes_count=''*/

            this.dataFoundArray[0].parking_method=false
            this.dataFoundArray[0].u_tern_length=''

            this.SPEED_BUMPS_ILLEGAL=false
            this.SPEED_BUMPS_LEGAL=false
            this.SIDEWALK_PAINT_TRUE=false
            this.SIDEWALK_PAINT_GOOD=false
            this. CONCRETE_BLOCKS=false
            this. U_TURN_TRUE=false
            this.  HANDICAPPED_SLOPE_GOOD=false
            this.HANDICAPPED_SLOPE_TRUE=false

            console.log(this.SPEED_BUMPS_ILLEGAL);

            
            this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL=false
            this.dataFoundArray[0].SPEED_BUMPS_LEGAL=false
            this.dataFoundArray[0].SIDEWALK_PAINT_TRUE=false
            this.dataFoundArray[0].SIDEWALK_PAINT_GOOD=false
            this.dataFoundArray[0].CONCRETE_BLOCKS=false
            this.dataFoundArray[0].U_TURN_TRUE=false
            this.dataFoundArray[0].HANDICAPPED_SLOPE_GOOD=false
            this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE=false
            this.dataFoundArray[0].SPEED_BUMPS_TRUE=false
          }

 

          this.registerationFormSample.controls.SAMPLE_LENGTH.setValue(
            this.dataFoundArray[0].SAMPLE_LENGTH);

          this.registerationFormSample.controls.SAMPLE_WIDTH.setValue(
            this.dataFoundArray[0].SAMPLE_WIDTH);

            this.registerationFormSample.controls.PARKING_METHOD.setValue(
              this.dataFoundArray[0].PARKING_METHOD);

              this.registerationFormSample.controls.SPEED_BUMPS_TRUE.setValue(
                this.dataFoundArray[0].SPEED_BUMPS_TRUE);

              this.registerationFormSample.controls.SPEED_BUMPS_ILLEGAL.setValue(
                this.dataFoundArray[0].SPEED_BUMPS_ILLEGAL);
      
            this.registerationFormSample.controls.SPEED_BUMPS_LEGAL.setValue(
              this.dataFoundArray[0].SPEED_BUMPS_LEGAL);
      
              this.registerationFormSample.controls.SIDEWALK_PAINT_TRUE.setValue(
                this.dataFoundArray[0].SIDEWALK_PAINT_TRUE);
          
                  this.registerationFormSample.controls.SIDEWALK_PAINT_GOOD.setValue(
                    this.dataFoundArray[0].SIDEWALK_PAINT_GOOD);
          
                    this.registerationFormSample.controls.CONCRETE_BLOCKS.setValue(
                      this.dataFoundArray[0].CONCRETE_BLOCKS);

                  this.registerationFormSample.controls.U_TURN_TRUE.setValue(
                    this.dataFoundArray[0].U_TURN_TRUE);
        
                   this.registerationFormSample.controls.HANDICAPPED_SLOPE_GOOD.setValue(
                     this.dataFoundArray[0]. HANDICAPPED_SLOPE_GOOD);
       
                     this.registerationFormSample.controls.HANDICAPPED_SLOPE_TRUE.setValue(
                       this.dataFoundArray[0].HANDICAPPED_SLOPE_TRUE)   

                       this.registerationFormSample.controls.SPEED_BUMPS_COUNT.setValue(
                         this.dataFoundArray[0].SPEED_BUMPS_COUNT);
             
                         this.registerationFormSample.controls.CONCRETE_BLOCKS_COUNT.setValue(
                           this.dataFoundArray[0].CONCRETE_BLOCKS_COUNT);
  
                          this.registerationFormSample.controls.U_TURN_WIDTH.setValue(
                            this.dataFoundArray[0].U_TURN_WIDTH);
                                  
                           this.registerationFormSample.controls.U_TURN_LENGTH.setValue(
                            this.dataFoundArray[0].U_TURN_LENGTH);
        
    });

   // this.GetBySample2();


  }


  GetBySample2()   
  {
     this.sectionService.GetBySample2(this.sample_Id).subscribe((res)=>{
     console.log(res);
     this.sample_no=res[0].SAMPLE_NO;
     this.sample_length=res[0].SAMPLE_LENGTH;
     this.sample_width=res[0].SAMPLE_WIDTH;
     this.sample_area=res[0].AR;
     console.log(this.sample_no);
     // this.source4.load(res);
    });
  }

   onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditSample(event):void
  {
    console.log(event.newData);
    console.log(event.newData.SAMPLE_LENGTH);
    console.log("update");
    var data = {
      "SAMPLE_LENGTH": event.newData.SAMPLE_LENGTH,
      "SAMPLE_WIDTH": event.newData.SAMPLE_WIDTH,
      "NOTES":event.newData.NOTES,
    };
    console.log(data);
    this.sectionService.UpdateSample(this.sample_Id,data).subscribe((res)=>{
           console.log(res);
    });
  }

  onEditFullSample(event):void
  {
    console.log(event.newData);
    console.log(event.newData.SAMPLE_LENGTH);
    console.log("update");
    var data = {
      "CONCRETE_BLOCKS_COUNT": event.newData.CONCRETE_BLOCKS_COUNT,
      "MAIN_SRVC_OPENING_LENGTH": event.newData.MAIN_SRVC_OPENING_LENGTH,
      "MAIN_SRVC_OPENING_WIDTH":event.newData.NOTESMAIN_SRVC_OPENING_WIDTH,
      "PARKING_METHOD":event.newData.PARKING_METHOD,
    };
    console.log(data);
  //  this.sectionService.UpdateFullSample(this.sample_Id,data).subscribe((res)=>{
     ///      console.log(res);
        /*this.sectionService.GetSampleByLaneId(this.lane_id).subscribe((res)=>{  //this
            console.log(res);
            this.samples=res;
            this.source3.load(res);
        });*/
   // });

  }

  onEditConfirm(event):void {
    console.log(event);
    var data = {
      "INTER_SAMP_NO": event.newData.INTER_SAMP_NO,
      "INTERSEC_SAMP_AREA": event.newData.INTERSEC_SAMP_AREA,
      "NOTES": event.newData.NOTES,
    };
    console.log("UPDATE sample");
    console.log(data);
    console.log(event.data.INTER_SAMP_ID);
    console.log(event.data.INTER_SAMP_ID) ;    //  this.sample_no,this.intersectionId
    event.confirm.resolve(event.newData);
    //this.alertService.info('تم التعديل بنجاح');

  }

 /* registerationFormSample1:FormGroup=new FormGroup({
    SAMPLE_NO:new FormControl(null,[Validators.required,]),
    SAMPLE_LENGTH:new FormControl(null,[Validators.required]),
    SAMPLE_WIDTH:new FormControl(null,[Validators.required]),  //max on numbers 
    SAMPLE_AREA:new FormControl(null,[]),
  //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
});*/


registerationFormSample:FormGroup=new FormGroup({
  SAMPLE_LENGTH:new FormControl(null,[Validators.required]),
  SAMPLE_WIDTH:new FormControl(null,[Validators.required]),  

  PARKING_METHOD:new FormControl(null,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  U_TURN_LENGTH:new FormControl(null,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  U_TURN_WIDTH:new FormControl(null,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]), 
  CONCRETE_BLOCKS_COUNT:new FormControl(null,[Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  SPEED_BUMPS_COUNT:new FormControl(null,[]),
  SPEED_BUMPS_TRUE:new FormControl(null,[]),

  SPEED_BUMPS_ILLEGAL:new FormControl(null,[]),
  SPEED_BUMPS_LEGAL:new FormControl(null,[]),
  SIDEWALK_PAINT_TRUE:new FormControl(null,[]),  
  SIDEWALK_PAINT_GOOD:new FormControl(null,[]),
  CONCRETE_BLOCKS:new FormControl(null,[]),
  U_TURN_TRUE:new FormControl(null,[]),
  HANDICAPPED_SLOPE_GOOD:new FormControl(null,[]),
  HANDICAPPED_SLOPE_TRUE:new FormControl(null,[]),

});

UpdateRegisteration(data:FormGroup)
{
  console.log(this.SPEED_BUMPS_LEGAL);
  console.log(data.value)
  this.sectionService.UpdateFullSample2(this.sample_Id,data.value).subscribe((res)=>{
    console.log(res);
    if(res===true)
    {
      this.messageSuccess=true
    }
  });
}


   street(e)
   {
     console.log(e.target.value);
     this.StreetId=e.target.value;

     this.sectionService.GetSectionByStreetId(this.StreetId).subscribe((res)=>{
          console.log(res);
          this.Sections=res;
          this.links=false;
          this.firstTable=false;

          this.neighbour_usingMessage=false;
          this.laneandsamples=false;
          this.smaplesCheck=false;
          this.update1=false;
          this.update2=false;
          this.messageSuccess=false;
          this.neighbour_using=false;
     });

   }
   
   section(e)
   {
        console.log(e.target.value);
        this.SectionId=e.target.value;

        this.sectionService.GetSectionInfo(this.SectionId).subscribe((res)=>{
           console.log(res);
           this.SectionInfo=res;
           this.source1.load(this.SectionInfo);

           this.links=true;
           this.firstTable=true;

           this.laneandsamples=false;
           this.smaplesCheck=false;
           this.update1=false;
           this.update2=false;
           this.messageSuccess=false;
           this.neighbour_using=false;
           this.neighbour_usingMessage=false;

        }); 
   }

change1()
{
   //console.log(this.SPEED_BUMPS_LEGAL);
  // this. SPEED_BUMPS_LEGAL=!this.SPEED_BUMPS_LEGAL;
 this.SPEED_BUMPS_LEGAL='Y';
 console.log( this. SPEED_BUMPS_LEGAL);
}

  one()
  {
    console.log("one");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }

  two()
  {
    console.log("two");
    this.laneandsamples=false;
    this.massah=false;
    
    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }

  three()
  {
    console.log("three");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }
  x1:boolean=false;
  x2;


  four()
  {
    console.log("four");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;

    this.neighbour_using=true;
    this.neighbour_usingMessage=false;

    this.sectionService.GetAllSECTION_DETAILS(this.SectionId).subscribe((res)=>{
         this.sectionDetailsInfo=res;
         console.log(this.sectionDetailsInfo);
        // console.log(this.sectionDetailsInfo[0].HOUSES);
       //  console.log(this.sectionDetailsInfo[0].COMMERIAL);

         if(this.sectionDetailsInfo[0].HOUSES==="Y")
           {
             this.x1=true;
             console.log("yes Houses");
             console.log(this.x1);
             this.registerationForm4.controls.HOUSES.setValue(
             this.x1);
           }
           else
           {
            this.registerationForm4.controls.HOUSES.setValue(
              false);
           }


           if(this.sectionDetailsInfo[0].COMMERIAL==="Y")
           {
             this.x1=true;
             console.log("yes COMMERIAL");
             console.log(this.x1);
             this.registerationForm4.controls.COMMERIAL.setValue(
              this.x1);
           }
           else
           {
            this.registerationForm4.controls.COMMERIAL.setValue(
              false);
           }


           if(this.sectionDetailsInfo[0].INDISTERIAL==="Y")
           {
             this.x1=true;
             console.log("yes INDISTERIAL");
             console.log(this.x1);
             this.registerationForm4.controls.INDISTERIAL.setValue(
              this.x1);
           }
           else
           {
            this.registerationForm4.controls.INDISTERIAL.setValue(
              false);
           }


           if(this.sectionDetailsInfo[0].GARDENS==="Y")
           {
             this.x1=true;
             console.log("yes GARDENS");
             console.log(this.x1);
             this.registerationForm4.controls.GARDENS.setValue(
             this.x1);
           }
           else
           {
            this.registerationForm4.controls.GARDENS.setValue(
              false);
           }


           if(this.sectionDetailsInfo[0].REST_HOUSE==="Y")
           {
             this.x1=true;
             console.log("yes REST_HOUSE");
             console.log(this.x1);
             this.registerationForm4.controls.REST_HOUSE.setValue(
             this.x1);
           }
           else
           {
            this.registerationForm4.controls.REST_HOUSE.setValue(
              false);
           }


           if(this.sectionDetailsInfo[0].PUBLICS==="Y")
           {
             this.x1=true;
             console.log("yes PUBLICS");
             console.log(this.x1);
             this.registerationForm4.controls.PUBLICS.setValue(
             this.x1);
           }
           else
           {
            this.registerationForm4.controls.PUBLICS.setValue(
              false);
           }
           

    });
   
  /*  console.log(this.x1);
  this.registerationForm4.controls.HOUSE.setValue(
    this.x1);*/
  }

  five()
  {
    console.log("five");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }

  six()
  {
    console.log("six");
    this.laneandsamples=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }

  seven()
  {
    console.log("seven");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;
  }

  eight()  //8
  {
    console.log("eight");
    this.laneandsamples=false;
    this.massah=false;

    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
    this.neighbour_usingMessage=false;




  }


  GetAllLanes()
{
  this.smaplesCheck=false;
  this.sectionService.GetAllLanes(this.SectionId).subscribe((res)=>{
   console.log(res);
   this.lanes=res;
   this.source2.load(this.lanes);

  });
}

  nine()
  {
    console.log("nine");
    this.laneandsamples=true;
    this.massah=false;
    this.GetAllLanes();
    this.messageSuccess=false;
    this.neighbour_using=false;

    this.update1=false;   //new 19/3
    this.neighbour_usingMessage=false;
  }

  ten()
  {
    console.log("ten");
    this.laneandsamples=false;
    this.massah=true;

    this.messageSuccess=false;
  /*  SELECT        SURVEYOR_NO, SURVEYOR_NAME, SURVEYOR_WORK_ENDDATE, SURVEYOR_WORK_STARTDATE, SURVEYOR_PHONE_NO, SUSPENDED, USERNAME, "PASSWORD"
    FROM            SURVEYORS */
    // PRODUCTION_SURVEYOR
    this.neighbour_usingMessage=false;
    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.neighbour_using=false;
  }





// المساح 




 registerationForm:FormGroup=new FormGroup({

    SURVEYOR_ID:new FormControl(null,[Validators.required,]),
    ISSUE_DATE:new FormControl(null,[Validators.required,]),
    RECEIVE_DATE:new FormControl(null,[Validators.required]),
    NOTES:new FormControl(null,[Validators.required]),  //max on numbers 
   //    SURVEY_NO:new FormControl(null,[]),
  //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
});

SubmitRegisteration(form:FormGroup)
{
  console.log(form.value);
}



GetAllSurvevors()
{
     this.sectionService.GetAllSurvevors().subscribe((res)=>{
       this.AllSurvevors=res;
       console.log(this.AllSurvevors);
     });
}


GetSurvevorId(e)
{
    this.SurvevorId=e.target.value;
    console.log(this.SurvevorId);
}















//  الاستخدامات المجاورة 
registerationForm4:FormGroup=new FormGroup({
  HOUSES:new FormControl(false,[Validators.required]),  
  COMMERIAL:new FormControl(false,[Validators.required,]),
  INDISTERIAL:new FormControl(false,[Validators.required]),
  GARDENS:new FormControl(false,[Validators.required,]),
  REST_HOUSE:new FormControl(false,[Validators.required]),  
  PUBLICS:new FormControl(false,[Validators.required]),

//  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
});


SubmitRegisteration4(form:FormGroup)
{
  console.log(form.value);
  this.sectionService.UpdateSectionDetails(this.SectionId,form.value).subscribe((res)=>{
      console.log(res);
      this.neighbour_usingMessage=true;
  });
}







dropdownList = [];
selectedItems = [];
dropdownSettings = {
  
};

onItemSelect(item: any) {
  console.log(item);
 this.StreetId=item.STREET_ID
  console.log(this.StreetId);

  this.sectionService.GetSectionByStreetId(this.StreetId).subscribe((res)=>{
    console.log(res);
    this.Sections=res;
    this.links=false;
    this.firstTable=false;

    this.neighbour_usingMessage=false;
    this.laneandsamples=false;
    this.smaplesCheck=false;
    this.update1=false;
    this.update2=false;
    this.messageSuccess=false;
    this.neighbour_using=false;
});



}
onSelectAll(items: any) {
  console.log(items);
}






  ngOnInit(): void {


//المسارات والعينات

    this.sectionService.GetAllStreets().subscribe((res)=>{
      console.log(res);
      this.streets=res;
      console.log(this.streets);
      this.dropdownList =res;
      this.laneandsamples=false;
      this.smaplesCheck=false;
      this.update1=false;
      this.update2=false;
    });   

    //المساح


   // this.GetAllSurvevors();
    this.sectionService.GetAllSurvevors().subscribe((res)=>{
      this.AllSurvevors=res;
      console.log(this.AllSurvevors);
      console.log(res)
     
    });


          
    this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'STREET_ID',
      textField: 'ARNAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };


    
  }




// حفريات الخدمات  8

registerationForm8:FormGroup=new FormGroup({
  HOUSES:new FormControl(false,[Validators.required]),  
  COMMERIAL:new FormControl(false,[Validators.required,]),
  INDISTERIAL:new FormControl(false,[Validators.required]),
  GARDENS:new FormControl(false,[Validators.required,]),
  REST_HOUSE:new FormControl(false,[Validators.required]),  
  PUBLICS:new FormControl(false,[Validators.required]),

//  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
});


SubmitRegisteration8(form:FormGroup)
{
  console.log(form.value);
}

}
