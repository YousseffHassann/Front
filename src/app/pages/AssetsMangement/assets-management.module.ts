import { DataService } from "./PMMS/PCI/data.service";
import { TitleComponent } from "../AssetsMangement/PMMS/PCI/mainstreetcalculation/title/title.component";
import { TitleMdComponent } from "../AssetsMangement/PMMS/MD/mainstreetcalculation/title/title.component";
import { IntersectionstreetMdComponent } from "../AssetsMangement/PMMS/MD/intersectionstreetMd/intersectionstreetMd.component";

import { PmmsComponent } from "./PMMS/PCI/pmms.component";
import { PmmsMdComponent } from "./PMMS/MD/pmmsMd.component";
import { DataMdService } from "./PMMS/MD/dataMd.service";
import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { AssetsManagementRoutingModule } from "./assets-management-routing.module";
import { AssetsManagementComponent } from "./assets-management.component";

import {
  FormsModule,
  FormsModule as ngFormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserComponent } from "./user/user.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CreateAccountComponent } from "./user/create-account/create-account.component";
import { ManageAccountsComponent } from "./user/manage-accounts/manage-accounts.component";
import { LoginComponent } from "./user/login/login.component";
import { AssetsComponent } from "./assets/assets.component";
import { AddAssetParamsButtonComponent } from "./assets/add-asset-params-button/add-asset-params-button.component";
import { AssetsChartsComponent } from "./assets-charts/assets-charts.component";
import { AreaPiechartComponent } from "./assets-charts/area-piechart/area-piechart.component";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { EditAssetButtonComponent } from "./assets/edit-asset-button/edit-asset-button.component";
import { AdvancedChartsComponent } from "./advanced-charts/advanced-charts.component";
import { ChartModule } from "angular2-chartjs";
import { DialogueComponent } from "./dialogue/dialogue.component";
import { AssetsparametersChartComponent } from "./assets/assets-parameters/assets-parameters-chart/assets-parameters-chart.component";
import { AssetsParametersComponent } from "./assets/assets-parameters/assets-parameters.component";
import { AssetsCountBarComponent } from "./assets-charts/assets-count-bar/assets-count-bar.component";
import { AssetsAvgBarComponent } from "./assets-charts/assets-avg-bar/assets-avg-bar.component";
import { TranslateModule } from '@ngx-translate/core';

import { Map1Component } from "./map1/map1.component";
import { MappingFilterComponent } from "./map1/mapping-filter/mapping-filter.component";
import { MappingComponent } from "./mapping/mapping.component";
import { FilterComponent } from "./mapping/filter/filter.component";
import { CalculateMainStreetSectionsPCIComponent } from "./PMMS/PCI/CalculateMainStreetSectionsPCI/calculate-main-street-sections-pci/calculate-main-street-sections-pci.component";
import { DataresultComponent } from "./PMMS/PCI/dataresult/dataresult.component";
import { IntersectionstreetComponent } from "./PMMS/PCI/intersectionstreet/intersectionstreet.component";
import { EsriMapComponent } from "./map1/esri-map/esri-map.component";
import { EsriMapPMMSComponent } from "./PMMS/map/esri-map/esri-mapPMMS.component";

import { CalculateMainStreetSectionsMdComponent } from "./PMMS/MD/CalculateMainStreetSectionsMd/calculate-main-street-sections-MK/calculate-main-street-sections-Md.component";
import { DataresultMdComponent } from "./PMMS/MD/dataresultMd/dataresultMd.component";

import { DataAnalysisComponent } from "./PMMS/Data-analysis/data-analysis.component";
import { DataAnalysisFilterComponent } from "./PMMS/Data-analysis/data-analysis-filter/data-analysis-filter.component";
import { DataAnalysisResultaComponent } from "./PMMS/Data-analysis/data-analysis-resulta/data-analysis-resulta.component";
import { DataAnalysis2Component } from "./PMMS/Data-analysis2/data-analysis2.component";
import { DataAnalysisFilter2Component } from "./PMMS/Data-analysis2/data-analysis-filter2/data-analysis-filter2.component";
import { DataAnalysisResult2Component } from "./PMMS/Data-analysis2/data-analysis-result2/data-analysis-result2.component";
import { EquipmentEightComponent } from './PMMS/DA/equipment-eight/equipment-eight.component';
import { EquipmentEightfilterComponent } from './PMMS/DA/equipment-eight/equipment-eightfilter/equipment-eightfilter.component';
import { EquipmentoneComponent } from './PMMS/DA/equipmentone/equipmentone.component';
import { EquipmentoneFilterComponent } from './PMMS/DA/equipmentone/equipmentone-filter/equipmentone-filter.component';
import { EquipmenTwoComponent } from './PMMS/DA/equipmen-two/equipmen-two.component';
import { EquipmenTwoFilterComponent } from './PMMS/DA/equipmen-two/equipmen-two-filter/equipmen-two-filter.component';
import { LaneSectionsErorrsComponent } from './PMMS/DA/lane-sections-erorrs/lane-sections-erorrs.component';
import { LaneSectionErorrsFilterComponent } from './PMMS/DA/lane-sections-erorrs/lane-section-erorrs-filter/lane-section-erorrs-filter.component';
import { EquipmentLenthComponent } from './PMMS/DA/equipment-lenth/equipment-lenth.component';
import { RoadsUdiComponent } from './PMMS/DA/roads-udi/roads-udi.component';
import { DeletedSamplesComponent } from './PMMS/DA/deleted-samples/deleted-samples.component';
import { EquipmentSectionsDetailsComponent } from './PMMS/DA/equipment-sections-details/equipment-sections-details.component';
import { EquipmentFourteenComponent } from './PMMS/DA/equipment-fourteen/equipment-fourteen.component';
import { EquipmentFourtenFilterComponent } from './PMMS/DA/equipment-fourteen/equipment-fourten-filter/equipment-fourten-filter.component';
import { EquipmentValidateIRIComponent } from './PMMS/DA/equipment-validate-iri/equipment-validate-iri.component';
import { EquipmentValidateGPRComponent } from './PMMS/DA/equipment-validate-gpr/equipment-validate-gpr.component';
import { EquipmentValidateSKIDComponent } from './PMMS/DA/equipment-validate-skid/equipment-validate-skid.component';
import { EquipmentValidateFWDComponent } from './PMMS/DA/equipment-validate-fwd/equipment-validate-fwd.component';
import { GenralSettingsComponent } from './Settings/genral-settings/genral-settings.component';
import { UpdateSettingsComponent } from './Settings/update-settings/update-settings.component';
//import {EquipmentEightfilterComponent} from "./PMMS/equipment-eight/equipment-eightfilter/equipment-eightfilter.component";
import { AlertModule } from 'ngx-alerts';

