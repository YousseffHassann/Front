import { PmmsService } from "./pmms.service";
import { DataService } from "./data.service";
import { NgModule } from "@angular/core";
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbRadioModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { loadModules } from "esri-loader";
import esri = __esri;
import { ThemeModule } from "../../../../@theme/theme.module";
import { PmmsComponent } from "./pmms.component";
import { ChartModule } from "angular2-chartjs";
import { TitleComponent } from "./mainstreetcalculation/title/title.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalculateMainStreetSectionsPCIComponent } from "./CalculateMainStreetSectionsPCI/calculate-main-street-sections-pci/calculate-main-street-sections-pci.component";
import { DataresultComponent } from "./dataresult/dataresult.component";
import { IntersectionstreetComponent } from "./intersectionstreet/intersectionstreet.component";
import { EsriMapComponent } from "../../map1/esri-map/esri-map.component";
import { EsriMapPMMSComponent } from "../map/esri-map/esri-mapPMMS.component";
@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    FormsModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    EsriMapComponent,
    NbRadioModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PmmsComponent,
    EsriMapComponent,
    TitleComponent,
    //CalculateMainStreetSectionsPCIComponent,
    DataresultComponent,
    IntersectionstreetComponent,
    EsriMapPMMSComponent,
  ],
  providers: [PmmsService, DataService],
})
export class PmmsModule {}
