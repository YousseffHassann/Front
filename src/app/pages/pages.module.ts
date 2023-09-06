import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { TranslateModule } from '@ngx-translate/core';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LanesPopUpComponent } from './PMMSComponents/upload-file/lanes-pop-up/lanes-pop-up.component';
//import { PciCalcComponent } from './PMMSComponents/pci-calc/pci-calc.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule, TranslateModule,
    DashboardModule,
    ECommerceModule,
    NgxChartsModule,
    MiscellaneousModule,

  ],
  declarations: [
    PagesComponent,
    LanesPopUpComponent,

    //PciCalcComponent,
  ],
})
export class PagesModule {
}
