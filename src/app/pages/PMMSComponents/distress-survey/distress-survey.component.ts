import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import * as moment from 'moment';
import { format } from 'path';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Console, error } from 'console';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DistressService } from '../../Services/distress.service';
@Component({
  selector: 'ngx-distress-survey',
  templateUrl: './distress-survey.component.html',
  styleUrls: ['./distress-survey.component.scss']
})
export class DistressSurveyComponent implements OnInit {
  streets: any[] = [];
  sections: any[] = [];
  lanes: any[] = [];
  samples: any[] = [];
  Distress: any[] = [];
  DistressAll: any[] = [];
  saviritydata: any[] = [];
  streetId: any;
  sectionId: any;
  section_no: any;
  laneId: any;
  sampleId: any;
  DIST_CODE: any;
  areas: any[] = new Array();
  checkClick: boolean = false;
  checkAdd: boolean = false;
  updateSample: boolean = false;
  date: boolean = false;
  sample_no: any;
  sampledata: any;
  surveyDate: any;
  sur_dates: any[] = [];
  serveyNumber: any;
  clickupsdatedataformbufrombutton: any[] = [];
  sample_area: number;
  passed_area: any = 0;
  DatesOfSurvey: any[] = [];
  DistressDate: any[] = [];
  sectioninfo: any;
  sectionName: any;
  lanename: any;
  samplelength: any;
  samplewidth: any;
  ifInsertedDistress: boolean = false;
  DistressPci2Info: any[] = [];
  ShowDistressPci2Table: boolean = false;
  formdate: any;
  savirityname: any;
  inpteColor = false;
  SURVEY_NO: any;
  ErrorResponse: any;


