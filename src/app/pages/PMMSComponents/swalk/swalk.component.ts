import { Component, OnInit } from '@angular/core';
import { SwserviceService } from '../../Services/swservice.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { SmartTableData } from '../../../@core/data/smart-table';
@Component({
  selector: 'ngx-swalk',
  templateUrl: './swalk.component.html',
  styleUrls: ['./swalk.component.scss']
})
export class SwalkComponent implements OnInit {
  municipalities: any[] = [];
  MunicipalityId: any;
  District_Id: any;
  districts: any[] = [];
  sections: any[] = [];
  intersections: any[] = [];
  regions: any[] = [];
  streets: any[] = [];
  swalks: any[] = [];
  secswalks: any[] = [];
  intersecswalks: any[] = [];
  streetsofregion: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  source1: LocalDataSource = new LocalDataSource();
  regionId: any;
  sectionId: any;
  swalkDistresses: any[] = [];
  swalkId: any = null;
  intersectionId: any;
  region_no: any;
  checkAdd: boolean = false;
  ShowDistressPci2Table: boolean = false;
  street_no: any;
  swalkArea: any;
  formdate: any;
  MAIN_ST_ID: any;
  secStreets: any[] = [];
  secStreetId: any;
  x: number;
  y: number=1 ;
  DIST_ID: any;
  clickupsdatedataformbufrombutton: any[] = [];
  dropdownList: [];
  dropdownSettings: {};
  selectedItems: [];
  date: boolean;
  DistressAll: any;
  DIST_CODE: any;

  AreaValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const swalkArea = control.get('SwalkArea');
    const distressArea = control.get('DistArea');
    console.log("validators called");
    return distressArea.value !== null && swalkArea.value !== null && distressArea.value < swalkArea.value
      ? null : { areaValid: true };
  }




  registerationForm: FormGroup = new FormGroup({
    SurveyDate: new FormControl(null, [Validators.required,]),
    DistCode: new FormControl(null, [Validators.required,]),
    DistArea: new FormControl(null, [Validators.required,Validators.maxLength(10)]),
    SurveyNo: new FormControl(null,),
    DistressNotes: new FormControl(null, [Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/),Validators.required, Validators.minLength(4), Validators.maxLength(20)]),  //max on numbers 
    SwalkArea: new FormControl(null,[ Validators.required,Validators.min(0.01),Validators.maxLength(10)]),

    //  SURVEY_DATE:new FormControl(null,[Validators.required,Validators.pattern("/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/"),
  },{validators: this.AreaValidator});
  registerationForm1: FormGroup = new FormGroup({
    SurveyDate: new FormControl(null, [Validators.required,]),
    DistCode: new FormControl(null, [Validators.required,]),
    DistArea: new FormControl(null, [Validators.required,Validators.maxLength(10)]),
    SurveyNo: new FormControl(null,),
    DistressNotes: new FormControl(null, [Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/),Validators.required, Validators.minLength(4), Validators.maxLength(20)]),  //max on numbers 
    SwalkArea: new FormControl(null,[Validators.required,Validators.min(0.01),Validators.maxLength(10)]),

  },{validators: this.AreaValidator});

  registerationForm2: FormGroup = new FormGroup({
    SurveyDate: new FormControl(null, [Validators.required,]),
    DistCode: new FormControl(null, [Validators.required,]),
    DistArea: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    SurveyNo: new FormControl(null,),
    DistressNotes: new FormControl(null, [Validators.pattern(/^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/),Validators.required, Validators.minLength(4), Validators.maxLength(20)]),  //max on numbers 
    SwalkArea: new FormControl(null,[Validators.required,Validators.min(0.01), Validators.maxLength(10)]),

  },{validators: this.AreaValidator});


  settings = {
    actions: false,
    hideSubHeader: true,
    add: {
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
    },
    columns: {
      MUNICIPALITY: {
        title: 'Municipality',
        type: 'string',
      },
      DISTRICT: {
        title: 'District',
        type: 'string',
      },
      MAIN_ST_TITLE: {
        title: 'Main Street ',
        type: 'string',
      },
      SEC_DIRECTION: {
        title: 'Direction',
        type: 'string',
      },
      FROM_STREET: {
        title: 'From',
        type: 'string',
      },
      TO_STREET: {
        title: 'To',
        type: 'number',
      },
      SEC_LENGTH: {
        title: 'Length',
        type: 'number',
      },
      SECTION_NO: {
        title: 'Section Number',
        type: 'number',
      },
    },
  };

  settings1 = {
    hideSubHeader: true,
    actions: false,
    add: {
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
    },
    columns: {
      SURVEY_DATE: {
        title: ' Survey Date ',
        type: 'string',
      },
      DIST_CODE: {
        title: 'Distress Code ',
        type: 'number',
      },
      DIST_AREA: {
        title: 'Distress Area ',
        type: 'number',
      },
      SURVEY_NO: {
        title: 'Survey Number ',
        type: 'number',
      },

      SECTION_NO: {
        title: ' Section Number',
        type: 'number',
      },
      
      DISTRESS_NOTES: {
        title: 'Notes ',
        type: 'number',
      },
      SWALK_AREA: {
        title: ' Sidewalk Area ',
        type: 'number',
      },
      INTER_NO: {
        title: 'Intersection Number',
        type: 'string',
      },
      REGION_NO: {
        title: 'Region number ',
        type: 'string',
      },
     
    },
  };



  constructor(private service: SmartTableData, private swalkService: SwserviceService) {
  }

  tmp: {}
  SubmitRegisteration(forminfo: FormGroup) { 
    this.checkAdd=false;
    this.ShowDistressPci2Table = true;
    this.clickupsdatedataformbufrombutton = forminfo.value;
   

    this.tmp = {
      "SurveyDate": this.clickupsdatedataformbufrombutton['SurveyDate'],
      "DistCode": +this.clickupsdatedataformbufrombutton['DistCode'],
      "DistArea": +this.clickupsdatedataformbufrombutton['DistArea'],
      "SurveyNo": 3,
      "SectionNo": this.clickupsdatedataformbufrombutton['SectionNo'],
      "SwalkId": +this.swalkId,
      "DistressNotes": this.clickupsdatedataformbufrombutton['DistressNotes'],
      "RegionId": +this.regionId,
      "SwalkArea": +this.clickupsdatedataformbufrombutton['SwalkArea'],
      "InterNo": this.clickupsdatedataformbufrombutton['InterNo'],
      "RegionNo": this.region_no,
      "SecondStId": +this.secStreetId
    }
    console.log(this.tmp);

    this.swalkService.AddDistressSideWalks(this.tmp).
      subscribe((res) => {
        console.log(res);
        if (res) {
          alert("Distress was added successfully");
          this.checkAdd=false;

        }
        this.swalkService.GetDistressSideWalks(this.swalkId).subscribe((res1) => {
          console.log(res1);
          this.swalkDistresses = res1;
          console.log(this.swalkDistresses);
          this.source1=new LocalDataSource();
          this.source1.load(res1);
        }, err => {
          console.log(err.error)
        }



        );
      })
    forminfo.reset();
    this.date = true;
  }
  

  // successNotification() {
  //   Swal.fire('Hi', 'We have been informed!', 'success');
  // }
  Municipalities(e) {
    this.MunicipalityId = e.target.value;
    console.log(this.MunicipalityId);


    this.swalkService.GetDistrictByMunicId(this.MunicipalityId).subscribe((res2) => {
      console.log(res2);
      this.districts = res2;
      this.checkAdd=false;
      console.log(this.districts);
    });
  }

  GetDistricts(e) {
    this.District_Id = e.target.value;
    console.log(this.District_Id);

    this.swalkService.GetRegionsByDistrictId(this.District_Id).subscribe((res) => {
      console.log(res);
      this.regions = res;
      this.checkAdd=false;
      console.log(this.regions);
      this.region_no = res[0].REGION_NO;
    });
  }



  GetRegions(e) {
    this.regionId = e.target.value;
    console.log(this.regionId);
    this.swalkId = null;

    this.swalkService.GetSecondaryStreets(3,this.regionId).subscribe((res1) => {
      console.log(res1);

      this.streets = res1;
      console.log(this.streets);
    });


  }

  MainStreets(e) {


    console.log("***********")
    console.log(e)
    console.log("***********")
    console.log(this.selectedItems)
    console.log("***********")
    this.MAIN_ST_ID = e.STREET_ID;
    this.swalkId = null;
    console.log(this.MAIN_ST_ID);


    this.swalkService.GetSectionByStreetId(this.MAIN_ST_ID).subscribe((res1) => {
      console.log(res1);
      this.sections = res1;
      console.log("***************")
      this.source.load(res1);
      this.checkAdd=false;
    this.swalkId = null;
   
      console.log(this.sections);
      console.log(this.source);
    });

    this.swalkService.getInterSectionByStreetId(this.MAIN_ST_ID).subscribe((res0) => {
      console.log(res0);
      this.intersections = res0;
    this.swalkId = null;
      this.checkAdd=false;
      console.log(this.intersections);
    });
  }

  SecondaryStreets(e) {
    console.log(e);
    console.log(e.STREET_ID)
    this.swalkId = null;
    this.secStreetId = e.STREET_ID;
    console.log(this.secStreetId);


    this.swalkService.GetSideWalksBySectionId(this.secStreetId).subscribe((res0) => {
      console.log(res0);
      this.checkAdd=false;
      this.swalks = res0;
    

      console.log(this.swalks);
    });
  }
  Swalks(e) {
    this.source1=new LocalDataSource();
    this.swalkId = e.target.value;
    console.log(this.swalkId);
    this.swalkService.GetSideWalkBySideWalkId(this.swalkId).subscribe((res) => {
      console.log(res);

      this.swalkArea=res[0].SWALK_AREA; 
      console.log(res[0].SWALK_AREA);

    });
    this.swalkService.GetDistressSideWalks(this.swalkId).subscribe((res) => {
      console.log(res);
      this.swalkDistresses = res;
      this.checkAdd=false;
      
      this.source1.load(res);
      console.log(this.swalkDistresses);

      this.source.load(res);
    });


  }
  DistressSideWalks(event) {
    this.DIST_ID = event.target.value;
    console.log(this.DIST_ID);


  }
  Sections(e) {
    this.sectionId = e.target.value;
    console.log(this.sectionId);

    this.swalkService.GetSideWalksBySectionId(this.sectionId).subscribe((response) => {
      console.log(response);
      this.secswalks = response;
      console.log(this.swalks);
     
    });

  }
  InterSections(e) {
    this.intersectionId = e.target.value;
    console.log(this.intersectionId);

    this.swalkService.GetSideWalksByIntersectionId(this.intersectionId).subscribe((resp) => {
      console.log("***************")
      console.log(resp);
      console.log("***************")
      this.intersecswalks = resp;
      console.log(this.swalks);
    });
  }
  my_dist_code(e) {
    this.DIST_CODE = e.target.value;
    console.log(this.DIST_CODE);

  }

  ngOnInit(): void {
    this.dropdownList = [

    ];
    this.selectedItems = [

    ];
    this.dropdownSettings = {
      singleSelection: true,
      closeDropDownOnSelection: true,
      idField: 'STREET_ID',
      textField: 'ARNAME',
      maxHeight:197,
      //clearSearchFilter:false,
      //defaultOpen:true,
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "There is no item availabale to show",
    };

    this.swalkService.Munic().subscribe((res) => {
      console.log(res);
      this.municipalities = res;
    });

    this.swalkService.GetDistrictByMunicId(this.MunicipalityId).subscribe((res) => {
      console.log(res);
      this.districts = res;
      console.log(this.districts);
    });

    this.swalkService.GetMainStreets().subscribe((res) => {
      console.log(res);
      this.streets = res;
      console.log(this.streets);
    });

    this.swalkService.GetSecondaryStreets(3,this.regionId).subscribe((res) => {
      console.log(res);
      this.secStreets = res;
      console.log(this.secStreets);
      this.dropdownList = res;
    });


    this.swalkService.GetRegionsByDistrictId(this.District_Id).subscribe((res2) => {
      console.log(res2);
      this.regions = res2;
      console.log(this.regions);
    });

    this.swalkService.GetSectionByStreetId(this.MAIN_ST_ID).subscribe((res1) => {
      console.log(res1);
      this.sections = res1;
    this.swalkId = null;
      console.log(this.sections);
    });

    this.swalkService.getInterSectionByStreetId(this.MAIN_ST_ID).subscribe((res) => {
      console.log(res);
      this.intersections = res;
    this.swalkId = null;
      console.log(this.intersections);
    });

    this.swalkService.GetSideWalksByIntersectionId(this.intersectionId).subscribe((res0) => {
      console.log(res0);
      this.swalks = res0;
      console.log(this.swalks);
    });

    this.swalkService.GetSideWalksBySectionId(this.sectionId).subscribe((res3) => {
      console.log(res3);
      this.swalks = res3;
      console.log(this.swalks);
    });
   

    this.swalkService.GetDistress().subscribe((dis) => {
      console.log(dis);
      this.DistressAll = dis;
    });
  }


  onChange(event) {
    this.x = event;
    this.regionId = null;
    this.secStreetId = null;
    this.swalkId= null;
    this.checkAdd = false;
this.y=1;
    console.log(event);
  }
  onChange1(e) {
    console.log(this.selectedItems)
    //this.MAIN_ST_ID=null
    this.selectedItems = [];
    this.y = e;
    this.swalkId = null;
    console.log(e);
    this.checkAdd = false;

  }
  openForm()
  {
    console.log(this.swalkArea)
    this.registerationForm1.controls.SwalkArea.setValue(
      this.swalkArea);
      this.registerationForm.controls.SwalkArea.setValue(
        this.swalkArea);
        this.registerationForm2.controls.SwalkArea.setValue(
          this.swalkArea);
    this.checkAdd=true;

    this.ShowDistressPci2Table=false;

  }
  Close(userForm: NgForm) {
    this.checkAdd = false;
    userForm.resetForm();

  }
  
  onDeSelect(event:any){
    console.log(event);
    this.y=1
  }
}
