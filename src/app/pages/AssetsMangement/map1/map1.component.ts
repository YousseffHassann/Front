import { Component, OnInit } from "@angular/core";

import { Asset } from "../assets/asset.model";

@Component({
  selector: "ngx-map1",
  templateUrl: "./map1.component.html",
  styleUrls: ["./map1.component.scss"],
})
export class Map1Component implements OnInit {
  Assets = [
    { id: 61, address: "Address1" },
    { id: 41, address: "Address2" },
  ];
  asset = { id: 61, address: "Address1" };

  ClassficationObj = "PhysicalStatus"; ////////////initial default classification

  //asset = {} ;

  //constructor(private Asset1:Asset) {
  constructor() {
    //  constructor( ) {
    // Asset1.id = 1 ;
  }

  //mapCenter = [-122.4194, 37.7749];

  mapCenter =  [21.4925, 39.17757];
  basemapType = "satellite";
  mapZoomLevel = 10;

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
