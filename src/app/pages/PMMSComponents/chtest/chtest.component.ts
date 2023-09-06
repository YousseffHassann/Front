import { Component, OnInit, Input } from '@angular/core';
import { SideWalkChartService } from '../../Services/ChartsServices/side-walk-chart.service'
import { MDService } from '../../Services/ChartsServices/md.service';
import { FormControl, FormGroup } from '@angular/forms';



//ahmed test
@Component({
  selector: 'ngx-chtest',
  templateUrl: './chtest.component.html',
  styleUrls: ['./chtest.component.scss']
})
export class ChtestComponent implements OnInit {
  selectedData: any;
  @Input() data: any;
  legendTitleMulti: string = 'Months';
  legendPosition: string = 'right'; // ['right', 'below']
  legend: boolean = true;
  view: any[] = [1000, 800];
  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Sales';
  xAxisLabel: string = 'Products';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  themeSubscription: any;
  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;



  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  @Input() results: any;
  mdarr: any[] = [];
  result2: any[] = [];


  form = new FormGroup({
    option: new FormControl('1')
  });

DId:any;

  arrofallcities: any[] = [];
  selectedCityId: number = 0;
  allMunicipalitiesBySpesificCityId: any;
  GetDistressByStreetId: number = 0;
  MunicicipalityIdForSpesificSelection: any;
  Districts: any;
  DistrictId: number;
  myoption: string;
  myselect: string;
  newId: any;
  roundDomains = true;
  barPadding = 4;
  formControl = new FormControl('1');
  xAxisf = {
    labelFont: '20px Arial',
    labelColor: '#000',
    labelRotation: -45
  }

  constructor(private mydata: SideWalkChartService, private mdservice: MDService, private mydata2: MDService) {
    // this.mydata.getallcities().subscribe((cities) => {
    //   this.arrofallcities = cities;
    //   console.log(this.arrofallcities);
    // });
  }



  
  
  radioChange() {
    document.getElementById('whenClick').style.display = "flex";
    console.log(1111111);
    this.form.value.option='1'
    console.log( this.form.value.option);

    if(this.form.value.option==='1' && this.DId)
    {
console.log(this.DId)
console.log(this.section_no);
this.mdservice.getAllMDs(this.section_no,this.survey_no).subscribe((data) => {  //this.DId)
 
  // this.mdarr = data;
  this.results = []
  data.forEach(e => {
    this.results.push({
      value: e.MD_COST, name: e.RECOMMENDED_DECISION
    })
  })
  this.results = [...this.results]
  console.log(this.mdarr);

});

    }


    
  }

  radioChange1() {
    document.getElementById('whenClick').style.display = "none";
    console.log(22222222);
    this.form.value.option='2'
    console.log( this.form.value.option);
    if(this.form.value.option==='2' && this.DId)
    {
        console.log(this.DistrictId)

      this.mdservice.GetCostOfSideWalksByDistrictId(this.DId).subscribe((data) => {   //this    333
        console.log(this.form.value.option)
        // this.mdarr = data;  //canseled it 
        this.results = []
        data.forEach(e => {
          this.results.push({
            value: e.MD_COST, name: e.RECOMMENDED_DECISION
          });
        })
        this.results = [...this.results];
        console.log(this.mdarr);

      });


    }
  }