import { MAINTDECIDINGSettingsComponent } from './Settings/maint-deciding-settings/maint-deciding-settings.component';
import { MAINTDECIDING2SWALKSettingsComponent } from './Settings/maint-deciding2-swalk-settings/maint-deciding2-swalk-settings.component';
import { BudgetPlanningComponent } from './Budget_PLanning/budget-planning/budget-planning.component';
import { ContractorsListComponent } from './Contractors/contractors-list/contractors-list.component';
import { InsertModelComponent } from './Contractors/insert-model/insert-model.component';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { PCIInterSectionsComponent } from './Reports/pci-inter-sections/pci-inter-sections.component';
import { ChtestComponent } from '../PMMSComponents/chtest/chtest.component';
import { Chtest2Component } from '../PMMSComponents/chtest2/chtest2.component';
import { MDReportsComponent } from './Reports/md-reports/md-reports.component';
import { GenralSetting1Component } from './Settings/genral-setting1/genral-setting1.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
//import { SpinnersAngularModule } from 'spinners-angular';
//import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { LanguageSelectorComponent } from '../../language-selector/language-selector.component'; // import TranslationModule

@NgModule({
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ThemeModule, TranslateModule,
    FormsModule, ReactiveFormsModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    AssetsManagementRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),

    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    // SpinnersAngularModule,
    NbListModule,
    NbTreeGridModule,
    NbAutocompleteModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    // BrowserAnimationsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right' }),

  ], 
  declarations: [
    AssetsManagementComponent,
    //  LanguageSelectorComponent,
    UserComponent,
    CreateAccountComponent,
    ManageAccountsComponent,
    LoginComponent,
    EsriMapPMMSComponent,
    AssetsComponent,
    AddAssetParamsButtonComponent,
    AssetsChartsComponent,
    AreaPiechartComponent,
    EditAssetButtonComponent,
    AssetsCountBarComponent,
    AdvancedChartsComponent,
    DialogueComponent,
    AssetsManagementComponent,
    AssetsParametersComponent,
    AssetsparametersChartComponent,
    AssetsAvgBarComponent,
    CalculateMainStreetSectionsPCIComponent,
    CalculateMainStreetSectionsMdComponent,
    DataresultComponent,
    DataresultMdComponent,
    PmmsComponent,
    PmmsMdComponent,
    IntersectionstreetComponent,
    Map1Component,
    EsriMapComponent,
    MappingFilterComponent,
    MappingComponent,
    FilterComponent,
    TitleComponent,
    TitleMdComponent,
    IntersectionstreetMdComponent,
    DataAnalysisComponent,
    DataAnalysisFilterComponent,
    DataAnalysisResultaComponent,
    DataAnalysis2Component,
    DataAnalysisFilter2Component,
    DataAnalysisResult2Component,
    EquipmentEightComponent,
    EquipmentEightfilterComponent,
    EquipmentoneComponent,
    EquipmentoneFilterComponent,
    EquipmenTwoComponent,
    EquipmenTwoFilterComponent,
    LaneSectionsErorrsComponent,
    LaneSectionErorrsFilterComponent,
    EquipmentLenthComponent,
    RoadsUdiComponent,
    DeletedSamplesComponent,
    EquipmentSectionsDetailsComponent,
    EquipmentFourteenComponent,

    EquipmentFourtenFilterComponent,
    EquipmentValidateIRIComponent,
    EquipmentValidateGPRComponent,
    EquipmentValidateSKIDComponent,
    EquipmentValidateFWDComponent,
    GenralSettingsComponent,
    UpdateSettingsComponent,
    MAINTDECIDINGSettingsComponent,
    MAINTDECIDING2SWALKSettingsComponent,
    BudgetPlanningComponent,
    ContractorsListComponent,
    InsertModelComponent,
    WelcomeScreenComponent,
    PCIInterSectionsComponent,
    ChtestComponent,
    Chtest2Component,
    //MDReportsComponent,
    GenralSetting1Component,
    // EquipmentEightfilterComponent,
    //  EquipmentEightComponent,
    //   EquipmentEightfilterComponent,
  ],
})
export class AssetsManagementModule { }
