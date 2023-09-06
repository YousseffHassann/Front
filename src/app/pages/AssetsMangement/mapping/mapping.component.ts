import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetsServices } from '../assets/assets.service';
import { LookupService } from '../assets/lookups.service';

@Component({
  selector: 'ngx-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  mapCenter = [31.718215942382812, 30.13503239124785];
  basemapType = 'satellite';
  mapZoomLevel = 12;
  asset = { id: 61, address: "Address1" };

  constructor() { }

  ngOnInit(): void {


  }
  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

}
