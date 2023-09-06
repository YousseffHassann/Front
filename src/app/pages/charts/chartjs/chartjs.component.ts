import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SideWalkChartService } from '../../Services/ChartsServices/side-walk-chart.service';



@Component({
  selector: 'ngx-chartjs',
  styleUrls: ['./chartjs.component.scss'],
  templateUrl: './chartjs.component.html',
})





export class ChartjsComponent implements OnInit {
newId:number;
realId:number;
  arrofallcities:any[]=[];
  selectedCityId:number=0;
  allMunicipalitiesBySpesificCityId:any;
  allDistrictsByMunicipalityId:number=0;
  MunicicipalityIdForSpesificSelection:any;
  Districts:any;
  DistrictId:number;
  myoption:any;




  City(e):any
  {
    this.selectedCityId=e.target.value;
    console.log(this.selectedCityId);
     console.log("hello");

    // this.mydata.GetMubicipalityByCityId(this.selectedCityId).subscribe((municipalities)=>{
    //   this.allMunicipalitiesBySpesificCityId=municipalities;
    //   console.log(this.allMunicipalitiesBySpesificCityId);
    //   })
  }
 
  Munipilarity(e):any
  {
    this.allDistrictsByMunicipalityId=e.target.value;
    console.log(this.allDistrictsByMunicipalityId);
     console.log("hello2");

  //   this.mydata.GetDistrictByMunicipalityId(this.allDistrictsByMunicipalityId).subscribe((allDistrictsByMunicipalityId)=>{
  //   this.Districts=allDistrictsByMunicipalityId;
  //    console.log( this.Districts);
  //  },
  //  (err) => {},
  //  () => {}
  //  );
   
  }
 

  District(e):any
  {
  
    if(this.allMunicipalitiesBySpesificCityId)
    {
       this.DistrictId=e.target.value;
       console.log(this.DistrictId);
       console.log("hello3");
    }
    else
    {
      this.Districts=[];
    }

   if(this.Districts)
   {
    this.mydata.BehavDistrictId.next(this.DistrictId);

     this.mydata.BehavDistrictId.subscribe(()=>{
     console.log(this.mydata.BehavDistrictId.getValue());
   });
 
   }
  }

 
radio(e){
  console.log(e.target.value);
  this.myoption=e.target.value;
  this.mydata.TheOptionForRadioButton.next(this.myoption);
}


constructor(private mydata:SideWalkChartService)
{
  // this.mydata.getallcities().subscribe((cities)=>{
  //   this.arrofallcities=cities;
  //   console.log(this.arrofallcities);
  //  });

document.getElementById('opt1');
console.log(document.getElementById('opt1'));


}
  ngOnInit(): void {
    console.log(this.mydata.BehavDistrictId.getValue());
    this.allDistrictsByMunicipalityId=0;

  }


}


