import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { PrintComponent } from './print.component';
import { ThemeModule } from '../@theme/theme.module';
import { PagesRoutingModule } from '../pages/pages-routing.module';
import { NbMenuModule } from '@nebular/theme';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { ECommerceModule } from '../pages/e-commerce/e-commerce.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';


@NgModule({
  declarations: [
    PrintComponent
  ],
  imports: [
    CommonModule,
    PrintRoutingModule,
    ThemeModule, 
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ]
})
export class PrintModule { }
