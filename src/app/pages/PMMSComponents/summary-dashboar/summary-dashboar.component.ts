import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ngx-summary-dashboar',
  templateUrl: './summary-dashboar.component.html',
  styleUrls: ['./summary-dashboar.component.scss']
})
export class SummaryDashboarComponent implements OnInit {

  aa = 'https://namaa-sa.maps.arcgis.com/apps/dashboards/eacfd53a8019452ab0288aa2f24d766a';
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }
}
