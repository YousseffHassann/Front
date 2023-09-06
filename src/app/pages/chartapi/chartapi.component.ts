import { Component, OnInit, Input } from '@angular/core';
import { SideWalkChartService } from '../Services/ChartsServices/side-walk-chart.service'
import { BarChartModule } from '@swimlane/ngx-charts'
@Component({
  selector: 'ngx-chartapi',
  templateUrl: './chartapi.component.html',
  styleUrls: ['./chartapi.component.scss']
})
export class ChartapiComponent implements OnInit {
  @Input() results: any;
  constructor(private sideWalkChartService: SideWalkChartService, private BarChartModule: BarChartModule) { }

  ngOnInit(): void {
   /* this.sideWalkChartService.GetSideW3alkInfoChart(202).subscribe(data => {
      this.results = data.map(item => {
        return { name: item.name, value: item.value }
      });
    });*/   //Updated One Ahmed

  }

}
