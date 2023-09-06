import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ChartComponent } from 'angular2-chartjs';
import { AssetsChartsService } from '../assets-charts.service';

@Component({
  selector: 'ngx-assets-count-bar',
  templateUrl: './assets-count-bar.component.html'
})
export class AssetsCountBarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data: any;
  @Input() displayLegend: boolean;
  @Output() onPressed = new EventEmitter<number>();
  options: any;
  themeSubscription: any;
  selectedGroup: any;
  chartjs;
  @ViewChild("countBarChart") countBarChart: ChartComponent;

  constructor(private assetsChartsService: AssetsChartsService, private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.chartjs = config.variables.chartjs;
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: this.displayLegend,
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.data.currentValue);
    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: this.displayLegend,
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
    this.countBarChart.chart.update();
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  onSelected() {
    console.log(this.selectedGroup);
    this.onPressed.emit(this.selectedGroup);
  }
}
