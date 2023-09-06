import { PmmsMdService } from "./pmmsMd.service";
import { DataMdService } from "./dataMd.service";

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
import { PmmsMdComponent } from "./pmmsMd.component";

import { ChartModule } from "angular2-chartjs";

import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalculateMainStreetSectionsMdComponent } from "./CalculateMainStreetSectionsMd/calculate-main-street-sections-MK/calculate-main-street-sections-Md.component";
import { DataresultMdComponent } from "./dataresultMd/dataresultMd.component";
import { TitleMdComponent } from "./mainstreetcalculation/title/title.component";

import { IntersectionstreetMdComponent } from "./intersectionstreetMd/intersectionstreetMd.component";
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
    PmmsMdComponent,
    EsriMapComponent,
    EsriMapPMMSComponent,
    CalculateMainStreetSectionsMdComponent,
    DataresultMdComponent,
    TitleMdComponent,
    IntersectionstreetMdComponent,
  ],
  providers: [PmmsMdService, DataMdService],
})
export class PmmsMdModule {}
