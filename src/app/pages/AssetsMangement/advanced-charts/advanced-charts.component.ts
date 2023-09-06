import { Component, OnInit, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ChartComponent } from 'angular2-chartjs';

import { LocalDataSource } from 'ng2-smart-table';
import { AssetsServices } from '../assets/assets.service';
import { LookupService } from '../assets/lookups.service';

@Component({
  selector: 'ngx-advanced-charts',
  templateUrl: './advanced-charts.component.html',
  styleUrls: ['./advanced-charts.component.scss']
})
export class AdvancedChartsComponent implements OnInit {
  @ViewChild("barChart") barChart: ChartComponent;
  @ViewChild("pieChart") pieChart: ChartComponent;
  source: LocalDataSource;
  themeSubscription: any;
  colors: any;
  chartjs: any;
  assetsData = [];
  lookupValues = [];
  selectedGov = -1;
  selectedPhysicalStatus = -1;
  selectedOwnerShipType = -1;
  selectedRentalStatus = -1;
  barData = {
    labels: [],
    datasets: [],
  };

  pieData = {
    labels: [],
    datasets: [],
  };
  averageChartData: any;
  pieOptions: any;
  barOptions: any;

  constructor(private assetsServices: AssetsServices, private lookupService: LookupService, private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;
      this.pieOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
      };
      this.barOptions = {

        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: this.chartjs.axisLineColor,
              },
              ticks: {
                fontColor: this.chartjs.textColor,
                beginAtZero: true,
              },
            },
          ],
        },


      };
    });

  }
  async ngOnInit(): Promise<void> {
    const govResponse = await this.retreiveGovernments();
    this.lookupValues.push(govResponse);
    const temp = []

    govResponse.forEach((item) => {
      temp.push(item["Name"]);
    });

    this.barData.labels = temp;
    this.pieData.labels = temp;
    const physicalStatusResponse = await this.retreiveLookupsById(1);

    this.lookupValues.push(physicalStatusResponse);
    const ownerShipType = await this.retreiveLookupsById(3);

    this.lookupValues.push(ownerShipType);
    const rentalStatus = await this.retreiveLookupsById(6);

    this.lookupValues.push(rentalStatus);
    await this.retrieveAssets();

    this.initiallizeChart();
    this.getAverageChartData();

  }
  async getAverageChartData() {
    const temp = [];
    const data = await this.source.getAll() as [];
    data.forEach(element => {
      if (element["Avg"] != 0) {
        temp.push({
          "Name": element["name"],
          "Avg": element["Avg"],
        });
      }
      this.averageChartData = temp;

    });
    console.log(this.averageChartData);
  }
  async getAllGovsCount() {
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    const data = await this.source.getAll() as [];
    data.forEach(element => {
      values[element["gov_id"] - 1]++;
    });
    return values;
  }
  async getAllGovsArea() {
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    const data = await this.source.getAll() as [];
    data.forEach(element => {
      values[element["gov_id"] - 1] += element["area"];
    });
    return values;
  }
  async getFilteredGovsArea() {
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    var tempSource: LocalDataSource;
    tempSource = this.source;
    this.setFilter(tempSource);
    const data = await tempSource.getFilteredAndSorted() as [];
    data.forEach(element => {
      values[element["gov_id"] - 1] += element["area"];
    });
    return values;
  }

  async getPhysicalStatusGovsCount() {
    const physicalStatus = this.selectedPhysicalStatus;
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    const data = await this.source.getFilteredAndSorted() as [];
    data.forEach(element => {
    
      if (element["physicalStatus_AR"] === physicalStatus)
        values[element["gov_id"] - 1]++;
    });
    return { label: physicalStatus, data: values, backgroundColor: this.getRandomColor(), };
  }

  async getOwnerShipTypeGovsCount() {
    const ownerShipType = this.selectedOwnerShipType;
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    const data = await this.source.getFilteredAndSorted() as [];
    data.forEach(element => {
      if (element["ownerShipType"] === ownerShipType)
        values[element["gov_id"] - 1]++;
    });
    return { label: ownerShipType, data: values, backgroundColor: this.getRandomColor(), };
  }
  async getRentalStatusGovsCount() {
    const rentalStatus = this.selectedRentalStatus
    var values: number[] = new Array(this.lookupValues[0].length).fill(0);
    const data = await this.source.getFilteredAndSorted() as [];
    data.forEach(element => {
      if (element["rentalStatus"] === rentalStatus)
        values[element["gov_id"] - 1]++;
    });
    return { label: rentalStatus, data: values, backgroundColor: this.getRandomColor(), };
  }

  async initiallizeChart() {
    this.barData.datasets = [];
    this.barData.datasets.push({
      data: await this.getAllGovsCount(),
      backgroundColor: this.getRandomColorArray(this.lookupValues[0].length),
    });
    console.log(this.barData.datasets);
    this.pieData.datasets = [];
    this.pieData.datasets.push({
      data: await this.getAllGovsArea(),
      backgroundColor: this.getRandomColorArray(this.lookupValues[0].length),
    })
    this.barChart.chart.update();
    this.pieChart.chart.update();
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
  async retrieveAssets() {
    const response = await this.assetsServices.getAssets().toPromise();
    console.log(response);
    this.assetsData = [];
    for (const key in response) {
      this.assetsData.push(response[key])
    }
    this.source = new LocalDataSource(this.assetsData);
    return;
  }
  retreiveLookupsById(id: number) {
    return this.lookupService.getLookupById(id).toPromise();
  }
  retreiveGovernments() {
    return this.lookupService.getGevernments().toPromise<[]>();
  }
  onSelectedGov(event) {
    this.selectedGov = event;
  }
  onSelectedPhysicalStatus(event) {
    this.selectedPhysicalStatus = event;

  }
  onSelectedOwnerShipType(event) {
    this.selectedOwnerShipType = event;

  }
  onSelectedRentalStatus(event) {
    this.selectedRentalStatus = event;

  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'left',
      columnTitle: "",
    },
    columns: {
      name: {
        title: 'أسم الأصل',
        filter: false,
      },
      gov_id: {
        title: 'المحافظة',
        filter: false,
      },
      physicalStatus_AR: {
        title: 'الوضع المادي',
        filter: false,
      },

      ownerShipType_AR: {
        title: 'نوع الملكية',
        filter: false,
      },
      rentalStatus_AR: {
        title: 'حالة الإيجار',
        filter: false,
      },
      area: {
        title: 'المساحة',
        filter: false,
      }
    },
  };
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
  onClear() {
    this.source.setFilter([]);
    this.selectedGov = -1;
    this.selectedOwnerShipType = -1;
    this.selectedRentalStatus = -1;
    this.selectedPhysicalStatus = -1;
    this.initiallizeChart();
  }
  async onApply() {
    if (this.selectedGov != -1) {
    } else {
      this.setFilter(this.source);
      this.barData.datasets = [];
      this.pieData.datasets = [];

      if (this.selectedPhysicalStatus != -1) {
        this.barData.datasets.push(await this.getPhysicalStatusGovsCount());
      } if (this.selectedOwnerShipType != -1) {
        this.barData.datasets.push(await this.getOwnerShipTypeGovsCount());
      } if (this.selectedRentalStatus != -1) {
        this.barData.datasets.push(await this.getRentalStatusGovsCount());
      }
      this.pieData.datasets.push({
        data: await this.getFilteredGovsArea(),
        backgroundColor: this.getRandomColorArray(this.lookupValues[0].length),
      })
      this.getAverageChartData();
      this.barChart.chart.update();
      this.pieChart.chart.update();

    }

  }


}
