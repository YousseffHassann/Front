import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartComponent } from 'angular2-chartjs';
import { AssetsChartsService } from '../assets-charts.service';


@Component({
  selector: 'ngx-area-piechart',
  template: ` <chart #areaPieChart type="pie" [data]="data" [options]="options"style="height: 500px;"></chart>`,
  styleUrls: ['./area-piechart.component.scss']
})
export class AreaPiechartComponent implements OnInit, OnDestroy, OnChanges {
  data: any;
  apiLabels = [];
  apiValues = [];
  colors = [];
  options: any;
  themeSubscription: any;
  @Input() resData;
  @ViewChild("areaPieChart") areaPieChart: ChartComponent;
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
      this.data = {
        labels: this.apiLabels,
        datasets: [{
          data: this.apiValues,
          backgroundColor: this.colors,
        }],
      };
      this.options = {
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
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.resData.currentValue);
    if (changes?.resData?.currentValue == null) return;
    for (const key in this.resData) {
      this.apiLabels.push(this.resData[key]["Name"]);
      this.apiValues.push(this.resData[key]["Area"]);
      this.colors.push(this.getRandomColor());
    }
    this.areaPieChart?.chart?.update();



  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  ngOnInit(): void {

  }

}

