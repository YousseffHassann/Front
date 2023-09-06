import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { SideWalkChartService } from '../../Services/ChartsServices/side-walk-chart.service';



@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})


export class ChartjsBarComponent   {
  data: any;
  options: any;
  themeSubscription: any;
  DistrictIdFromChild:number=0;
  arr:any[]=[]; //chartsinfo

   newId:number;
  
  
  constructor(private theme: NbThemeService,private mydata:SideWalkChartService) {    
    this.mydata.BehavDistrictId.subscribe(()=>{
      if(this.mydata.BehavDistrictId.getValue()!=0)
     {
       this.newId=this.mydata.BehavDistrictId.getValue();
       console.log("seen in one "+this.newId);
      }
     //will make check for radio Button Hire 
     this.mydata.TheOptionForRadioButton.subscribe(()=>{


  if(this.mydata.TheOptionForRadioButton.getValue()==='option1')
{
  this.mydata.chartsinfo(this.newId).subscribe((service)=>{  //chartsinfo
    this.arr=service;  //chrtsInfo
   console.log(this.arr);
   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
     //console.log(this.yaxis[0])
     const colors: any = config.variables;
     const chartjs: any = config.variables.chartjs;

     this.data = {
       labels: [this.arr[0].DISTRESS_EN_TYPE,this.arr[1].DISTRESS_EN_TYPE,this.arr[2].DISTRESS_EN_TYPE,this.arr[2].DISTRESS_EN_TYPE,
       this.arr[3].DISTRESS_EN_TYPE,this.arr[4].DISTRESS_EN_TYPE, this.arr[5].DISTRESS_EN_TYPE, this.arr[6].DISTRESS_EN_TYPE],
       datasets: [{
        data: [this.arr[0].QUANTITY
         , this.arr[1].QUANTITY, this.arr[2].QUANTITY, this.arr[3].QUANTITY, this.arr[4].QUANTITY, this.arr[5].QUANTITY, this.arr[6].QUANTITY,
         this.arr[7].QUANTITY],
        //data: this.yaxis,
         label: 'Quantity',
         backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
       }, 
       {
         data: [this.arr[0].QUANTITY
         , this.arr[1].AREA, this.arr[2].AREA, this.arr[3].AREA, this.arr[4].AREA, this.arr[5].AREA, this.arr[6].AREA,
         this.arr[7].AREA],
         label: 'Area',
         backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
       }

     ],
     };

     this.options = {
       maintainAspectRatio: false,
       responsive: true,
       legend: {
         labels: {
           fontColor: chartjs.textColor,
         },
       },
       scales: {
         xAxes: [
           {
             gridLines: {
               display: false,
               color: chartjs.axisLineColor,
             },
             ticks: {
               fontColor: chartjs.textColor,
             },
           },
         ],
         yAxes: [
           {
             gridLines: {
               display: true,
               color: chartjs.axisLineColor,
             },
             ticks: {
               fontColor: chartjs.textColor,
             },
           },
         ],
       },
     };
   });
   //console.log(this.arr[0]);
})

}

 else if(this.mydata.TheOptionForRadioButton.getValue()==='option2')

 {
//   this.mydata.GetSideW3alkInfoChart(this.newId).subscribe((service)=>{  //chartsinfo
//     this.arr=service;  //chrtsInfo
//    console.log(this.arr);
//    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
//      //console.log(this.yaxis[0])
//      const colors: any = config.variables;
//      const chartjs: any = config.variables.chartjs;

//      this.data = {
//       labels: [this.arr[0].DISTRESS_AR_TYPE,this.arr[1].DISTRESS_AR_TYPE,this.arr[2].DISTRESS_AR_TYPE,this.arr[2].DISTRESS_AR_TYPE,
//       this.arr[3].DISTRESS_AR_TYPE,this.arr[4].DISTRESS_AR_TYPE, this.arr[5].DISTRESS_AR_TYPE],
//      //labels: this.xaxis,
//       datasets: [{
//        //data: [65, 59, 80, 81, 56, 55, 40,60],
//        data: [this.arr[0].QUANTITY
//         , this.arr[1].QUANTITY, this.arr[2].QUANTITY, this.arr[3].QUANTITY, this.arr[4].QUANTITY, this.arr[5].QUANTITY],
//        //data: this.yaxis,
//         label: 'Quantity',
//         backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
//       }, 
//       {
//         data: [this.arr[0].QUANTITY
//         , this.arr[1].AREA, this.arr[2].AREA, this.arr[3].AREA, this.arr[4].AREA, this.arr[5].AREA],
//         label: 'Area',
//         backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
//       }
//     ],
//     };

//      this.options = {
//        maintainAspectRatio: false,
//        responsive: true,
//        legend: {
//          labels: {
//            fontColor: chartjs.textColor,
//          },
//        },
//        scales: {
//          xAxes: [
//            {
//              gridLines: {
//                display: false,
//                color: chartjs.axisLineColor,
//              },
//              ticks: {
//                fontColor: chartjs.textColor,
//              },
//            },
//          ],
//          yAxes: [
//            {
//              gridLines: {
//                display: true,
//                color: chartjs.axisLineColor,
//              },
//              ticks: {
//                fontColor: chartjs.textColor,
//              },
//            },
//          ],
//        },
//      };
//    });
//    //console.log(this.arr[0]);
// })
 }

 
 
      })


},
  (err) => {},
  () => {});
  
  }//constructor



}
