import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'ngx-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  aa = 'https://www.arcgis.com/apps/dashboards/e6c86e2a2efe4f409f6305625128fdaa';
  safeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, ) { }

  ngOnInit(): void {

    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.aa);
  }

}
