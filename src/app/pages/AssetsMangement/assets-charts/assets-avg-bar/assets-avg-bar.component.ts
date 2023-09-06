import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartComponent } from 'angular2-chartjs';
import { AssetsChartsService } from '../assets-charts.service';

@Component({
  selector: 'ngx-assets-avg-bar',
  template: `
    <chart #averageBarChart type="bar" [data]="data" [options]="options" style="height: 500px;"></chart>
  `,
  styleUrls: ['./assets-avg-bar.component.scss']
})
export class AssetsAvgBarComponent implements OnInit, OnChanges, OnDestroy {
  data: any;
  apiLabels = [];
  apiValues = [];
  colors = [];
  options: any;
  themeSubscription: any;
  @Input() resData;
  @ViewChild("averageBarChart") averageBarChart: ChartComponent;
  constructor(private assetsChartsService: AssetsChartsService, private theme: NbThemeService) {
    this.data = {
      labels: this.apiLabels,
      datasets: [{
        data: this.apiValues,
        backgroundColor: this.colors,
      }],
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const chartjs: any = config.variables.chartjs;
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
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
                beginAtZero: true,
              },
            },
          ],
        },
      };
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("current value", changes.resData.currentValue);
    if (changes?.resData?.currentValue == null) return;
   
    this.apiLabels = [];
    this.apiValues = [];
    this.colors = [];
    this.averageBarChart?.chart?.update();
    for (const key in this.resData) {
      this.apiLabels.push(this.resData[key]["Name"]);
      this.apiValues.push(this.resData[key]["Avg"]);
      this.colors.push(this.getRandomColor());
    }
    this.data = {
      labels: this.apiLabels,
      datasets: [{
        data: this.apiValues,
        backgroundColor: this.colors,
      }],
    };
    this.averageBarChart?.chart?.update();
  }

}
