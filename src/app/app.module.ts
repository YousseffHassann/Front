/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ngx-alerts';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { TranslateModule, TranslateLoader, } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './pages/PMMSComponents/upload-file/upload-file.component';


//import { SpinnersAngularModule } from 'spinners-angular';
import {
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbOptionModule,
  NbRadioModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,

  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateRoleComponent } from './pages/AdminComponents/update-role/update-role.component';
import { AddUserComponent } from './pages/AdminComponents/add-user/add-user.component';
import { SecRolesComponent } from './pages/AdminComponents/sec-roles/sec-roles.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UpdatingUserComponent } from './pages/AdminComponents/updating-user/updating-user.component';
import { HttpClient } from '@angular/common/http';
// import { TranslationModule } from './translation/translation.module';
// import { NgxLanguageSelectorModule } from 'ngx-language-selector';

import { DistressSurveyComponent } from './pages/PMMSComponents/distress-survey/distress-survey.component';
import { IntersectiondistressComponent } from './pages/PMMSComponents/intersectiondistress/intersectiondistress.component';
import { SectionUpdateComponent } from './pages/PMMSComponents/section-update/section-update.component';
//import { Ng2SmartTableModule } from '../../node_modules1/ng2-smart-table/public-api';
import { RegionDistressComponent } from './pages/PMMSComponents/region-distress/region-distress.component'
import { IntersectionUpdateComponent } from './pages/PMMSComponents/intersection-update/intersection-update.component';
import { RegionUpdateComponent } from './pages/PMMSComponents/region-update/region-update.component';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { UpdateRgionSectionComponent } from './pages/AdminComponents/update-rgion-section/update-rgion-section.component';
import { SwalkComponent } from './pages/PMMSComponents/swalk/swalk.component';
import { SurveyComponent } from './pages/AdminComponents/survey/survey.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'axiros-datetime-picker';
import { SmartTableDatepickerComponent } from './pages/PMMSComponents/smart-table-datepicker/smart-table-datepicker.component';
import { PCICALCComponent } from './pages/PMMSComponents/pci-calc/pci-calc.component';
import { PciIntersectionsComponent } from './pages/AssetsMangement/Reports/pci-intersections/pci-intersections.component';
import { MDReportsComponent } from './pages/AssetsMangement/Reports/md-reports/md-reports.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ChartCost3Component } from './pages/PMMSComponents/chart-cost3/chart-cost3.component';
import { AgmCoreModule } from '@agm/core';  //mapahmed
import { MaintenanceReportsComponent } from './pages/AssetsMangement/Reports/IRI-reports/IRI-reports.component';
// import { createTranslationLoader } from '../../node_modules1/@angular-devkit/build-angular/src/utils/load-translations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { WorkOrdersComponent } from './pages/PMMSComponents/work-orders/work-orders.component';
import { InconsistentSectionsComponent } from './pages/PMMSComponents/upload-file/inconsistent-sections/inconsistent-sections.component';
import { SummaryDashboarComponent } from './pages/PMMSComponents/summary-dashboar/summary-dashboar.component';
import { PRIOLANES2Component } from './pages/AssetsMangement/Reports/prio-lanes2/prio-lanes2.component';
import { AhmedInterceptorInterceptor } from './pages/Services/Auth-interceptor.interceptor';
import { StructureComponent } from './pages/PMMSComponents/structure/structure.component';
import { MapStaticComponent } from './pages/PMMSComponents/map-static/map-static.component';
import { UnFinishedLanesPopupComponent } from './pages/PMMSComponents/pci-calc/un-finished-lanes-popup/un-finished-lanes-popup.component';
import { MDStreetsComponent } from './pages/AssetsMangement/Reports/md-streets/md-streets.component';
import { RefreshComponent } from './pages/PMMSComponents/refresh/refresh.component';
import { BudgetLanesComponent } from './pages/PMMSComponents/budget-lanes/budget-lanes.component';
import { AllReportsComponent } from './pages/AssetsMangement/Reports/all-reports/all-reports.component';
import { UncalculatedSectionsComponent } from './pages/PMMSComponents/uncalculated-sections/uncalculated-sections.component';

@NgModule({
  declarations: [AppComponent, SecRolesComponent, AddUserComponent, UpdateRoleComponent,
     UpdatingUserComponent, DistressSurveyComponent, IntersectiondistressComponent,
    RegionDistressComponent, SectionUpdateComponent, IntersectionUpdateComponent,
    RegionUpdateComponent, UploadFileComponent, UpdateRgionSectionComponent, SwalkComponent,
    SurveyComponent, SmartTableDatepickerComponent, PCICALCComponent, MDReportsComponent,
    PciIntersectionsComponent,
    ChartCost3Component,MaintenanceReportsComponent,WorkOrdersComponent,InconsistentSectionsComponent,SummaryDashboarComponent,PRIOLANES2Component, StructureComponent, MapStaticComponent,
    UnFinishedLanesPopupComponent,
    MDStreetsComponent,
    RefreshComponent,BudgetLanesComponent,AllReportsComponent,UncalculatedSectionsComponent
  ], //updated



  providers:
  [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AhmedInterceptorInterceptor,
      multi: true,
    },

  ],

  imports: [

    BrowserModule,  // add TranslationModule to imports
    // NgxLanguageSelectorModule,


    AgmCoreModule.forRoot({   //mapahmed
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE'
    }),


    HttpClientModule,
    TranslateModule.forRoot({
defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule, ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    AppRoutingModule,
    NbRadioModule,
    NbOptionModule,
    NbCardModule,
    NbTabsetModule,
    MatDialogModule,

MatButtonModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,


    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    NgMultiSelectDropDownModule.forRoot(),//updated
    NbSidebarModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
    NbMenuModule.forRoot(), NbThemeModule, NbMenuModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    // SpinnersAngularModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' })


  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

// export function  HttpLoaderFactory(http:HttpClient){
//   return new TranslateHttpLoader(http,'./assets/i18n','.json')
// }

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
// export function httpTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json')
// }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