  constructor(private service: SmartTableData, private distressService: DistressService) {

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
      MUNICIPALITY: {
        title: ' Municipality',
        type: 'number',
      },
      DISTRICT: {
        title: ' District',
        type: 'string',
      },
      MAIN_ST_TITLE: {
        title: ' Main Street',
        type: 'string',
      },
      SEC_DIRECTION: {
        title: 'Direction ',
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
      SEC_LENGTH: {
        title: 'Length ',
        type: 'string',
      },
      SECTION_NO: {
        title: ' Section Number ',
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
      edit: false,   //delete 
      add: false,
      custom: [{ name: 'ourCustomAction', title: ' ...' }],
      position: "left",

    },


    columns: {
      SAMPLE_NO: {
        title: '   Sample number',
        type: 'number',
      },

      SAMPLE_LENGTH: {
        title: '   Length',
        type: 'string',
      },
      SAMPLE_WIDTH: {
        title: '   Width',
        type: 'number',
      },
      AR: {
        title: '   Area (m^2)',
        type: 'string',
      },
      NOTES: {
        title: ' Notes',
        type: 'string',
      },

    },
  };


  settings5 = {

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
      SAMPLE_NO: {
        title: '   Sample number',
        type: 'number',
      },

      SAMPLE_LENGTH: {
        title: '   Length',
        type: 'string',
      },
      SAMPLE_WIDTH: {
        title: '   Width',
        type: 'number',
      },
      AR: {
        title: '   Area (m^2)',
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
  source5: LocalDataSource = new LocalDataSource();
  onCustomAction(event): void {
    console.log("Custome");
    this.GetDistressB7ySampleId(event.data.SAMPLE_ID, event.data.SAMPLE_NO, (event.data.SAMPLE_LENGTH * event.data.SAMPLE_WIDTH), event.data.SAMPLE_LENGTH, event.data.SAMPLE_WIDTH);
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



  onDeleteConfirm2(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }












  Streets(e): any {
    this.streetId = e.target.value;
    console.log(this.streetId);
    console.log("streets");
    this.distressService.GetSectionByStreetId(this.streetId).subscribe((res) => {
      console.log(res);
      this.sections = res;



      this.checkClick = false;  //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
    });


  }

  getSectionByStreetId(e): any   //here 
  {


    //errorn delete it 





    this.sectionId = e.target.value;
    console.log("SectionId");
    console.log(this.sectionId);
    /* console.log("section Number");
     this.section_no=response.SECTION_NO;
     console.log(this.section_no);*/
    this.lanename = null //new
    this.samples = []; //new
    this.sectioninfobysectionid(this.sectionId);
    // this.GetLanesBySectionId(5);  // will dlete with select option 
    // this.GetLanesBySectionId(this.sectionId);  // will dlete with select option 
    this.ShowDistressPci2Table = false;
    console.log(this.ShowDistressPci2Table);
    this.surveyDate = ''; // nmew new 
    this.Distress = [];
    console.log(this.Distress);
    this.getdateData();
    this.date = false;
    this.checkAdd = false;
    this.checkClick = false;

    this.ShowDistressPci2Table = false;


  }


  sectioninfobysectionid(sid) {

    this.distressService.getsectioninfoBysectionId(sid).subscribe((res) => {
      console.log(res);
      this.sectioninfo = res;

      const data = this.sectioninfo;
      this.source1.load(data);     //this Only section

      console.log(this.sectioninfo);
      console.log(this.sectioninfo[0].FROM_STREET);
      this.sectionName = this.sectioninfo[0].FROM_STREET;
      console.log("section Number");
      this.section_no = res[0].SECTION_NO;
      console.log(this.section_no);


      this.checkClick = false;   //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;

      this.distressService.GetAllLanesBySectionId(this.sectionId).subscribe((res) => {
        console.log(res);
        this.lanes = res;
        console.log("*******************")
        console.log(this.lanes)

        //12/4 can delete
        console.log(this.lanes[0].LANE_TYPE);
        //this.lanename=this.lanes[0].LANE_TYPE;




        this.checkClick = false;  //28
        this.checkAdd = false;
        this.date = false;
        this.ShowDistressPci2Table = false;

        this.laneId = null
      });
    });
  }
  hd: boolean = false;

  GetLanesBySectionId(e)    //88888
  {
    console.log("*******************")
    console.log(this.lanes)
    console.log("*******************")
    console.log(this.lanes)

    this.inpteColor = true;
    //   this.distressService.GetAllLanesBySectionId(this.sectionId).subscribe((response)=>{
    // console.log(response);
    //  this.lanes=response;
    console.log(e);
    // this.laneId=e.target.value;
    this.laneId = e;   //in new radiio update 10-5

    // console.log(e);
    console.log(this.laneId);
    console.log(this.lanename);

    this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((res) => {
      console.log(res)
      if (res) {
        this.source5.load(res);
        console.log(this.laneId)
        console.log(this.lanename)
        this.hd = true
      }
      else if (res === null) {
        res = [{}]
        this.Distress = [];
        console.log(res)
        this.source5.load(res);
        this.hd = false;
      }
      this.distressService.GetLanTypeByLanId(this.laneId).subscribe((res) => {
        console.log(res[0].LANE_TYPE);
        this.lanename = res[0].LANE_TYPE
        console.log(this.lanename);

      });



      this.surveyDate = ''; //new new
      this.Distress = [];
      //   this.getdateData();  //test tommoro
      this.date = false;
      this.checkAdd = false;
      this.checkClick = false;
      this.ShowDistressPci2Table = false;
      console.log(this.ShowDistressPci2Table);

      this.checkClick = false;    //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;




    })


    //         this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((res)=>{     12/4  willm appeare here But For Test On ly
    //         console.log(res);
    //         this.source4.load(res);
    //         this.samples=res;
    //         console.log(this.laneId);
    //         console.log(this.lanename);
    // //real
    //         console.log(this.samples[0].LANE_TYPE );
    //         this.lanename=this.samples[0].LANE_TYPE;


    //         this.surveyDate=''; //new new
    //         this.Distress=[];
    //         this.getdateData();  //test tommoro
    //         this.date=false;
    //         this.checkAdd=false;
    //         this.checkClick=false;
    //         this.ShowDistressPci2Table=false;
    //         console.log(this.ShowDistressPci2Table);

    //         this.checkClick=false;    //28
    //         this.checkAdd=false;
    //         this.date=false;
    //         this.ShowDistressPci2Table=false;
    //   //this.date=false; //new
    //   //this.Distress=[];//new//new
    //   //this.DistressAll=[];//new
    //   //this.DatesOfSurvey=[];//new
    //   //this.DatesOfSurvey=[];//new
    //   //this.sur_dates=[];//new
    //   //this.surveyDate=null;// new

    //         // this.GettSampleByLaneId(this.laneId); //////////////////


    //   /*for(let i=0;i<this.samples.length;i++)
    //   {
    //     this.distressService.GetSampleArea(this.samples[i].SAMPLE_LENGTH,this.samples[i].SAMPLE_WIDTH).subscribe((data)=>{
    //       console.log(data);
    //       this.areas.push(data);
    //       console.log(this.areas);
    //   });

    //   }*/
    //        // });
    //        });
  }




  GettSampleByLaneId(e) {
    this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((response) => {
      console.log(response);
      this.samples = response;
      //this.sampleId=e.target.value;
      // this.source4.load(this.samples);
      console.log(this.sampleId);
      this.date = false;  //new
      console.log(this.samples);
      // console.log(this.lanename)
    });
  }

  getsamplearea() {
    this.distressService.getsampleArea(this.sampleId).subscribe((area) => {
      console.log(area);
      this.sample_area = area;
      console.log(this.sample_area);
    });
  }

  my_dist_code(e) {
    this.DIST_CODE = e.target.value;
    console.log(this.DIST_CODE);
    // this.savirity(this.DIST_CODE);
    this.savirity();
  }

  savirity() {
    this.distressService.savirity(this.DIST_CODE).subscribe((data) => {
      console.log(data);
      this.saviritydata = data;
      console.log(this.saviritydata);
    });
  }

  GetDistressB7ySampleId(Sendedsample_id, samplenumber, sampleArea, slength, swidth) {
    //this.ShowDistressPci2Table=false;

    this.getdateData(); // not found in old this is new 14/2

    console.log("Sendedsample_id");
    console.log(Sendedsample_id);
    console.log("samplenumber");
    console.log(samplenumber);

    console.log("sample_no");
    this.sample_no = samplenumber;
    console.log(this.sample_no);

    console.log("sampleIdNew");
    this.sampleId = Sendedsample_id;
    console.log(this.sampleId);

    console.log("sample length widthoo");
    console.log(slength);
    console.log(swidth);




    // this.distressService.filterByDate11().subscribe((res)=>{    //get surveyNo
    //   console.log(res);
    //   this.MyNewSurveyNumber=res;

    //   const data = this.MyNewSurveyNumber;
    //   this.source2.load(data);

    //   console.log(this.DatesOfSurvey);
    //   console.log(this.MyNewSurveyNumber);

    // //  this.getdateData();
    //  });



    this.distressService.GetMaxSurveyNOFromDistress().subscribe((res) => {      //need update here for sample_id and date
      console.log(res);
      console.log(res[0].MAXSURVEY_NO);//MAXDATE ///////////////////
      console.log(this.MyNewSurveyNumber);//MAXDATE
      const newsurveyDate = this.MyNewSurveyNumber;
      //let dateformate=newsurveyDate.format('DD/MM/YYYY');
      //let dateformate=newsurveyDate.format('DD/MM/YYYY');
      // console.log(dateformate);
      this.surveyDate = this.MyNewSurveyNumber;   //nosurveydate its templete not  use it this mean survey_no
      this.date = true;  //new
      console.log(this.sampleId);
      this.SURVEY_NO = this.MyNewSurveyNumber;
      this.getdateData();  //new

      console.log(this.surveyDate);
      console.log(this.SURVEY_NO);


      /* this.distressService.getdateData11(this.sampleId,this.SURVEY_NO).subscribe((res)=>{   //pass survey no on it n  delete it 16/2
         console.log(res);
         this.DistressDate=res;
         const data = this.DistressDate;
         this.source2.load(data);
         console.log(this.DistressDate);
           });*/





      /* this.distressService.filterByDate11().subscribe((res)=>{    //get surveyNo
        console.log(res);
        this.DatesOfSurvey=res;
        console.log(this.DatesOfSurvey);
      //  this.getdateData();
       });*/

    });











    this.distressService.GetDistressBySampleId(Sendedsample_id).subscribe((response) => {   //Sendedsample_id
      console.log(response);
      this.Distress = response;
      console.log(this.Distress);
      this.checkClick = true;
      this.checkAdd = false;
      this.date = false;
      this.updateSample = false;
      this.samplelength = slength;
      this.samplewidth = swidth;
      console.log("sample length and length");
      console.log(this.samplelength);
      console.log(this.samplewidth);
      this.sampleId = this.Distress[0].SAMPLE_ID;

      /* console.log("sample_no");
       this.sample_no=samplenumber;
       console.log(this.sample_no);
   
       console.log("sampleIdNew");
       this.sampleId=Sendedsample_id;
       console.log(this.sampleId);*/

      /*  this.distressService.GetMaxSurveyNOFromDistress(this.sampleId).subscribe((res)=>{      //need update here for sample_id and date
        console.log(res);
        console.log(res[0].MAXSURVEY_NO);//MAXDATE ///////////////////
        const newsurveyDate=res[0].MAXSURVEY_NO;
        //let dateformate=newsurveyDate.format('DD/MM/YYYY');
        //let dateformate=newsurveyDate.format('DD/MM/YYYY');
       // console.log(dateformate);
        this.surveyDate=newsurveyDate;   //nosurveydate its templete not  use it this mean survey_no
        this.date=true;  //new
        console.log(this.sampleId);
        this.SURVEY_NO=this.surveyDate;
        this.getdateData();  //new
      
        
      });*/
      console.log(this.sampleId);
      console.log(this.sampleId);  //////////////////////////
      this.sample_area = sampleArea;
      console.log("Sample Area");
      console.log(this.sample_area);


      //this.DatesOfSurvey=[];//new
      //this.DatesOfSurvey=[];//new
      //this.sur_dates=[];//new
      this.surveyDate = 'Invalid date';// new******************
      //this.getsamplearea();
    })
  }

  getSArea() {
    console.log(this.sample_area);
    return this.sample_area;
  }

  AreaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const sampleArea = this.sample_area;
    const distressArea = control.get('DIST_AREA');
    console.log("validators called");
    return distressArea.value <= sampleArea
      ? null : { areaValid: true };
  }

  registerationForm: FormGroup = new FormGroup({
    DIST_CODE: new FormControl(null, [Validators.required,]),
    DIST_SEVERITY: new FormControl(null, [Validators.required]),
    DISTRESS_NOTES: new FormControl(null, [Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/), Validators.required, Validators.minLength(4), Validators.maxLength(20)]),  //max on numbers 
    DIST_AREA: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],),
    SURVEY_NO: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    SURVEY_DATE: new FormControl(null, [Validators.required,]),

    //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern(/^\s*(3[01]|[12][0-9]|0?[1-9])\/(1[012]|0?[1-9])\/((?:19|20)\d{2})\s*$/)]),
  }, { validators: this.AreaValidator });

