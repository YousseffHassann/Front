import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { lab } from 'd3-color';
import { LocalDataSource } from 'ng2-smart-table';
import { stringify } from 'querystring';
import { AssetsServices } from '../assets/assets.service';
import { LookupService } from '../assets/lookups.service';
import { AssetsChartsService } from './assets-charts.service';

@Component({
  selector: 'ngx-assets-charts',
  templateUrl: './assets-charts.component.html',
  styleUrls: ['./assets-charts.component.scss']
})
export class AssetsChartsComponent implements OnInit {
  assetsCountData: any;
  chartsAreaData: any;
  chartsAverageData: any;
  govs = [];
  assetsData = [];
  lookupValues = [[], [], [], [], [], [], [], []];
  filteringColumns = ["physicalStatus", "usageType", "ownerShipType", "type", "legalStatus", "rentalStatus", "InvestmentStatus", "InvestmentValue"]
  source: LocalDataSource;
  displayLegend: boolean;
  constructor(private assetChartServices: AssetsChartsService, private assetsServices: AssetsServices, private lookUpServices: LookupService) {
    this.assetsCountData = {
      labels: [],
      datasets: [],
    };
  }


  async ngOnInit(): Promise<void> {
    this.chartsAreaData = await this.assetChartServices.getAssetsArea().toPromise();
    this.chartsAverageData = await this.assetChartServices.getAssetsAvgs().toPromise();
    const assetDataResponse = await this.assetsServices.getAssets().toPromise();
    for (const key in assetDataResponse) {
      this.assetsData.push(assetDataResponse[key])
    }
    this.source = new LocalDataSource(this.assetsData);
    this.govs = await this.lookUpServices.getGevernments().toPromise();
    var result = await this.lookUpServices.getLookupById([1, 2, 3, 4, 5, 6, 7, 8]).toPromise();
    for (var response in result) {
      this.lookupValues[result[response]["type_ID"] - 1]
        .push(result[response]);
    }
    console.log("The govs", this.govs);
    console.log("The lookups are", this.lookupValues);
    console.log("The asset data source is", this.source);
    this.initiallizeAssetsCountChartData();
  }
  async initiallizeAssetsCountChartData() {
    this.displayLegend = false;
    var values = []
    var labels: string[] = [];
    const data = await this.source.getAll() as [];
    // console.log(data);
    // Get count of assets in each gov.
    data.forEach(element => {
      // console.log(element);
      values[element["gov_id"] - 1] == null ? values[element["gov_id"] - 1] = 1 : values[element["gov_id"] - 1]++;
      labels[element["gov_id"] - 1] = this.govs[element["gov_id"] - 1]["Name"];
    });
    // console.log("Values", values);
    // console.log("Labels", labels);
    const temp = [];
    temp.push({
      data: values,
      backgroundColor: this.getRandomColorArray(values.length),
    });
    this.assetsCountData = {
      labels: labels,
      datasets: temp,
    };

  }
  getRandomColor() {
    // var color = Math.floor(0x1000000 * Math.random()).toString(16);
    // return '#' + ('000000' + color).slice(-6);
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getRandomColorArray(count) {
    var colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;

  }
  async onSelectChange(event) {
    if (event == 0) {
      this.initiallizeAssetsCountChartData();
    } else {
      this.displayLegend = true;
      console.log("From outside", event);
      var labels: string[] = [];
      var datasets = [];

      var values = [];
      var source2: LocalDataSource;
      source2 = new LocalDataSource(this.assetsData);
      for (var lookup = 0; lookup < this.lookupValues[event - 1].length; lookup++) {

        await this.govs.forEach(async (gov, index) => {
          if (Number(lookup) == 0) labels.push(gov["Name"]);//Adding labels
          source2.setFilter([
            {
              field: 'gov_id',
              search: String(gov["Id"])
            }, {
              field: this.filteringColumns[event - 1],
              search: String(this.lookupValues[event - 1][lookup].lookup_ID),
            },]);
          var filteredAssets: [] = await source2.getFilteredAndSorted() as [];
          var count = filteredAssets.length;
          // console.log("The count of", this.lookupValues[event - 1][lookup].code_Desc_AR, "in", gov["Name"], "is", count);
          values.push(count);
          source2.setFilter([]);
        });
        const dataSet = { data: null, label: null, backgroundColor: null };
        dataSet.backgroundColor = this.getRandomColor();
        dataSet.label = this.lookupValues[event - 1][lookup].code_Desc_AR;
        dataSet.data = values;
        datasets.push(dataSet);
        values = [];
      }
      console.log("Datasets",datasets);
      console.log("Labels",labels);
      this.assetsCountData = {
        labels: labels,
        datasets: datasets,
      };
    }
  }
}
