/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { UserServices } from './pages/AssetsMangement/user/user.service';
import { TranslateService } from '@ngx-translate/core';
// import { AssetsSettingsService } from "./pages/AssetsMangement/assets-settings.service"

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
lang:any
  constructor(public translate: TranslateService, private analytics: AnalyticsService, private seoService: SeoService, private userServices: UserServices) {
  this.lang=localStorage.getItem('lang')
  
    translate.use(this.lang);

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.userServices.autoLogin();
  }
}
