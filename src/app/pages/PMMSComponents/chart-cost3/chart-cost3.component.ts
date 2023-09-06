import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SideWalkChartService } from '../../Services/ChartsServices/side-walk-chart.service';
import { MDService } from '../../Services/ChartsServices/md.service';
import { Chartcost3Service } from '../../Services/chartcost3.service';

@Component({
  selector: 'ngx-chart-cost3',
  templateUrl: './chart-cost3.component.html',
  styleUrls: ['./chart-cost3.component.scss']
})
export class ChartCost3Component implements OnInit {

  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;
  view: any[] = [1000, 800];
  xAxis = "{labelStyle: {'font-size': '14px'} }"

  yAxis: {
    label: 'Y-axis Label',
    labelFont: {
      size: '12',
      color: '#000'
    },
    labelPadding: 20
  }

  DId:any;
  yAxisLabel: string = 'Sales';
  xAxisLabel: string = 'Products';
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = true;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  themeSubscription: any;

  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

load:boolean=false;
MeError:boolean=false;

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  endload:boolean=false;

  @Input() results2: any;

  @Input() results: any;


  mdarr: any[] = [];
  result2: any[] = [];
  form = new FormGroup({
    option: new FormControl('2')    //was 1 5/3
  });

  barPadding = 8;
  roundDomains = true;


  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };
  arrofallcities: any[] = [];
  selectedCityId: number = 0;
  AllStreetsByRegionId: any;
  allDistrictsByMunicipalityId: number = 0;
  MunicicipalityIdForSpesificSelection: any;
  SSections: any;
  DistrictId: number;
  myoption: string;
  myselect: string;
  newId: any;
  xAxisf = {
    labelFont: '40px Arial',
    labelColor: '#000',
    labelRotation: -45
  };


  constructor(private mydata: SideWalkChartService, private mdservice: MDService, private mydata2: MDService,
    private charts3:Chartcost3Service) {

    // this.mydata.getAllRegions().subscribe((cities) => {
    //   this.arrofallcities = cities;
    //   console.log(this.arrofallcities);
    // });


  }
  onOptionChange(e) {  //option=2
    console.log('Option changed: ', e);
console.log(e);
    console.log(this.DId);  //chartsinfo  5/3

   if(e==2 && this.DId)
   {
    this.load=false;
    this.mydata.GetInfoAboutSectionDistress( this.DId).subscribe((data) => {
      //this.DId=value
      // this.mdarr = data;
      console.log(data)
      this.results = []
      function formatDataForChart(data) {
        const formattedData = [];
        data.forEach(item => {
          let series1 = { name: "AREA", value: item.QUANTITY };
          let series2 = { name: "QUANTITY", value: item.AREA };
          formattedData.push({
            name: item.DISTRESS_EN_TYPE,
            series: [series1, series2]
          });
        });
        return formattedData;
      }
      function formatDataForChart2(data) {
        const formattedData = [];
        data.forEach(item => {
          let series1 = { name: "AREA", value: item.QUANTITY };
          let series2 = { name: "QUANTITY", value: item.AREA };
          formattedData.push({
            name: item.DISTRESS_EN_TYPE,
            series: [series1, series2]
          });
        });
        return formattedData;
      }

      this.results = formatDataForChart(data);
      this.results2 = formatDataForChart2(data);

      // data.forEach(e => {
      //   this.results.push({
      //     value: e.AREA, name: e.DISTRESS_EN_TYPE
      //   })

      // });
      // this.results2 = []
      // data.forEach(e => {
      //   this.results2.push({
      //     value: e.AREA, name: e.DISTRESS_EN_TYPE
      //   })

      // })

      // this.results2 = [...this.results2]
      this.results = [...this.results]


      console.log(this.mdarr);

    });
   }


    if (e == '1') {





      // document.getElementById('whenClick').style.display = "flex";
//here1  5/3
console.log(this.DId);  //chartsinfo

console.log(this.DId);  //chartsinfo  5/3

if(e=='1' && this.DId)
{
 this.load=true;
 console.log(this.load);

 this.mydata.GetInfoAboutSectionDistress(this.DId).subscribe((data) => {
  // this.mdarr = data;  //canseled it
  this.results = []

if(data)  //can Removw It 5/3
{
  this.load=true;
  console.log(this.load);
}


else if(!data)
{
  this.MeError=true;
  this.load=false
}


});

}

if(e==1 && this.DId)
{
 this.mydata.chartsinfo( this.DId).subscribe((data) => {
   //this.DId=value
   // this.mdarr = data;

   if(!data)
   {
     console.log("Nullo");
     this.endload=true;
     this.load=false;
   }
   else
   {
     console.log("not nully");
   }

   console.log(data)
  //  if(this.form.value.option==='1')
  //  {
  //   this.load=true;
  //   console.log(this.load);
  //  }
   this.results = []
   function formatDataForChart(data) {
     const formattedData = [];
     data.forEach(item => {
       let series1 = { name: "AREA", value: item.QUANTITY };
       let series2 = { name: "QUANTITY", value: item.AREA };
       formattedData.push({
         name: item.DISTRESS_EN_TYPE,
         series: [series1, series2]
       });
     });
     return formattedData;
   }
   function formatDataForChart2(data) {
    const formattedData = [];
    data.forEach(item => {
      let series1 = { name: "AREA", value: item.QUANTITY };
      let series2 = { name: "QUANTITY", value: item.AREA };
      formattedData.push({
        name: item.DISTRESS_EN_TYPE,
        series: [series1, series2]
      });
    });
    return formattedData;
  }

   this.results = formatDataForChart(data);
   this.results2 = formatDataForChart2(data);

   // data.forEach(e => {
   //   this.results.push({
   //     value: e.AREA, name: e.DISTRESS_EN_TYPE
   //   })

   // });
   // this.results2 = []
   // data.forEach(e => {
   //   this.results2.push({
   //     value: e.AREA, name: e.DISTRESS_EN_TYPE
   //   })

   // })

   // this.results2 = [...this.results2]
   this.results = [...this.results]


   console.log(this.mdarr);

 });
}

    } else {
      // document.getElementById('whenClick').style.display = "none";

    }
    // Perform any other actions here
  }

















  //new one
  Region(e): any {
    this.selectedCityId = e.target.value;
    console.log(this.selectedCityId);
    console.log("hello");

    this.charts3.GetAllStreetByRegionId(this.selectedCityId).subscribe((res) => {
      this.AllStreetsByRegionId = res;

      console.log(this.AllStreetsByRegionId);




      if (this.mydata.BehavDistrictId.getValue() != 0) {
        this.newId = this.mydata.BehavDistrictId.getValue();
        console.log("seen in one " + this.newId);
      }

      this.mydata.TheOptionForRadioButton.subscribe(() => {
        if (this.form.value.option === '1') {

          //update 2 ahmed

this.charts3.GetInfoChartOfRegion(this.survey_no,this.selectedCityId).subscribe((data)=>{
  console.log(data);
            //this.DId=value
            // this.mdarr = data;
            this.results = []

this.results = formatDataForChart(data);
this.results2 = formatDataForChart2(data);





            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


            console.log(this.mdarr);

          });




        }
        else if (this.form.value.option === '2') {  //update 3 ahmed

this.mydata.GetInfoAboutMAINNO(e.target.value,this.survey_no).subscribe((data)=>{
  console.log(data);
            // this.mdarr = data;  //canseled it
            this.results = []

            this.results = formatDataForChart(data);
            this.results2 = formatDataForChart2(data);
            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


          });
        }

      })




      function formatDataForChart(data) {
        const formattedData = [];
        data.forEach(item => {
          let series1 = { name: "AREA", value: item.QUANTITY };
          let series2 = { name: "QUANTITY", value: item.AREA };
          formattedData.push({
            name: item.DISTRESS_EN_TYPE,
            series: [series1, series2]
          });
        });
        return formattedData;
      }
      function formatDataForChart2(data) {
        const formattedData = [];
        data.forEach(item => {
          let series1 = { name: "AREA", value: item.QUANTITY };
          let series2 = { name: "QUANTITY", value: item.AREA };
          formattedData.push({
            name: item.DISTRESS_EN_TYPE,
            series: [series1, series2]
          });
        });
        return formattedData;
      }







    })
  }



  Street(e): any {
    this.allDistrictsByMunicipalityId = e.target.value;
    console.log(this.allDistrictsByMunicipalityId);
    console.log("hello2");
console.log(e.target.value);
    this.mydata.GetDistressByStreetId(this.allDistrictsByMunicipalityId,this.survey_no).subscribe((res) => {
      this.SSections = res;

      console.log(this.SSections);



     // GetDistrictByMunicipalityId




//22-5-2023



    this.mydata.BehavDistrictId.subscribe(() => {


      if (this.mydata.BehavDistrictId.getValue() != 0) {
        this.newId = this.mydata.BehavDistrictId.getValue();
        console.log("seen in one " + this.newId);
      }

      this.mydata.TheOptionForRadioButton.subscribe(() => {
        if (this.form.value.option === '1') {

          //update 2 ahmed

this.mydata.GetInfoAboutMAINNO(e.target.value,this.survey_no).subscribe((data)=>{
  console.log(data);
            //this.DId=value
            // this.mdarr = data;
            this.results = []

this.results = formatDataForChart(data);
this.results2 = formatDataForChart2(data);




            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


            console.log(this.mdarr);

          });




        }
        else if (this.form.value.option === '2') {  //update 3 ahmed

this.mydata.GetInfoAboutMAINNO(e.target.value,this.survey_no).subscribe((data)=>{
  console.log(data);
            // this.mdarr = data;  //canseled it
            this.results = []

            this.results = formatDataForChart(data);
            this.results2 = formatDataForChart2(data);

            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


          });









        }

      })

    })
































    function formatDataForChart(data) {
      const formattedData = [];
      data.forEach(item => {
        let series1 = { name: "AREA", value: item.QUANTITY };
        let series2 = { name: "QUANTITY", value: item.AREA };
        formattedData.push({
          name: item.DISTRESS_EN_TYPE,
          series: [series1, series2]
        });
      });
      return formattedData;
    }

    function formatDataForChart2(data) {
      const formattedData = [];
      data.forEach(item => {
        let series1 = { name: "AREA", value: item.QUANTITY };
        let series2 = { name: "QUANTITY", value: item.AREA };
        formattedData.push({
          name: item.DISTRESS_EN_TYPE,
          series: [series1, series2]
        });
      });
      return formattedData;
    }










//here00







//});



    },
      (err) => { },
      () => { }
    );
  }




































  mySelection(e) {
    console.log(e.target.value);
    this.myselect = e.target.value;
    alert(this.myselect)

  }
  onChange(value: number): void {
    this.DId=value
    this.mydata.BehavDistrictId.subscribe(() => {


      if (this.mydata.BehavDistrictId.getValue() != 0) {
        this.newId = this.mydata.BehavDistrictId.getValue();
        console.log("seen in one " + this.newId);
      }

      this.mydata.TheOptionForRadioButton.subscribe(() => {
        if (this.form.value.option === '1') {

          //update 2 ahmed
          this.mydata.chartsinfo(value).subscribe((data) => {
            //this.DId=value
            // this.mdarr = data;
            this.results = []

this.results = formatDataForChart(data);
this.results2 = formatDataForChart2(data);





            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


            console.log(this.mdarr);

          });




        }
        else if (this.form.value.option === '2') {  //update 3 ahmed
          this.mydata.GetInfoAboutSectionDistress(value).subscribe((data) => {
            // this.mdarr = data;  //canseled it
            this.results = []

            this.results = formatDataForChart(data);
            this.results2 = formatDataForChart2(data);
            // data.forEach(e => {
            //   this.results.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // });
            // this.results2 = []
            // data.forEach(e => {
            //   this.results2.push({
            //     value: e.AREA, name: e.DISTRESS_EN_TYPE
            //   })

            // })

            // this.results2 = [...this.results2]
            this.results = [...this.results]


          });
        }

      })

    })

    function formatDataForChart(data) {
      const formattedData = [];
      data.forEach(item => {
        let series1 = { name: "AREA", value: item.QUANTITY };
        let series2 = { name: "QUANTITY", value: item.AREA };
        formattedData.push({
          name: item.DISTRESS_EN_TYPE,
          series: [series1, series2],
          
        });
      });
      return formattedData;
    }
    function formatDataForChart2(data) {
      const formattedData = [];
      data.forEach(item => {
        let series1 = { name: "AREA", value: item.QUANTITY };
        let series2 = { name: "QUANTITY", value: item.AREA };
        formattedData.push({
          name: item.DISTRESS_EN_TYPE,
          series: [series1, series2],
          
        });
      });
      return formattedData;
    }




  }


  //hhhhhhhhhhhhhhh

  District(e): any {

    if (this.AllStreetsByRegionId) {
      this.DistrictId = e.target.value;
      console.log(this.DistrictId);
      console.log("hello3");
      if (this.SSections) {
        this.SSections = 202
        this.mdservice.getAllMDs(this.SSections,this.survey_no).subscribe((data) => {
          //         // this.mdarr = data;
          //         this.results = []
          //         data.forEach(e => {
          //           this.results.push({
          //             value: e.MD_COST, name: e.RECOMMENDED_DECISION

          //           })
          //         })
          //         this.results = [...this.results]
          //         console.log(this.mdarr);
        });





      }
    }
    else {
      this.SSections = [];
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



  regionId:any;



  //document.getElementById("element").style.display = "none";


  onItemSelect(item: any) {
    console.log(item);
  //   this.streetId=item.STREET_ID;
  // console.log(this.streetId)

    this.regionId=item.REGION_NO;
    console.log(this.regionId);
    


    this.selectedItems2=[]



    console.log(this.survey_no);
    console.log(this.regionId);


    this.charts3.GetAllStreetByRegionId(this.regionId).subscribe((res) => {
      this.AllStreetsByRegionId = res;
      this.dropdownList2=res;
      console.log(this.AllStreetsByRegionId);

      console.log(this.survey_no);
      console.log(this.regionId);

           this.charts3.GetInfoChartOfRegion(this.survey_no,this.regionId).subscribe((res)=>{
              console.log(res);




              this.results = []

              this.results = formatDataForChart(res);
              this.results2 = formatDataForChart2(res);




                      // data.forEach(e => {
                      //   this.results.push({
                      //     value: e.AREA, name: e.DISTRESS_EN_TYPE
                      //   })

                      // });
                      // this.results2 = []
                      // data.forEach(e => {
                      //   this.results2.push({
                      //     value: e.AREA, name: e.DISTRESS_EN_TYPE
                      //   })

                      // })

                      // this.results2 = [...this.results2]
                      this.results = [...this.results]


                      console.log(this.mdarr);


















           });


          //  function formatDataForChart(data) {
          //   const formattedData = [];
          //   data.forEach(item => {
          //     let series1 = { name: " MAINT_PRIORITY", value: item.MAINT_PRIORITY };
          //     let series2 = { name: "MD_COST2", value: item.MD_COST2 };
          //     formattedData.push({
          //       name: item. MAIN_NO,
          //       series: [series1, series2]
          //     });
          //   });
          //   return formattedData;
          // }

          function formatDataForChart(data) {
            const formattedData = [];
            data.forEach(item => {
              //let series1 = { name: " MAINT_PRIORITY", value: item.MAINT_PRIORITY };  //1
              let series2 = { name: "MD_COST", value: item.MD_COST };   //HERE
              formattedData.push({
                name: item. MAIN_NO,
                series: [series2]
              });
            });
            return formattedData;
          }

          function formatDataForChart2(data) {
            const formattedData = [];
            data.forEach(item => {
              let series1 = { name: " MAINT_PRIORITY", value: item.MAINT_PRIORITY };  //1
             // let series2 = { name: "MD_COST2", value: item.MD_COST2 };
              formattedData.push({
                name: item. MAIN_NO,
                series: [series1]
              });
            });
            return formattedData;
          }


    })






























    // this.charts3.GetAllStreetByRegionId(this.regionId).subscribe((streets) => {  //20
    //   this.AllStreetsByRegionId = streets;
    //   this.dropdownList2=streets
    //   console.log(this.AllStreetsByRegionId);


    // })



  }
  onSelectAll(items: any) {
    console.log(items);
                                          //22


  }



  dropdownList = [];
selectedItems = [];
dropdownSettings = {

};














//new2




dropdownList2 = [];
selectedItems2 = [];
dropdownSettings2 = {

};

streetId:any;



onItemSelect2(item: any) {
  console.log(item);
  this.streetId=item.MAIN_NO;
console.log(this.streetId)
  // this.regionId=item.REGION_ID;
  // console.log(this.regionId);

  this.selectedItems3=[]

//   this.UpdateRegionSection.GetStreetByRegionId(this.regionId).subscribe((res)=>{
//     console.log(res);
//     this.streets=res;

//     this.source2.load(res);
//    // this.checkload=true;
// });


this.allDistrictsByMunicipalityId = this.streetId;
console.log(this.allDistrictsByMunicipalityId);
console.log("hello2");
console.log(this.streetId);
this.charts3.GetInfoAboutStreet(this.streetId,this.survey_no).subscribe((res) => {
  this.SSections = res;
  this.dropdownList3=res;
  console.log(this.SSections);



 // GetDistrictByMunicipalityId




//22-5-2023



this.mydata.BehavDistrictId.subscribe(() => {


  if (this.mydata.BehavDistrictId.getValue() != 0) {
    this.newId = this.mydata.BehavDistrictId.getValue();
    console.log("seen in one " + this.newId);
  }

  this.mydata.TheOptionForRadioButton.subscribe(() => {
    if (this.form.value.option === '1') {

      //update 2 ahmed
      console.log(this.survey_no);
this.charts3.GetInfoAboutStreet(this.streetId,this.survey_no).subscribe((data)=>{
console.log(data);
        //this.DId=value
        // this.mdarr = data;
        this.results = []

this.results = formatDataForChart(data);
this.results2 = formatDataForChart2(data);




        // data.forEach(e => {
        //   this.results.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // });
        // this.results2 = []
        // data.forEach(e => {
        //   this.results2.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // })

        // this.results2 = [...this.results2]
        this.results = [...this.results]


        console.log(this.mdarr);

      });




    }
    else if (this.form.value.option === '2') {  //update 3 ahmed

this.charts3.GetInfoAboutStreet(this.streetId,this.survey_no).subscribe((data)=>{
console.log(data);
        // this.mdarr = data;  //canseled it
        this.results = []

        this.results = formatDataForChart(data);
        this.results2 = formatDataForChart2(data);

        // data.forEach(e => {
        //   this.results.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // });
        // this.results2 = []
        // data.forEach(e => {
        //   this.results2.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // })

        // this.results2 = [...this.results2]
        this.results = [...this.results]


      });
    }

  })

})

function formatDataForChart(data) {
  const formattedData = [];
  data.forEach(item => {
  //  let series1 = { name: "MAINT_PRIORITY", value: item.MAINT_PRIORITY };    //2
    let series2 = { name: "MD_COST2", value: item.MD_COST2 };
    formattedData.push({
      name: item.SECTION_NO,
      series: [series2]
    });
  });
  return formattedData;
}

function formatDataForChart2(data) {
  const formattedData = [];
  data.forEach(item => {
    let series1 = { name: "MAINT_PRIORITY", value: item.MAINT_PRIORITY };    //2
   // let series2 = { name: "MD_COST", value: item.MD_COST2 };
    formattedData.push({
      name: item.SECTION_NO,
      series: [series1]
    });
  });
  return formattedData;
}











//here00







//});



},
  (err) => { },
  () => { }
);





}
onSelectAll2(items: any) {
  console.log(items);
}











//final

dropdownList3 = [];
selectedItems3 = [];
dropdownSettings3 = {

};


  

SECTION_NO:any;

onItemSelect3(item: any) {
  console.log(item);
  this.SECTION_NO=item.SECTION_NO;
console.log(this.SECTION_NO);
  // this.regionId=item.REGION_ID;
  // console.log(this.regionId);



//   this.UpdateRegionSection.GetStreetByRegionId(this.regionId).subscribe((res)=>{
//     console.log(res);
//     this.streets=res;

//     this.source2.load(res);
//    // this.checkload=true;
// });




//this.DId=value
this.mydata.BehavDistrictId.subscribe(() => {


  if (this.mydata.BehavDistrictId.getValue() != 0) {
    this.newId = this.mydata.BehavDistrictId.getValue();
    console.log("seen in one " + this.newId);
  }

  this.mydata.TheOptionForRadioButton.subscribe(() => {
    if (this.form.value.option === '1') {

      //update 2 ahmed
      this.mydata.chartsinfo(this.SECTION_NO).subscribe((data) => {
        //this.DId=value
        // this.mdarr = data;
        this.results = []

this.results = formatDataForChart(data);
this.results2 = formatDataForChart2(data);




        // data.forEach(e => {
        //   this.results.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // });
        // this.results2 = []
        // data.forEach(e => {
        //   this.results2.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // })

        // this.results2 = [...this.results2]
        this.results = [...this.results]


        console.log(this.mdarr);

      });




    }
    else if (this.form.value.option === '2') {  //update 3 ahmed
      this.mydata.GetInfoAboutSectionDistress(this.SECTION_NO).subscribe((data) => {
        // this.mdarr = data;  //canseled it
        this.results = []

        this.results = formatDataForChart(data);
        this.results2 = formatDataForChart2(data);

        // data.forEach(e => {
        //   this.results.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // });
        // this.results2 = []
        // data.forEach(e => {
        //   this.results2.push({
        //     value: e.AREA, name: e.DISTRESS_EN_TYPE
        //   })

        // })

        // this.results2 = [...this.results2]
        this.results = [...this.results]


      });
    }

  })

})

function formatDataForChart(data) {
  const formattedData = [];
  data.forEach(item => {
    let series1 = { name: "AREA", value: item.QUANTITY };
    let series2 = { name: "QUANTITY", value: item.AREA };
    formattedData.push({
      name: item.DISTRESS_EN_TYPE,
      series: [series1, series2]
    });
  });
  return formattedData;
}

function formatDataForChart2(data) {
  const formattedData = [];
  data.forEach(item => {
    let series1 = { name: "AREA", value: item.QUANTITY };
    let series2 = { name: "QUANTITY", value: item.AREA };
    formattedData.push({
      name: item.DISTRESS_EN_TYPE,
      series: [series1, series2]
    });
  });
  return formattedData;
}




}
onSelectAll3(items: any) {
  console.log(items);
}




SURVEIES(e)
{
console.log(e.target.value);
this.survey_no=e.target.value;

this.selectedItems=[]
this.selectedItems2=[]   //22


this.charts3.getAllRegions(this.survey_no).subscribe((reg) => {
  this.arrofallcities = reg;
  this.dropdownList=reg
  console.log(this.arrofallcities);
});


}






allSyrvey:any[];
survey_no:any;

  ngOnInit(): void {
    var result: any

    // this.mydata.getAllRegions().subscribe((reg) => {
    //   this.arrofallcities = reg;
    //   this.dropdownList=reg
    //   console.log(this.arrofallcities);
    // });


    this.charts3.GetAllSurvey().subscribe((sur) => {
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
    this.allDistrictsByMunicipalityId = 0;

    /* this.mydata.GetSideW3alkInfoChart(202).subscribe(data => {
       this.results = data.map(item => {
         return { name: item.DISTRESS_AR_TYPE, value: item.AREA }
       });
     });*/


     this.selectedItems = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'REGION_NO',
      textField: 'ENNAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };





















    ///new



    this.selectedItems2 = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'MAIN_NO',
      textField: 'ENNAME',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };



























    ///FINAL



    this.selectedItems3 = [
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings3 = {
      singleSelection: true,
      idField: 'SECTION_NO',
      textField: 'SECTION_NO',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
      //defaultOpen:true,
    };








  }




}
