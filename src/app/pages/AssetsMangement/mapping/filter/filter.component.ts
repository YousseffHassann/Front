import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { AssetsServices } from '../../assets/assets.service';
import { LookupService } from '../../assets/lookups.service';

@Component({
  selector: 'ngx-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  mapCenter = [31.718215942382812, 30.13503239124785];
  basemapType = 'satellite';
  mapZoomLevel = 12;
  asset = { id: 61, address: "Address1" };
  lookupValues = [[], [], [], [], [], [], [], []];
  assetsData = [];
  source: LocalDataSource;
  selectedGov: any;
  selectedOwnerShipType: any;
  selectedPhysicalStatus: any;
  selectedRentalStatus: any;


  constructor(private lookUpServices: LookupService, private assetsServices: AssetsServices) { }

  async ngOnInit(): Promise<void> {
    var result = await this.lookUpServices.getLookupById([1, 3, 6]).toPromise();
    for (var response in result) {
      // console.log(result[response]["type_ID"])
      this.lookupValues[result[response]["type_ID"] - 1]
        .push(result[response]);
    }
    const govResponse = await this.lookUpServices.getGevernments().toPromise();
    this.lookupValues.push(govResponse);
    console.log("The lookups are:", this.lookupValues);
    await this.retrieveAssets();

  }
  async retrieveAssets() {
    const response = await this.assetsServices.getAssets().toPromise();
    // console.log(response);
    this.assetsData = [];
    for (const key in response) {
      this.assetsData.push(response[key])
    }
    this.source = new LocalDataSource(this.assetsData);
    return;
  }
  setFilter(source: LocalDataSource) {
    source.setFilter([]);
    if (this.selectedGov != -1) {
      console.log("Gov", this.selectedGov);
      source.addFilter({
        field: 'gov_id',
        search: String(this.selectedGov)

      }, true);
    } if (this.selectedPhysicalStatus != -1) {
      console.log("Phys", this.selectedPhysicalStatus);
      source.addFilter({
        field: 'physicalStatus',
        search: this.selectedPhysicalStatus,

      }, true);
    } if (this.selectedOwnerShipType != -1) {
      console.log("Owner", this.selectedOwnerShipType);
      source.addFilter({
        field: 'ownerShipType',
        search: this.selectedOwnerShipType,

      }, true);
    } if (this.selectedRentalStatus != -1) {
      console.log("Rental", this.selectedRentalStatus);
      source.addFilter({
        field: 'rentalStatus',
        search: this.selectedRentalStatus,
      }, true);
    }

  }
  // onClear() {
  //   this.source.setFilter([]);
  //   this.selectedGov = -1;
  //   this.selectedOwnerShipType = -1;
  //   this.selectedRentalStatus = -1;
  //   this.selectedPhysicalStatus = -1;
  //   this.setFilter(this.source);
  // }
  async onApply() {
    this.setFilter(this.source);
    const filteredData = await this.source.getFilteredAndSorted() as [];
    const ids = []
    filteredData.forEach(data => {
      ids.push(data["id"]);
    });
    console.log(ids);
    console.log(this.selectedGov);
    this.assetsServices.sendDataToMap(ids, this.selectedGov);
  }

}