  updateForm: FormGroup = new FormGroup({
    SAMPLE_LENGTH: new FormControl(null, [Validators.required,]),
    SAMPLE_WIDTH: new FormControl(null, [Validators.required]),
    NOTES: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(60)]),
  });

  SubmitRegisteration(forminfo: FormGroup) {

    this.checkAdd = false;
    this.ShowDistressPci2Table = true;
    console.log(this.ShowDistressPci2Table);
    console.log(forminfo.value);
    console.log("clickedUpdateform");
    this.clickupsdatedataformbufrombutton = forminfo.value;
    console.log(this.clickupsdatedataformbufrombutton);
    console.log(this.clickupsdatedataformbufrombutton['DIST_CODE']);
    // this.getdateData();
    //can deleted
    console.log(forminfo.value);
    console.log(forminfo.value.SURVEY_DATE);
    const date = moment(forminfo.value.SURVEY_DATE);
    let formate = date.format('DD/MM/YYYY');
    //let formate=date.format('MM/DD/YYYY  HH:mm');
    console.log(formate);
    this.formdate = forminfo.value.SURVEY_DATE;
    forminfo.value.SURVEY_DATE = formate;
    console.log(forminfo.value.SURVEY_DATE);

    this.distressService.insertrDistress({
      "sampleID": this.sampleId,
      "SAMPLE_NO": this.sample_no,
      "surveyDate": this.clickupsdatedataformbufrombutton['SURVEY_DATE'],
      "surveyNo": this.clickupsdatedataformbufrombutton['SURVEY_NO'],
      "distressCode": this.clickupsdatedataformbufrombutton['DIST_CODE'],
      "severity": this.clickupsdatedataformbufrombutton['DIST_SEVERITY'],
      "distArea": this.clickupsdatedataformbufrombutton['DIST_AREA']
      , "notes": this.clickupsdatedataformbufrombutton['DISTRESS_NOTES']
      , "SAMPLE_LENGTH": this.samplelength
      , "SAMPLE_WIDTH": this.samplewidth
      , "sectioNo": this.section_no
      , "sectionID": this.sectionId
      , "LANETYPE": this.lanename
      , "streetID": this.streetId
      , "LANE_ID": this.laneId

    }).subscribe((data) => {
      console.log(data);
      this.ifInsertedDistress = true;
      console.log(this.ifInsertedDistress);
      console.log("Test 915")
      console.log("hereeee");
      console.log(this.surveyDate);

      this.getdateData()


      //  this.getdateData();
      //GetDistressBySampleId

      //          this.distressService.getAllDistressPci2BySampleId(this.sampleId).subscribe((dis)=>{
      //           console.log(dis);
      //           this.DistressPci2Info=dis;
      //           console.log(this.DistressPci2Info);

      //           const data = this.DistressPci2Info;
      //           this.source3.load(data);

      // this.source2.load(data);  //26



      //          }, err=>{err.error;
      //           console.log(err)}  );


    }, err => {
      console.log(err.error.message);
      this.ErrorResponse = err.error.message
    });
    forminfo.reset();
    this.date = true;
  }

  getSurveydateBySampleId(e) {
    /*  this.distressService.filterByDate11().subscribe((res)=>{    //get surveyNo
           console.log(res);
           this.DatesOfSurvey=res;
           console.log(this.DatesOfSurvey);*/
    const date = e.target.value;
    // let formate=date.format('D/M/YYYY');
    //  console.log(formate);
    this.surveyDate = e.target.value;
    //this.surveyDate= e.target.value;

    console.log(this.surveyDate);

    this.SURVEY_NO = this.surveyDate;
    console.log(this.SURVEY_NO);
    this.registerationForm.controls.SURVEY_NO.setValue(
      this.SURVEY_NO);

    console.log(this.SURVEY_NO);
    this.date = true;
    this.getdateData();
    //  });
    this.date = true;
  }

  getdateData() {
    if (this.surveyDate != 'اختيار') {
      //this.distressService.getdateData(this.sampleId,this.surveyDate).subscribe((res)=>{
      this.distressService.getdateData11(this.sampleId, this.MyNewSurveyNumber).subscribe((res) => {   //pass survey no on it n
        console.log(res);
        this.DistressDate = res;
        if (res != null) {
          const data = this.DistressDate;
          this.source2.load(data);
        }
        else if (res === null) {
          const data = [];
          this.source2.load(data);
        }

        console.log(this.DistressDate);
      });
    }
  }

  submitupdateSampleFunction(forminfo: FormGroup) {
    console.log(forminfo.value);
    this.distressService.updateSample(forminfo.value, this.sample_no).subscribe((res) => {
      //console.log(res);
      console.log(forminfo.value);
      this.distressService.GetAllSamplesByLaneId(this.laneId).subscribe((response) => {
        console.log(response);
        this.samples = response;
        console.log(this.sampleId);
      });
    });
    forminfo.reset();
    this.updateSample = false;
  }

  getsampledatainput() {
    this.distressService.GetSampleBySample_no(this.sample_no).subscribe((response) => {
      console.log(response);
      console.log(response[0].AR_NAME);
      this.sampledata = response;
      console.log(this.sampledata);
      this.updateForm.controls.NOTES.setValue(
        this.sampledata[0].NOTES);
      this.updateForm.controls.SAMPLE_LENGTH.setValue(
        this.sampledata[0].SAMPLE_LENGTH);
      this.updateForm.controls.SAMPLE_WIDTH.setValue(
        this.sampledata[0].SAMPLE_WIDTH);
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
    this.getSArea();
    this.checkAdd = true;
    // this.checkClick=false;
    //this.updateSample=false;
    // this.date=false;
    this.ShowDistressPci2Table = false;
    //will get surveynumberanddate 
    this.registerationForm.controls.SURVEY_NO.setValue(
      this.SURVEY_NO);
    console.log(this.SURVEY_NO);
    console.log("passedArea");
    this.passed_area = this.sample_area;
    console.log(this.passed_area);

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
    this.streetId = item.STREET_ID;
    console.log(this.streetId);

    this.distressService.GetSectionByStreetId(this.streetId).subscribe((res) => {
      console.log(res);
      this.sections = res;



      this.checkClick = false;  //28
      this.checkAdd = false;
      this.date = false;
      this.ShowDistressPci2Table = false;
    });
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  MyNewSurveyNumber: any;
  x: any;
  ngOnInit(): void {


    console.log(localStorage.getItem('surveynumber'));
    this.MyNewSurveyNumber = localStorage.getItem('surveynumber')
    console.log(this.MyNewSurveyNumber);

    this.x = this.MyNewSurveyNumber


    this.distressService.AllStreests().subscribe((response) => {
      console.log(response);
      this.streets = response;
      console.log(this.streets[0].ARNAME);
      this.dropdownList = response;


      console.log(this.streetId)

    });
    console.log(this.checkClick);


    this.distressService.DistressAll().subscribe((dis) => {
      console.log(dis);
      this.DistressAll = dis;
    });


    console.log(this.streets)



    // { item_id: 1, item_text: 'Mumbai' },
    // { item_id: 2, item_text: 'Bangaluru' },
    // { item_id: 3, item_text: 'Pune' },
    // { item_id: 4, item_text: 'Navsari' },
    // { item_id: 5, item_text: 'New Delhi' }


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


