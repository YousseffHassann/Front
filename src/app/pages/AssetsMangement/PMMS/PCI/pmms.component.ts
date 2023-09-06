import { Component, OnInit } from "@angular/core";
import { AssetsSettingsService } from "../../assets-settings.service"

@Component({
  selector: "ngx-pmms",
  templateUrl: "./pmms.component.html",
})
export class PmmsComponent implements OnInit {
  Assets = [
    { id: 61, address: "Address1" },
    { id: 41, address: "Address2" },
  ];
  asset = { id: 61, address: "Address1" };

  ClassficationObj = "PhysicalStatus"; ////////////initial default classification

  //asset = {} ;

  //constructor(private Asset1:Asset) {
  constructor( private ppmsserveice: AssetsSettingsService) {
    //  constructor( ) {
    // Asset1.id = 1 ;
  }

  //mapCenter = [-122.4194, 37.7749];
  // mapCenter = [31.718215942382812, 30.13503239124785];
 // mapCenter = [39.17757, 21.4925];
  //mapCenter = [39.17757, 21.4925];

//   mapCenter = [49.984360,26.399250];
// basemapType = "dark-gray-vector";
//   mapZoomLevel =10 ;
  mapCenter = this.ppmsserveice.mapSetting.mapCenter;

basemapType =this.ppmsserveice.mapSetting.basemapType;
  mapZoomLevel =this.ppmsserveice.mapSetting.mapZoomLevel;;
  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log("The map loaded: " + status);
  }
  ngOnInit(): void {
    // this.Asset1.id = 40 ;
    // this.Asset1.address= "Address1" ;
    // this.Assets.push(this.Asset1) ;
  }
}
