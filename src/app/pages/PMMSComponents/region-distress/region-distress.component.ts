
import { NgIf } from '@angular/common';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DistressService } from '../../Services/distress.service';
import * as moment  from 'moment';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-region-distress',
  templateUrl: './region-distress.component.html',
  styleUrls: ['./region-distress.component.scss']
})
export class RegionDistressComponent implements OnInit {
  municipalities:any[]=[];
  MunicipalityId:any;
  District_Id:any;
  Districts:any[]=[];
  regions:any[]=[];
  sections:any[]=[];
  streets:any[]=[];
  samples:any[]=[];
  Distress:any[]=[];
  streetsofregion:any[]=[];
  DistressAll:any[]=[];
  saviritydata:any[]=[];
  regionId:any;
  sectionId:any;
  region_no:any;
  street_no:any;
 // streetId:any;
  RStreetId:any;
  sampleId:any;
  DIST_CODE:any;
  areas:any[]=new Array();
  checkClick:boolean=false;
  checkAdd:boolean=false;
  updateSample:boolean=false;
  date:boolean=false;
  sample_no:any;
  sampledata:any;
  surveyDate:any;
  sur_dates:any[]=[];
  serveyNumber:any;
  clickupsdatedataformbufrombutton:any[]=[];
  sample_area:number;
  passed_area:any=0;
  DatesOfSurvey:any[]=[];
  DistressDate:any[]=[];
  regionInfo:any;
  REGION_NAME:any;
  lanename:any;
  samplelength:any;
  samplewidth:any;
  ifInsertedDistress:boolean=false;
  DistressPci2Info:any[]=[];
  ShowDistressPci2Table:boolean=false;
  formdate:any;
  savirityname:any;
  inpteColor=false;
  SURVEY_NO :any;
  




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
        title: '    Region Number  ',
        type: 'number',
      },
      MUNIC_NAME: {
        title: ' Municipality ',
        type: 'string',
      },
      ARNAME: {
        title: '  Region Name',
        type: 'string',
      },
   

    
    },
  };

  settings2 = {
    
    /*add: {
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

  /*  delete: {
      deleteButtonContent: '<i class="nb-home"></i>',
    //  confirmDelete: true,
    },*/

  /*  custom: [
     { name: 'viewrecord', title: '<i class="fa fa-home"></i>'},
     //{ name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
   ],*/



   //  mode: "internal",

   // hideSubHeader: true,
    actions: {
     //columnTitle: 'Actions',

      delete: false,
     // edit: false,
      add: false,
      custom: [{ name: 'ourCustomAction', title: ' ...' }],
      position: "left",
   
    },

  

    columns: {
      SECOND_ST_NO: {
        title: '    SECOND_ST_NO',
        type: 'number',
      },
      ARNAME: {
        title: ' Street Name ',
        type: 'number',
      },
      
      LENGTH: {
        title: '   LENGTH',
        type: 'string',
      },
      WIDTH: {
        title: '   WIDTH',
        type: 'number',
      },
      AR: {
        title: ' (m^2) Area',
        type: 'string',
      },
      NOTES: {
        title: ' NOTES',
        type: 'string',
      },
    
    },
  };

  settings3 = {

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },

    columns: {
      DISTRESS_EN_TYPE: {
        //  title: ' اسم ورمز العيب ',
        title: '  Distress Code',
         type: 'number',
       },
       DIST_SEVERITY: {
         title: '  Savirity',
         type: 'string',
       },
       DIST_AREA: {
         title: ' Area (m^2)',
         type: 'string',
       },
       DIST_DENSITY : {
         title: 'Density ',
         type: 'string',
       },

       DEDUCT_VALUE: {
        //  title: 'نقاط الحسم ',
         title: ' Deduct Value ',
         type: 'number',
       },
       DIST_DENSITY_UPD: {
         title: '  Density ',
         type: 'string',
       },
       DEDUCT_DEN_DASH_UPD: {
        //  title: 'معامل التصحيح الكلي ',
        title: '  Density Update ',
         type: 'string',
       },
       DISTRESS_NOTES : {
         title: ' Notes ',
         type: 'string',
       },
       SURVEY_DATE : {
        title: '  Survey Date ',
        type: 'string',
      },
 
     
     },
  };



  source1: LocalDataSource = new LocalDataSource(); 
  source2:LocalDataSource=new LocalDataSource();
  source3:LocalDataSource=new LocalDataSource();
  

  onDeleteConfirm(event): void {

   if (window.confirm('Are you sure you want to delete?')) {
     event.confirm.resolve();
   } else {
     event.confirm.reject();
   }

 }





    constructor(private distressService:DistressService) { 
  
    }
    
    Regions(e):any
    {
        this.regionId=e.target.value;
        console.log(this.regionId);
        console.log("regionId");
        this.regionInfoByRegionId(this.regionId);
        this.updateSample=false;
    }

  regionInfoByRegionId(regionId)
  {
    this.distressService.GetRegionInfoByRegionId(regionId).subscribe((res)=>{
          console.log(res);
          this.regionInfo=res;
          console.log(this.regionInfo);
          console.log(this.regionInfo[0].SECOND_ST_NO);
          this.REGION_NAME= this.regionInfo[0].ARNAME;
          console.log("region  Number");
          this.region_no=res[0].REGION_NO;
          console.log(this.region_no);
          this.source1.load(this.regionInfo);
          
          this.distressService.GetAllStreetsByRegionId(regionId).subscribe((res)=>{
            console.log(res);
            this.streetsofregion=res;
            this.source2.load(res);
            console.log("streets");
            console.log(this.streetsofregion);
      


            this.checkClick=false;
            this.checkAdd=false;
            this.date=false;
            this.ShowDistressPci2Table=false;
          });
    });
  }
  
  
   getsamplearea()
   {
        this.distressService.getsampleArea(this.sampleId).subscribe((area)=>{
        console.log(area);
       // this.sample_area=area;
       // console.log(this.sample_area);
     });
   }
  
  my_dist_code(e)
  {
    this.DIST_CODE=e.target.value;
    console.log(this.DIST_CODE);
   // this.savirity(this.DIST_CODE);
   //this.savirity();
  }
  
  savirity()
  {
      this.distressService.savirity(this.DIST_CODE).subscribe((data)=>{
      console.log(data);
      this.saviritydata=data;
      console.log(this.saviritydata);
    });
  }
  
   GetDistressB7ySampleId(streetId,area,street_no,streetlength,streetwidth)
   {
   // this.ShowDistressPci2Table=false;

    console.log("StreetId");
    console.log(streetId);
    console.log("area");
    console.log(area);
  
    console.log("Street LengthAnd Width");
    this.samplelength=streetlength;
    this.samplewidth=streetwidth;
    console.log(this.samplewidth);
    console.log(this.samplelength);

    this.RStreetId=streetId;
    this.street_no=street_no;

    this.distressService.filterByDate11().subscribe((res)=>{  //15/2
      this.DatesOfSurvey=res;
      console.log(this.DatesOfSurvey);
      this.source3.load(res);
    });
    
    this.distressService.GetMaxSurveyNoFromDistress().subscribe((res)=>{      //need update here for sample_id and date
      console.log(res);
      console.log(res[0].MAXSURVEY_NO);//MAXDATE ///////////////////
      const newsurveyDate=res[0].MAXSURVEY_NO;
      this.surveyDate=newsurveyDate;   //nosurveydate its templete not  use it this mean survey_no
      this.date=true;  //new
      console.log(this.sampleId);
      this.SURVEY_NO=newsurveyDate;
      this.getdateData();  //new

      /*this.distressService.filterByDate11().subscribe((res)=>{
        console.log(res);
        this.DatesOfSurvey=res;
        console.log(this.DatesOfSurvey);
      });*/  //15/2

//15/2
      this.distressService.GetDistressByStreetIdAndSurveyNo(this.RStreetId ,this.SURVEY_NO).subscribe((response)=>{   //this.RStreetId  will be by this.SURVEY_NO 62974
        console.log(response);
        this.Distress=response;
        console.log(this.Distress);
        this.source3.load(this.Distress); // can delete 
 
        this.checkClick=true;
        this.checkAdd=false;
        this.date=false;
        this.updateSample=false;
        console.log(response);
        this.DistressDate=response;
        console.log(this.DistressDate);
        //can Delete It 12/2
        this.Distress=response;  //By Ahmed 12
        console.log(this.Distress);
        this.source3.load(this.Distress);
        console.log("streetNUMBER");
        this.street_no=street_no;
        console.log(this.street_no);
        //this.sampleId=this.Distress[0].SAMPLE_ID; 
          console.log("streetId");
      console.log(this.RStreetId);  //////////////////////////
      this.sample_area=area;
      console.log("Sample Area");
      console.log(this.sample_area);
    
      this.surveyDate='Invalid date';// new******************
      //this.getsamplearea();
        });
      

    });

 
   /* this.distressService.GetDistressBySurvey_NoAndStreetId(this.RStreetId ,this.SURVEY_NO).subscribe((response)=>{   //this.RStreetId  will be by this.SURVEY_NO 62974
    console.log(response);
    this.Distress=response;
    console.log(this.Distress);
    this.checkClick=true;
    this.checkAdd=false;
    this.date=false;
    this.updateSample=false;
    console.log(response);
    this.DistressDate=response;
    console.log(this.DistressDate);
    //can Delete It 12/2
    this.Distress=response;  //By Ahmed 12
    console.log(this.Distress);
    console.log("streetNUMBER");
    this.street_no=street_no;
    console.log(this.street_no);
    //this.sampleId=this.Distress[0].SAMPLE_ID; 
      console.log("streetId");
  console.log(this.RStreetId);  //////////////////////////
  this.sample_area=area;
  console.log("Sample Area");
  console.log(this.sample_area);

  this.surveyDate='Invalid date';// new******************
  //this.getsamplearea();
    });*/  //15/2
    
   }

   getSArea()
   {
    console.log(this.sample_area);
    return this.sample_area;
   }
  
   registerationForm:FormGroup=new FormGroup({
            DIST_CODE:new FormControl(null,[Validators.required,]),
            DIST_SEVERITY:new FormControl(null,[Validators.required]),
            DISTRESS_NOTES:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(20)]),  //max on numbers 
            DIST_AREA:new FormControl(null,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            SURVEY_NO:new FormControl(null,[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
            SURVEY_DATE:new FormControl(null,[Validators.required,]),
  
          //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
       });
       
      updateForm:FormGroup=new FormGroup({
                SAMPLE_LENGTH:new FormControl(null,[Validators.required,]),
                SAMPLE_WIDTH:new FormControl(null,[Validators.required]),
                NOTES:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(60)]),
    });
      SubmitRegisteration(forminfo:FormGroup)
      {
         this.checkAdd=false;
         this.ShowDistressPci2Table=true;
         console.log(this.ShowDistressPci2Table);
         console.log(forminfo.value);
         console.log("clickedUpdateform");
         this.clickupsdatedataformbufrombutton=forminfo.value;
         console.log(this.clickupsdatedataformbufrombutton);
         console.log(this.clickupsdatedataformbufrombutton['DIST_CODE']);
        
  
  //can deleted
      console.log(forminfo.value);
      console.log(forminfo.value.SURVEY_DATE);
      const date=moment(forminfo.value.SURVEY_DATE);
      let formate=date.format('DD/MM/YYYY');
      //let formate=date.format('MM/DD/YYYY  HH:mm');
      console.log(formate);
      this.formdate=forminfo.value.SURVEY_DATE;
      forminfo.value.SURVEY_DATE=formate;
      console.log(forminfo.value.SURVEY_DATE);
  
  this.distressService.insertrDistressForRegion({
    
              "surveyDate":this.clickupsdatedataformbufrombutton['SURVEY_DATE'],
              "surveyNo": this.clickupsdatedataformbufrombutton['SURVEY_NO'] ,
              "distressCode" :   this.clickupsdatedataformbufrombutton['DIST_CODE'],
              "severity":this.clickupsdatedataformbufrombutton['DIST_SEVERITY'],
              "distArea": this.clickupsdatedataformbufrombutton['DIST_AREA']
              ,"notes":this.clickupsdatedataformbufrombutton['DISTRESS_NOTES']
              ,"SAMPLE_LENGTH":"5"//this.samplelength
              ,"SAMPLE_WIDTH":"6"//this.samplewidth
              ,"regionNo":this.region_no
             // ,"LANETYPE":this.lanename
              ,"regionID":this.regionId
              ,"streetID":this.RStreetId
             // ,"dist_id":78945
            //  ,"user":"ahmed abdo"
             // ,"userID":9

  }).subscribe((data)=>{
         console.log(data);
         this.ifInsertedDistress=true;
         console.log(this.ifInsertedDistress);
         console.log(this.sampleId);
         console.log(this.regionId)
            //GetDistressBySampleId
         this.distressService.getAllDistressPci2BySampleId(this.regionId).subscribe((dis)=>{  //this.sampleId
          console.log(dis);
          this.DistressPci2Info=dis;
 
          console.log(this.DistressPci2Info);

          //here 
            
  this.getdateData();


         }, err=>{
          console.log(err.error)}  );
  });
         forminfo.reset();  
         this.date=true;
  }
  
  getSurveydateBySampleId(e)
  {
    /*  this.distressService.filterByDate11().subscribe((res)=>{
           console.log(res);
           this.DatesOfSurvey=res;
           console.log(this.DatesOfSurvey);*/

           const date=e.target.value;

//this.Distress=res;


          // let formate=date.format('D/M/YYYY');
         //  console.log(formate);
           this.surveyDate= e.target.value;
         //this.surveyDate= e.target.value;
           console.log(this.surveyDate );
           this.SURVEY_NO=this.surveyDate;
           console.log(this.SURVEY_NO);
           this.registerationForm.controls.SURVEY_NO.setValue(
           this.SURVEY_NO);
           console.log(this.SURVEY_NO);
           this.date=true;
           this.getdateData();
    //  });
      this.date=true;
  }
  
  getdateData()
  {
  if(this.surveyDate!=null && this.surveyDate!='اختيار')
  {
      //this.distressService.getdateData(this.sampleId,this.surveyDate).subscribe((res)=>{
        this.distressService.GetDistressByStreetIdAndSurveyNo(this.RStreetId ,this.SURVEY_NO).subscribe((res)=>{   // this.RStreetId ,this.SURVEY_NO 62974,1
        console.log(res);
        this.DistressDate=res;
   if(res)
   {
    const data = this.DistressDate;
    this.source3.load(data);
    console.log(this.DistressDate);
   }
     else
     {
      this.source3.load([]);
      this.date=true;
      this.checkClick=true;
      console.log(this.DistressDate);
     }
            console.log(this.DistressDate);
        });
  }
  }
  

  onCustomAction(event):void{
    console.log("Custome");
    this. GetDistressB7ySampleId(event.data.STREET_ID,event.data.AR,event.data.SECOND_ST_NO,event.data.LENGTH,event.data.WIDTH);
   }

      submitupdateSampleFunction(forminfo:FormGroup)
      {
          console.log(forminfo.value);
          this.distressService.UpdateStreetByStreetId(forminfo.value,this.RStreetId).subscribe((res)=>{
          console.log(res);
          console.log(forminfo.value);
          this.distressService.GetAllStreetsByRegionId(this.regionId).subscribe((response)=>{
          console.log(response);

          this.streetsofregion=response;
          console.log("streets");
          console.log(this.streetsofregion);

           });
        });
        forminfo.reset();
        this.updateSample=false;
      }
  
      getsampledatainput()
      {
          this.distressService.GetStreetByStreetId(this.RStreetId).subscribe((response)=>{
          console.log(response);
          console.log(response[0].WIDTH);
          this.sampledata=response;
          console.log(this.sampledata);
          this.updateForm.controls.NOTES.setValue(
          this. sampledata[0].NOTES);
          this.updateForm.controls.SAMPLE_LENGTH.setValue(
          this. sampledata[0].LENGTH);
          this.updateForm.controls.SAMPLE_WIDTH.setValue(
          this. sampledata[0].WIDTH);
           console.log("this is getfunction");
           //this.registerationForm.get("ROLE")?.setValue(this.roledata[0].ROLE)
        })
      }
  
      /*getAllDistressPci2BySampleId()
      {
         this.distressService.getAllDistressPci2BySampleId(this.sampleId).subscribe((dis)=>{
             console.log(dis);
             this.DistressPci2Info=dis;
             console.log(this.DistressPci2Info);
         });
        this.ShowDistressPci2Table=true;
      }
  */
  
      openForm()
      {
       this. getSArea();
        this.checkAdd=true;
       // this.checkClick=false;
        //this.updateSample=false;
       // this.date=false;
          this.ShowDistressPci2Table=false;
        //will get surveynumberanddate 
          this.registerationForm.controls.SURVEY_NO.setValue(
          this.SURVEY_NO);
          console.log(this.SURVEY_NO);
          console.log("passedArea");
          this.passed_area=this.sample_area;
          console.log(this.passed_area);
      }
  
      clickUpdate(STREETID)
      {
         this.RStreetId=STREETID;
         this.updateSample=true;
         console.log(this.RStreetId);
         this.getsampledatainput();
         this.checkClick=false;
         this.checkAdd=false;
         this.date=false;
         this.ShowDistressPci2Table=false;
      }


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
      });

      }

  
    ngOnInit(): void {

        /* this. distressService.GetAllRegions().subscribe((response)=>{
         console.log(response);
         this.regions=response;
         console.log(this.regions[0].ARNAME);
      });*/


      this.distressService.GetAllMunicipality().subscribe((res)=>{
      console.log(res);
      this.municipalities=res;

      });



     console.log(this.checkClick);
  
    this.distressService.DistressAll().subscribe((dis)=>{
         console.log(dis);
         this.DistressAll=dis;
    });
     
    }
}
