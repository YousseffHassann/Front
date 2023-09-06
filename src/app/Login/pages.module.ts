import { NgModule } from '@angular/core';
import { NbIconModule ,NbMenuModule,NbLayoutModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './userscomponent';
import { Users1Component } from '../pages/PMMSComponents/users1/users1.component';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
    NbThemeModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from '../pages/layout/layout-routing.module';

@NgModule({
  imports: [
    NbThemeModule.forRoot({ name: 'custom-dark' }),
    NbLayoutModule,
    NbButtonModule, TranslateModule.forChild({
      extend:true
    }),
    NbSelectModule,

    PagesRoutingModule, NbIconModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule, NbSpinnerModule,
    LayoutRoutingModule,
    NbLayoutModule,
  ],
  declarations: [
    PagesComponent,
    Users1Component,
  ],
})
export class PagesModule {
}
