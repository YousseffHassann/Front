import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DistressService } from '../../Services/distress.service';

import { Router } from '@angular/router';

import { LocalDataSource } from "ng2-smart-table";

import { SmartTableData } from "../../../@core/data/smart-table";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Console } from 'console';
import { SectionServiceService } from '../../Services/section-service.service';


@Component({
  selector: 'ngx-intersectiondistress',
  templateUrl: './intersectiondistress.component.html',
  styleUrls: ['./intersectiondistress.component.scss']
})
export class IntersectiondistressComponent implements OnInit {

  streets: any[] = [];
  intersections: any[] = [];
  lanes: any[] = [];
  samples: any[] = [];
  Distress: any[] = [];
  DistressAll: any[] = [];
  saviritydata: any[] = [];
  streetId: any;
  intersectionId: any;
  inter_no: any;
  sampleId: any;
  DIST_CODE: any;
  areas: any[] = new Array();
  checkClick: boolean = false;
  checkAdd: boolean = false;
  updateSample: boolean = false;
  date: boolean = false;
  sample_no: any;
  INTER_SAMP_ID: any;
  sampledata: any;
  surveyDate: any;
  sur_dates: any[] = [];
  serveyNumber: any;
  clickupsdatedataformbufrombutton: any[] = [];
  sample_area: any;
  DatesOfSurvey: any[] = [];
  DistressDate: any[] = [];
  intesectionInfo: any;
  IntersectionName: any;
  lanename: any;
  samplelength: any;
  samplewidth: any;
  ifInsertedDistress: boolean = false;
  DistressPci2Info: any[] = [];
  ShowDistressPci2Table: boolean = false;
  formdate: any;
  savirityname: any;
  inpteColor = false;
  appear: any;
  inter_samp_no: any;
  SURVEY_NO: any;
  //INTER_SAMP_NO:any;
  HideAdd: boolean = false;
  ErrorMessage: any;


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
        title: '   Se4ction Number',
        type: 'number',
      },

      INTEREC_STREET1: {
        title: '  Main Street',
        type: 'string',
      },

      INTEREC_STREET2: {
        title: 'To Street',
        type: 'string',
      },





    },
  };


  settings2 = {

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
      DIST_DENSITY: {
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
      DISTRESS_NOTES: {
        title: ' Notes ',
        type: 'string',
      },
      SURVEY_DATE: {
        title: '  Survey Date ',
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
      DIST_DENSITY: {
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
      DISTRESS_NOTES: {
        title: ' Notes ',
        type: 'string',
      },
      SURVEY_DATE: {
        title: '  Survey Date ',
        type: 'string',
      },


    },
  };


  settings4 = {

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
      custom: [{ name: 'ourCustomAction', title: '...' }],
      position: "left",

    },



    columns: {
      INTER_SAMP_NO: {
        title: 'Sample Number',
        type: 'number',
      },

      INTERSEC_SAMP_AREA: {
        title: ' Sample Area (m^2)',
        type: 'string',
      },
      NOTES: {
        title: ' Notes',
        type: 'string',
      },

    },
  };

  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();
  source4: LocalDataSource = new LocalDataSource();


  onCustomAction(event): void {
    console.log("Custome");
    this.GetDistressB7ySampleId(event.data.INTER_SAMP_NO, event.data.LENGTH, event.data.WIDTH, event.data.INTER_SAMP_ID, event.data.INTERSEC_SAMP_AREA);
    console.log(event.data.INTER_SAMP_NO);
    this.inter_samp_no = event.data.INTER_SAMP_NO
    this.INTER_SAMP_ID = event.data.INTER_SAMP_ID;
    console.log(this.INTER_SAMP_ID);

    // if(  this.samplewidth===' ' || this.samplewidth===' ')
    // {
    //        this.HideAdd=true;
    //        console.log("HideAddTrue");
    //        console.log(this.HideAdd);
    // }

  }



  onDeleteConfirm(event): void {

    /* if (window.confirm('Are you sure you want to delete?')) {
       event.confirm.resolve();
     } else {
       event.confirm.reject();
     }*/
    //this. GetDistressB7ySampleId(event.data.INTER_SAMP_NO,event.data.LENGTH,event.data.WIDTH,event.data.INTER_SAMP_ID);


  }


  onEditConfirm(event): void {
    console.log(event);
    var data = {
      "INTER_SAMP_NO": event.newData.INTER_SAMP_NO,
      "INTERSEC_SAMP_AREA": event.newData.INTERSEC_SAMP_AREA,
      "NOTES": event.newData.NOTES,
    };
    console.log("UPDATE sample");
    console.log(data);
    console.log(event.data.INTER_SAMP_ID);
    console.log(event.data.INTER_SAMP_ID);    //  this.sample_no,this.intersectionId
    event.confirm.resolve(event.newData);

    this.distressService.UpdateIntersectionSample(data, event.data.INTER_SAMP_NO, event.data.INTERSECTION_ID).subscribe((e) => {
      console.log(e);
    });




    //this.alertService.info('تم التعديل بنجاح');
  }






  constructor(private distressService: DistressService, private router: Router) {

  }
  Streets(e): any {

    this.streetId = e.target.value;
    console.log(this.streetId);
    console.log("streets");
    this.distressService.getIntersectionByStreetId(this.streetId).subscribe((res) => {
      console.log(res);
      this.intersections = res;
      //  this.source1.load(this.intersections)
      this.checkClick = false;  //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
      this.HideAdd = false;
    });

  }

  getIntesectionByStreetId(e): any {
    this.intersectionId = e.target.value;
    console.log("intersectionId");
    console.log(this.intersectionId);
    /* console.log("section Number");
     this.section_no=response.SECTION_NO;
     console.log(this.section_no);*/
    this.lanename = null //new
    this.samples = []; //new
    this.intersectioninfoByIntersectionId(this.intersectionId);
    //this.GetLanesByintersectionId(5);  // will dlete with select option 
    this.getsamplesByInterSectionId();
    this.ShowDistressPci2Table = false;
    console.log(this.ShowDistressPci2Table);

    this.surveyDate = ''; // nmew new 
    this.Distress = [];
    console.log(this.Distress);
    this.getdateData();
    this.date = false;
    this.checkAdd = false;
    this.checkClick = false;
    this.HideAdd = false;
  }



  intersectioninfoByIntersectionId(sid) {
    this.distressService.intersectioninfoByIntersectionId(sid).subscribe((res) => {
      console.log(res);
      this.intesectionInfo = res;
      this.source1.load(this.intesectionInfo);
      console.log(this.intesectionInfo);
      console.log(this.intesectionInfo[0].INTEREC_STREET1);
      this.IntersectionName = this.intesectionInfo[0].INTEREC_STREET1 + "+" + this.intesectionInfo[0].INTEREC_STREET1;
      this.inter_no = res[0].INTER_NO;
      console.log("INTER_NO");
      console.log(this.inter_no);


      this.checkClick = false;  //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
      this.HideAdd = false;
    });

  }


  /*GetLanesByintersectionId(e)
    {
        this.inpteColor=true;
        this.distressService.GetAllLanesBySectionId(63222).subscribe((response)=>{
        console.log(response);
        this.lanes=response;
        this.laneId=e.target.value;
        console.log(this.laneId);
        this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((res)=>{
        console.log(res);
        this.samples=res;
        console.log(this.samples[0].LANE_TYPE );
        this.lanename=this.samples[0].LANE_TYPE;
        this.surveyDate=''; //new new
        this.Distress=[];
        this.getdateData();
        this.date=false;
        this.checkAdd=false;
        this.checkClick=false;
        this.ShowDistressPci2Table=false;
        console.log(this.ShowDistressPci2Table);
        })
       });
    }*/


  getsamplesByInterSectionId() {
    this.distressService.getsamplesByIntersectionId(this.intersectionId).subscribe((res) => {
      console.log(res);
      this.samples = res;
      this.source4.load(res)
      console.log(this.samples);


      this.checkClick = false;//28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
    });
    this.HideAdd = false;
  }



  /* GettSampleByLaneId(e)
   {
    this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((response)=>{
    console.log(response);
    this.samples=response;
    //this.sampleId=e.target.value;
    console.log(this.sampleId);
    this.date=false;  //new
    console.log(this.samples);
    });
   }*/

  getsamplearea() {
    this.distressService.getsampleArea(this.sampleId).subscribe((area) => {
      console.log(area);
      // this.sample_area=area;
      // console.log(this.sample_area);
      this.HideAdd = false;
    });
  }

  my_dist_code(e) {
    this.DIST_CODE = e.target.value;
    console.log(this.DIST_CODE);
    // this.savirity(this.DIST_CODE);
    this.savirity();
  }


  res(e) {
    console.log(e.target.val);
  }





  savirity() {
    this.distressService.savirity(this.DIST_CODE).subscribe((data) => {
      console.log(data);
      this.saviritydata = data;
      console.log(this.saviritydata);
    });
  }












  GetDistressB7ySampleId(samplenumber, slength, swidth, inter_sample_id, s_area) {
    if (slength === '' || swidth === '') {
      this.HideAdd = true;
      console.log("HideAddTrue");
      console.log(this.HideAdd);
    }
    else {
      console.log(slength)
      this.HideAdd = false;
    }

    //console.log(slength)

    this.ShowDistressPci2Table = false;
    // this.getdateData();
    /* this.distressService.filterByDate22().subscribe((res)=>{    //this.INTER_SAMP_ID 504 get all survey no 
       console.log(res);
       this.DatesOfSurvey=res;
       console.log(this.DatesOfSurvey);
       this.source2.load(this.DatesOfSurvey);
     });*/

    this.sample_area = s_area;
    console.log(this.sample_area);


    this.distressService.GetMaxSurvey_noFrominterDistress().subscribe((res) => {   //this.INTER_SAMP_ID

      console.log(res);


      console.log(this.MyNewSurveyNumber);
      const newsurveyDate = this.MyNewSurveyNumber;
      console.log(this.SURVEY_NO);
      //let dateformate=newsurveyDate.format('MM/dd/YYYY');
      //  let dateformate=newsurveyDate.format('DD/MM/YYYY');    //this is true
      // console.log(dateformate); ///////////////////////////////////////
      //  this.surveyDate=dateformate;
      // this. survey_no=this.surveyDate;
      this.date = true;  //new

      this.surveyDate = this.MyNewSurveyNumber;   //nosurveydate its templete not  use it this mean survey_no
      this.date = true;  //new
      console.log(this.sampleId);
      this.SURVEY_NO = this.MyNewSurveyNumber;
      console.log(this.SURVEY_NO);

      // this.getdateData();  //new 19  down

      /*this.distressService.filterByDate22().subscribe((res)=>{    //this.INTER_SAMP_ID 504 get all survey no 
        console.log(res);
        this.DatesOfSurvey=res;
        console.log(this.DatesOfSurvey);
        this.source2.load(this.DatesOfSurvey);
      });*/

      this.distressService.getdateData22(inter_sample_id, this.MyNewSurveyNumber).subscribe((response) => {     ///////////////////////504 inter_sample_id
        console.log(response);
        this.DistressDate = response;
        console.log(this.DistressDate);


        // this.source2.load(this.DistressDate);
        this.getdateData();
        console.log(inter_sample_id);
        console.log(this.SURVEY_NO);

        this.checkClick = true;
        this.checkAdd = false;
        this.date = false;
        this.updateSample = false;
        this.samplelength = slength;
        this.samplewidth = swidth;

        // if( this.samplelength===' ')
        // {
        //   this.samplelength=0;
        // }
        // if( this.samplewidth===' ')
        // {
        //   this.samplewidth=0;
        // }

        // if(  this.samplewidth===' ' || this.samplewidth===' ')
        // {
        //        this.HideAdd=true;
        //        console.log("HideAddTrue");
        //        console.log(this.HideAdd);
        // }
        console.log("SAMPLE LENGTH  AND WIDTH ")
        this.INTER_SAMP_ID = inter_sample_id;
        this.inter_samp_no = samplenumber;
        console.log(this.inter_samp_no);
        console.log("interSampleId");
        console.log(this.INTER_SAMP_ID);
        console.log("sample length and length");
        console.log(this.samplelength);
        console.log(this.samplewidth);
        console.log("sample_area");
        // this.sample_area=this.samplelength*this.samplewidth;
        this.sampleId = this.Distress[0].SAMPLE_ID;
        this.sample_area = s_area;
        console.log(this.sample_area);

        console.log(this.samplelength);
        console.log(this.samplewidth);

        if (this.samplewidth === ' ' || this.samplewidth === ' ') {
          this.HideAdd = true;
          console.log("HideAddTrue");
          console.log(this.HideAdd);
        }

        //here







        console.log(this.sampleId);
        //this.sample_area=sampleArea;
        console.log(this.samplelength);
        //this.DatesOfSurvey=[];//new
        //this.DatesOfSurvey=[];//new
        //this.sur_dates=[];//new
        this.surveyDate = 'Invalid date';// new    ******************
        //this.getsamplearea();


        this.checkClick = false;//28
        this.checkAdd = false;
        this.date = false;
        this.ShowDistressPci2Table = false;


      })// this 2
    });




  }











  registerationForm: FormGroup = new FormGroup({
    DIST_CODE: new FormControl(null, [Validators.required,]),
    DIST_SEVERITY: new FormControl(null, [Validators.required]),
    DISTRESS_NOTES: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/)]),
    DIST_AREA: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    SURVEY_NO: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    SURVEY_DATE: new FormControl(null, [Validators.required,]),

    //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
  });

  updateForm: FormGroup = new FormGroup({
    INTERSEC_SAMP_AREA: new FormControl(null, [Validators.required,]),
    NOTES: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
  });

  SubmitRegisteration(forminfo: FormGroup) {
    //this.checkAdd=false;
    this.ShowDistressPci2Table = true;
    console.log(this.ShowDistressPci2Table);
    console.log(forminfo.value);
    console.log("clickedUpdateform");
    this.clickupsdatedataformbufrombutton = forminfo.value;
    console.log(this.clickupsdatedataformbufrombutton);
    console.log(this.clickupsdatedataformbufrombutton['DIST_CODE']);

    //can deleted
    console.log(forminfo.value);
    console.log(forminfo.value.SURVEY_DATE);
    const date = moment(forminfo.value.SURVEY_DATE);
    let formate = date.format('DD/MM/YYYY'); // this is true
    //  let formate=date.format('MM/DD/YYYY HH:mm');    //here is the problem in date 
    console.log(formate);
    this.formdate = forminfo.value.SURVEY_DATE;
    forminfo.value.SURVEY_DATE = formate;
    console.log(forminfo.value.SURVEY_DATE);

    //length,width
    console.log(length)
    console.log("length")

    this.distressService.insertIntersectionDistress(this.clickupsdatedataformbufrombutton['DIST_CODE'], this.INTER_SAMP_ID, this.inter_samp_no,
      this.clickupsdatedataformbufrombutton['SURVEY_DATE'], this.clickupsdatedataformbufrombutton['SURVEY_NO'],
      this.clickupsdatedataformbufrombutton['DIST_SEVERITY'], this.clickupsdatedataformbufrombutton['DIST_AREA'],
      this.samplelength, this.samplewidth, this.inter_no, this.clickupsdatedataformbufrombutton['DISTRESS_NOTES'], "user", this.intersectionId, 555, this.streetId).subscribe((data) => {
        console.log(data);
        this.ifInsertedDistress = true;
        console.log(this.ifInsertedDistress);  //this 7  5











        //filterByDate2AfterInsert
        //filterByDate2AfterInsert    this
        //getDistressByIntesectionSampleId
        //getdateData2  filterByDate2AfterInsert2
        this.distressService.filterByDate2AfterInsert2(this.INTER_SAMP_ID).subscribe((dis) => {   // will Be Here ******************* this.INTER_SAMP_ID  addedappear 
          console.log(dis);
          this.DistressPci2Info = dis;
          console.log(this.DistressPci2Info);
          this.source3.load(this.DistressPci2Info);    //THIS source3
        },);

        this.distressService.getdateData22(this.INTER_SAMP_ID, this.MyNewSurveyNumber).subscribe((response) => {     ///////////////////////504 inter_sample_id
          console.log(response);
          this.DistressDate = response;
          console.log(this.DistressDate);

          this.source2.load(this.DistressDate);  //19  Show Direct When Adding 
          this.checkAdd = false;
          this.ErrorMessage = '';
          forminfo.reset();


        },);
      }, err => {
        console.log(err.error);
        this.ErrorMessage = err.error;
        //forminfo.reset();
      });




    this.clickupsdatedataformbufrombutton['SURVEY_NO'] = this.MyNewSurveyNumber;
    this.date = true;
  }

  getSurveydateBySampleId(e) {

    this.registerationForm.controls.SURVEY_NO.setValue(
      this.SURVEY_NO
    );

    this.distressService.filterByDate22().subscribe((res) => {    //this.INTER_SAMP_ID 504 get all survey no   updated in 20/2 top of 7function for chooce survey_no
      console.log(res);
      this.DatesOfSurvey = res;
      console.log(this.DatesOfSurvey);

      this.source2.load(this.DatesOfSurvey);

      const date = e.target.value;
      this.SURVEY_NO = date;
      console.log(this.SURVEY_NO);

      console.log(this.DatesOfSurvey);

      //  this.source2.load(this.DatesOfSurvey);


      this.registerationForm.controls.SURVEY_NO.setValue(
        this.SURVEY_NO
      );

      this.date = true;
      this.getdateData();
      console.log(this.SURVEY_NO);
    });
    // this.getdateData();
    this.date = true;
  }

  getdateData() {

    // this.distressService.getdateData22(this.INTER_SAMP_ID,this.SURVEY_NO).subscribe((res)=>{  //this.surveyDate  this.INTER_SAMP_ID  504
    // console.log(res);
    // this.DistressDate=res;
    console.log(this.MyNewSurveyNumber);
    console.log("NewSurveyNumber");
    this.distressService.getdateData22(this.INTER_SAMP_ID, this.MyNewSurveyNumber).subscribe((res) => {  //this.surveyDate  this.INTER_SAMP_ID  504
      console.log(res);
      this.DistressDate = res;

      if (res) {
        this.source2.load(this.DistressDate);
        console.log(this.DistressDate);
        //console.log(this.surveyDate);  //this is survey_no 
        console.log(this.SURVEY_NO);

        console.log("Im not Null vALUE");
      }
      else {
        this.source2.load([]);
        this.date = true;
        this.checkClick = true;
      }






      console.log(this.DistressDate);


    });


  }

  submitupdateSampleFunction(forminfo: FormGroup)           /////////////////////////////
  {
    console.log(forminfo.value);
    this.distressService.UpdateIntersectionSample(forminfo.value, this.sample_no, this.intersectionId).subscribe((res) => {
      console.log(res);
      console.log(forminfo.value);
      this.getsamplesByInterSectionId();
    });
    forminfo.reset();
    this.updateSample = false;
  }











  getsampledatainput() //////////////////////////////
  {
    this.distressService.getIntersectionSampleBySampleNomer(this.sample_no, this.intersectionId).subscribe((response) => {
      console.log(response);
      console.log(response[0].INTERSEC_SAMP_AREA);
      this.sampledata = response;
      console.log(this.sampledata);
      this.updateForm.controls.NOTES.setValue(
        this.sampledata[0].NOTES);
      this.updateForm.controls.INTERSEC_SAMP_AREA.setValue(
        this.sampledata[0].INTERSEC_SAMP_AREA);
      console.log("this is getfunction");
      //this.registerationForm.get("ROLE")?.setValue(this.roledata[0].ROLE)
    });
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

  openForm() {
    this.checkAdd = true;
    // this.checkClick=false;
    this.updateSample = false;
    //  this.date=false;
    //  this.ShowDistressPci2Table=false;   ********************

    this.registerationForm.controls.SURVEY_NO.setValue(
      this.SURVEY_NO
    );

    //will get surveynumberanddate 
  }

  clickUpdate(sampleNumber) {
    this.sample_no = sampleNumber;
    this.updateSample = true;
    console.log(this.sample_no);
    this.getsampledatainput();
    this.checkClick = false;
    this.checkAdd = false;
    this.date = false;
    this.ShowDistressPci2Table = false;
  }






























  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {

  };

  onItemSelect(item: any) {
    console.log(item);
    this.streetId = item.STREET_ID

    console.log(this.streetId);

    this.distressService.getIntersectionByStreetId(this.streetId).subscribe((res) => {
      console.log(res);
      this.intersections = res;
      //  this.source1.load(this.intersections)
      this.checkClick = false;  //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
      this.HideAdd = false;
    });



  }
  onSelectAll(items: any) {
    console.log(items);
  }












  MyNewSurveyNumber: any;




  ngOnInit(): void {


    console.log(localStorage.getItem('surveynumber'));
    this.MyNewSurveyNumber = localStorage.getItem('surveynumber')
    console.log(this.MyNewSurveyNumber);

    this.distressService.AllStreests().subscribe((response) => {
      console.log(response);
      this.streets = response;
      this.dropdownList = response;
      console.log(this.streets[0].ARNAME);
    });
    console.log(this.checkClick);

    this.distressService.DistressAll().subscribe((dis) => {
      console.log(dis);
      this.DistressAll = dis;
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
      closeDropDownOnSelection: true
      //defaultOpen:true,
    };

  }

}
