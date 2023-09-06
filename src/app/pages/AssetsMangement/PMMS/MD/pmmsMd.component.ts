import { Component, OnInit } from "@angular/core";
import { PmmsMdService } from "./pmmsMd.service";
import { PmmsService } from "../PCI/pmms.service";

@Component({
  selector: "ngx-pmms",
  templateUrl: "./pmmsMd.component.html",
})
export class PmmsMdComponent implements OnInit {
  Assets = [
    { id: 61, address: "Address1" },
    { id: 41, address: "Address2" },
  ];
  asset = { id: 61, address: "Address1" };

  ClassficationObj = "PhysicalStatus"; ////////////initial default classification
   x:any="ahmed";
  //asset = {} ;

  //constructor(private Asset1:Asset) {
  constructor(private pmmsMD1:PmmsMdService,private pmmsService:PmmsService) {
    //  constructor( ) {
    // Asset1.id = 1 ;
  }
         
  //mapCenter = [-122.4194, 37.7749];
  // mapCenter = [31.718215942382812, 30.13503239124785];
 // mapCenter = [39.17757, 21.4925];

 mapCenter = [49.984360,26.399250];
  basemapType = "dark-gray-vector";
  mapZoomLevel = 5;

  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log("The map loaded: " + status);
  }

// Status:any;
// refresh:any;
// loading:boolean=false;
// afterRefresh:boolean=false;
//   Refresh()
//   {
//     this.loading=true;
//    this.afterRefresh=true;
//     this.pmmsMD1.Refresh("md",14,3).subscribe((res)=>{
//          console.log(res);
//          this.refresh=res;

//          setTimeout(()=>{
//           this.pmmsMD1.CheckStatus().subscribe((res)=>{
//             console.log(res);
//             this.Status=res;

            





//        });
//         },10000);

//         //  this.pmmsMD1.CheckStatus().subscribe((status)=>{
//         //   console.log(status);
          


//         //   // if(status!=-1)
//         //   // {
//         //   //    this.loading=false;
//         //   //    this.Status=1;
//         //   //    console.log(status);
//         //   // }
//         //   // else{
//         //   //  console.log("status is -1");
//         //   // }

//         //  });

       
    
        
         
//     });
//   }
  



  ngOnInit(): void {
    // this.Asset1.id = 40 ;
    // this.Asset1.address= "Address1" ;
    // this.Assets.push(this.Asset1) ;

//     this.pmmsMD1.CheckStatus().subscribe((res)=>{
//       console.log(res);
//       this.Status=res;
//  });

  }
}