  onOptionChange() {
    console.log('Option changed: ', this.form.value.option);

    if (this.form.value.option === '1') {
      console.log("Abdo111111");

    } else {
      console.log("Abdo2222222");
    }
    // Perform any other actions here
  }
  City(e): any {
    this.selectedCityId = e.target.value;
    console.log(this.selectedCityId);
    console.log("hello");


    this.mydata.GetInfoAboutStreetForCost(e.target.value,this.survey_no).subscribe((data)=>{  //value 0000   25-6 //new
      //  this.DId=value;
        // this.mdarr = data;
        console.log(data)
        this.results = [] 

        console.log(this.result2);
        console.log(this.mdarr);
      });





    this.mydata.GetAllStreetByRegionId(this.selectedCityId).subscribe((municipalities) => {
      this.allMunicipalitiesBySpesificCityId = municipalities;
      this.data = municipalities.map(item => {
        return {
          id: item.id,
          text: item.name
        };
      console.log(this.allMunicipalitiesBySpesificCityId);
    });
    })
  }


main_no:any;
  Street(e): any {
    this.main_no = e.target.value;
    console.log(this.main_no);
    console.log("hello2");

    this.mydata.GetDistressByStreetId(this.main_no,this.survey_no).subscribe((res) => { //28 this
      this.Districts = res;   
      console.log(res);
    },
    );


console.log(this.section_no)


  //  console.log(value);
   // this.DId=value;
this.mydata.BehavDistrictId.subscribe(()=>{


  if (this.mydata.BehavDistrictId.getValue() != 0) {
    this.newId = this.mydata.BehavDistrictId.getValue();
    console.log("seen in one " + this.newId);
  }

  this.mydata.TheOptionForRadioButton.subscribe(() => {
    console.log(this.form.value.option);
    console.log(this.form.value);
    if (this.form.value.option === '1') {
      console.log(this.form.value.option);
      //update 2 ahmed












































      








      
      this.mydata.GetInfoAboutStreetForCost(e.target.value,this.survey_no).subscribe((data)=>{  //value 0000   29 
      //  this.DId=value;
        // this.mdarr = data;
        console.log(data)
        this.results = [] 


        data.forEach(e => {
          this.results.push({
            value: e.MD_COST, name: e.RECOMMENDED_DECISION 
          })
        });


        this.results = [...this.results];


        
    //    this.results = [{value:"320",name:'Mill and Repave '},{value:"620",name:'Replace Asphalt'},
    //     {value:"400 ",name:'Hot Sand Mix'},{value:"250 ",name:'overlay'},{value:"300",name:'Depp Patching'},{value:"480",name:'OverLay+Geo-Text Tile Fabric'}
    //  ]
        console.log(this.result2);
        console.log(this.mdarr);

      });






















      

      // if (this.myselect === "1") {
      //   console.log("MySelect111111");
      //   this.mdservice.getAllMDs(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION
      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });

      // }
      // else if (this.myselect === "2") {
      //   console.log("MySelect22222222");
      //   console.log(value);
      //   this.mdservice.GetIntersectionsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION

      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });
      // }
      //  else if (this.myselect === "3") {
      //   this.mdservice.GetRegionjsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION

      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });
      // } 
      // else if (this.myselect === "4") {
      //   this.mdservice.GetIntersectionsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION
      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });

      // }

    }
    else if (this.form.value.option === '2') {  //update 3 ahmed 
      console.log(this.form.value.option)
      this.mdservice.GetCostOfSideWalksByDistrictId(this.section_no).subscribe((data) => {  //VALUE  202
        console.log(this.form.value.option)
        // this.mdarr = data;  //canseled it 
        this.results = []


        data.forEach(e => {     //29-5
          this.results.push({
            value: e.MD_COST, name: e.RECOMMENDED_DECISION
          });
        })
        this.results = [...this.results]
        console.log(this.mdarr);

      //   this.results = [{value:"360",name:'Mill and Repave '},{value:"620",name:'Replace Asphalt'},
      //   {value:"400 ",name:'Hot Sand Mix'},{value:"250 ",name:'overlay'},{value:"300",name:'Depp Patching'},{value:"480",name:'OverLay+Geo-Text Tile Fabric'}
        
      // ]


      });
    }

  })
 
})
















  }













































  mySelection(e) {
    console.log(e.target.value);
    this.myselect = e.target.value;
  //  alert(this.myselect)

  if (this.myselect === "1") {
    console.log("MySelect111111");
    this.mdservice.getAllMDs(this.DId,this.survey_no).subscribe((data) => {
      // this.mdarr = data;
      this.results = []
      data.forEach(e => {
        this.results.push({
          value: e.MD_COST, name: e.RECOMMENDED_DECISION
        })
      })
      this.results = [...this.results]
      console.log(this.mdarr);

    });

  }
  else if (this.myselect === "2") {
    console.log("MySelect22222222");
   // console.log(value);
    this.mdservice.GetIntersectionsByDistrictId(this.DId).subscribe((data) => {
      // this.mdarr = data;
      this.results = []
      data.forEach(e => {
        this.results.push({
          value: e.MD_COST, name: e.RECOMMENDED_DECISION

        })
      })
      this.results = [...this.results]
      console.log(this.mdarr);

    });
  }
   else if (this.myselect === "3") {
    this.mdservice.GetRegionjsByDistrictId(this.DId).subscribe((data) => {
      // this.mdarr = data;
      this.results = []
      data.forEach(e => {
        this.results.push({
          value: e.MD_COST, name: e.RECOMMENDED_DECISION

        })
      })
      this.results = [...this.results]
      console.log(this.mdarr);

    });
  } 
  else if (this.myselect === "4") {
    this.mdservice.GetyAllBySections(this.DId).subscribe((data) => {
      // this.mdarr = data;
      this.results = []
      data.forEach(e => {
        this.results.push({
          value: e.MD_COST, name: e.RECOMMENDED_DECISION
        })
      })
      this.results = [...this.results]
      console.log(this.mdarr);

    });

  }
  }

  section_no:any;

  onChange(value: any): void {
    console.log(value);
    this.DId=value;
    this.section_no=value;

this.mydata.BehavDistrictId.subscribe(()=>{


  if (this.mydata.BehavDistrictId.getValue() != 0) {
    this.newId = this.mydata.BehavDistrictId.getValue();
    console.log("seen in one " + this.newId);
  }

  this.mydata.TheOptionForRadioButton.subscribe(() => {
    console.log(this.form.value.option);
    console.log(this.form.value);
    if (this.form.value.option === '1') {
      console.log("gfghfgh");
      console.log(this.form.value.option);
      console.log(this.section_no)
      console.log(typeof(this.section_no))
      //update 2 ahmed
      this.mdservice.getAllMDs(this.section_no,this.survey_no).subscribe((data) => {   //value  202
       // this.DId=value;
        // this.mdarr = data;
        console.log(data);
        this.results = []


        data.forEach(e => {
          this.results.push({
            value: e.MD_COST, name: e.RECOMMENDED_DECISION
          })
        })

       this.results = [...this.results]
      //  this.results = [{value:"400 ",name:'Hot Sand Mix'},{value:"250 ",name:'overlay'},{value:"300",name:'Depp Patching'},{value:"480",name:'OverLay+Geo-Text Tile Fabric'}]
       console.log(this.results);
        console.log(this.mdarr);
      });


      // if (this.myselect === "1") {
      //   console.log("MySelect111111");
      //   this.mdservice.getAllMDs(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION
      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });

      // }
      // else if (this.myselect === "2") {
      //   console.log("MySelect22222222");
      //   console.log(value);
      //   this.mdservice.GetIntersectionsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION

      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });
      // }
      //  else if (this.myselect === "3") {
      //   this.mdservice.GetRegionjsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION

      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });
      // } 
      // else if (this.myselect === "4") {
      //   this.mdservice.GetIntersectionsByDistrictId(value).subscribe((data) => {
      //     // this.mdarr = data;
      //     this.results = []
      //     data.forEach(e => {
      //       this.results.push({
      //         value: e.MD_COST, name: e.RECOMMENDED_DECISION
      //       })
      //     })
      //     this.results = [...this.results]
      //     console.log(this.mdarr);

      //   });

      // }

    }
    else if (this.form.value.option === '2') {  //update 3 ahmed 
      console.log(this.form.value.option)
      // this.mdservice.GetCostOfSideWalksByDistrictId(value).subscribe((data) => {
      //   console.log(this.form.value.option)
      //   // this.mdarr = data;  //canseled it 
      //   this.results = []
      //   data.forEach(e => {
      //     this.results.push({
      //       value: e.MD_COST, name: e.RECOMMENDED_DECISION
      //     });
      //   })
      //   this.results = [...this.results]
      //   console.log(this.mdarr);

      // });
    }

  })
 
})


 




  }


  District(e): any {

    if (this.allMunicipalitiesBySpesificCityId) {
      this.DistrictId = e.target.value;
      console.log(this.DistrictId);
      console.log("hello3");
      if (this.Districts) {
       // this.Districts = 202
        this.mdservice.getAllMDs(13215,this.survey_no).subscribe((data) => {  //this.Districts
          //         // this.mdarr = data;
          //         this.results = []
          //         data.forEach(e => {
          //           this.results.push({
          //             value: e.MD_COST, name: e.RECOMMENDED_DECISION

          //           })
          //         })
          //         this.results = [...this.results]
          //         console.log(this.mdarr);
          console.log(data);
        });





      }
    }
    else {
      this.Districts = [];
    }


  }



  // radio(e) {
  //   console.log(e.target.value);
  //   this.myoption = e.target.value;
  //   this.mdservice.TheOptionForRadioButton.next(this.myoption);
  //   console.log(this.mdservice.TheOptionForRadioButton.getValue());
  //   if (this.mdservice.TheOptionForRadioButton.getValue() === 'option1') {
  //     document.getElementById('whenClick').style.display = "flex";
  //   }
  //   else {
  //     document.getElementById('whenClick').style.display = "none";
  //   }
  // }



  //الرصف selection 







  //document.getElementById("element").style.display = "none";



  allSyrvey:any;
  survey_no:any;

  SURVEIES(e)
  {
  console.log(e.target.value);
  this.survey_no=e.target.value;


 

  
     this.mydata.getAllRegions(this.survey_no).subscribe((cities) => {
      this.arrofallcities = cities;
      console.log(this.arrofallcities);

    });
  
  
  }

  ngOnInit(): void {
    var result: any

    // this.mydata.getAllRegions(3).subscribe((cities) => {
    //   this.arrofallcities = cities;
    //   console.log(this.arrofallcities);
    // });





    this.mydata.SurveyNumber().subscribe((sur) => {
      this.allSyrvey = sur;
      console.log(this.allSyrvey);
    });

 /*   this.mdservice.getAllMDs(202).subscribe((data) => {
      // this.mdarr = data;
      data.forEach(e => {
        this.mdarr.push({
          "value": e.DISTRICT_ID, "name": e.SURVEY_NO

        })
      })
      result = JSON.stringify(this.mdarr)
      this.result2 = result
    })*/
    console.log(this.mydata.BehavDistrictId.getValue());
    this.GetDistressByStreetId = 0;

   /* this.mydata.GetSideW3alkInfoChart(202).subscribe(data => {
      this.results = data.map(item => {
        return { name: item.DISTRESS_AR_TYPE, value: item.AREA }
      });
    });*/
  }

}
