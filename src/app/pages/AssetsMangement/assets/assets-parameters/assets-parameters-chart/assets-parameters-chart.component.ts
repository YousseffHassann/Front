import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { ChartComponent } from 'angular2-chartjs';
import { AssetsServices } from '../../assets.service';


@Component({
  selector: 'ngx-assets-parameters-chart',
  template: `
   <nb-card  nbSpinnerSize="large" nbSpinnerStatus="primary" [nbSpinner]="isLoading">
     <nb-card-header>مؤشر الاستثمار</nb-card-header>
     <nb-card-body>
       <chart #paramsChart  type="bar" [data]="data" [options]="options" style="height: 500px;"></chart> 
      </nb-card-body>
</nb-card>
  `,
  styleUrls: ['./assets-parameters-chart.component.scss']
})
export class AssetsparametersChartComponent implements OnInit, OnChanges {
  data: any;
  options: any;
  themeSubscription: any;
  colors:any;
  values = [[], [], []];
  @Input() resData;
  @Input() isLoading;
  @ViewChild("paramsChart") paramsChart: ChartComponent;

  constructor(private assetsServices: AssetsServices, private theme: NbThemeService) {
    this.data = {
      labels: [],
      datasets: [],
    };

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
       this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
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
  getRandomColor() {
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
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data.labels = [];
    this.data.datasets = [];
    this.values[0] = [];
    this.values[1] = [];
    this.values[2] = [];

    this.paramsChart?.chart?.update();
    if (changes?.resData?.currentValue == null) return;

    for (const key in this.resData) {
      if (String(key) != "Avg") {
        this.data.labels.push(String(key));
      }
      this.values[0].push(this.resData[key].Max);
      this.values[1].push(this.resData[key].Min);
      this.values[2].push(this.resData[key].Avg);
    }

    this.data.datasets.push({
      data: this.values[0],
      label: "Max",
      backgroundColor: 'rgba(255, 99, 132, 1)',
    
    });
    this.data.datasets.push({
      data: this.values[1],
      label: "Min",
      backgroundColor: 'rgba(54, 162, 235, 1)',
    });
    this.data.datasets.push({
      data: this.values[2],
      label: "Avg", 
      backgroundColor: 'rgba(255, 206, 86, 1)',
    });

    this.paramsChart.chart.update();



  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
