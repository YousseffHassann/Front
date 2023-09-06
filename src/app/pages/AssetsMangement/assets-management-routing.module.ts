import { PmmsMdComponent } from "./PMMS/MD/pmmsMd.component";
import { PmmsComponent } from "./PMMS/PCI/pmms.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdvancedChartsComponent } from "./advanced-charts/advanced-charts.component";
import { AssetsChartsComponent } from "./assets-charts/assets-charts.component";
import { AssetsManagementComponent } from "./assets-management.component";
import { AssetsComponent } from "./assets/assets.component";
import { DataAnalysisComponent } from "./PMMS/Data-analysis/data-analysis.component";

import { AuthGard } from "./user/auth.guard";

import { CreateAccountComponent } from "./user/create-account/create-account.component";
import { LoginComponent } from "./user/login/login.component";
import { ManageAccountsComponent } from "./user/manage-accounts/manage-accounts.component";

import { Map1Component } from "./map1/map1.component";
import { MappingComponent } from "./mapping/mapping.component";
import { DataAnalysis2Component } from "./PMMS/Data-analysis2/data-analysis2.component";
import { EquipmentEightComponent } from "./PMMS/DA/equipment-eight/equipment-eight.component";
import { EquipmentoneComponent } from "./PMMS/DA/equipmentone/equipmentone.component";
import { EquipmenTwoComponent } from "./PMMS/DA/equipmen-two/equipmen-two.component";
import { LaneSectionsErorrsComponent } from "./PMMS/DA/lane-sections-erorrs/lane-sections-erorrs.component";
import { EquipmentLenthComponent } from "./PMMS/DA/equipment-lenth/equipment-lenth.component";
import { RoadsUdiComponent } from "./PMMS/DA/roads-udi/roads-udi.component";
import { DeletedSamplesComponent } from "./PMMS/DA/deleted-samples/deleted-samples.component";
import { EquipmentSectionsDetailsComponent } from "./PMMS/DA/equipment-sections-details/equipment-sections-details.component";
import { EquipmentFourteenComponent } from "./PMMS/DA/equipment-fourteen/equipment-fourteen.component";
import { EquipmentValidateIRIComponent } from "./PMMS/DA/equipment-validate-iri/equipment-validate-iri.component";
import { EquipmentValidateFWDComponent } from "./PMMS/DA/equipment-validate-fwd/equipment-validate-fwd.component";
import { EquipmentValidateGPRComponent } from "./PMMS/DA/equipment-validate-gpr/equipment-validate-gpr.component";
import { EquipmentValidateSKIDComponent } from "./PMMS/DA/equipment-validate-skid/equipment-validate-skid.component";
import { GenralSettingsComponent } from "./Settings/genral-settings/genral-settings.component";
import { MAINT_DECIDING } from "./Settings/maint-deciding-settings/MAINT_DECIDING.model";
import { MAINTDECIDINGSettingsComponent } from "./Settings/maint-deciding-settings/maint-deciding-settings.component";
import { MAINTDECIDING2SWALKSettingsComponent } from "./Settings/maint-deciding2-swalk-settings/maint-deciding2-swalk-settings.component";
import { BudgetPlanningComponent } from "./Budget_PLanning/budget-planning/budget-planning.component";
import { ContractorsListComponent } from "./Contractors/contractors-list/contractors-list.component";
import { WelcomeScreenComponent } from "./welcome-screen/welcome-screen.component";
import { PCIInterSectionsComponent } from "./Reports/pci-inter-sections/pci-inter-sections.component";
import { MDReportsComponent } from "./Reports/md-reports/md-reports.component";
import { DistressSurveyComponent } from "../PMMSComponents/distress-survey/distress-survey.component";
import { MapStaticComponent } from "../PMMSComponents/map-static/map-static.component";

const routes: Routes = [
  {
    path: "",
    component: AssetsManagementComponent,

    children: [
      {
        path: "user/createAccount",
         canActivate: [AuthGard],
        component: CreateAccountComponent,
      },
      {
        path: "user/ManageAccounts",
          canActivate: [AuthGard],
        component: ManageAccountsComponent,
      },
      {
        path: "user/login",

        component: LoginComponent,
      },
      {
        path: "assets",
          canActivate: [AuthGard],
        component: AssetsComponent,
      },

      {
        path: "PMMS",
        canActivate: [AuthGard],
        component: PmmsComponent,
      },
      {
        path: "PMMSMD",
        canActivate: [AuthGard],
        component: PmmsMdComponent,
      },
      {
        path: "equipmentone",
        canActivate: [AuthGard],
        // component: DataAnalysisComponent,
        component: EquipmentoneComponent,
      }
      , {
        path: "EquipmentTwo",
        canActivate: [AuthGard],
        component: EquipmenTwoComponent,
      },
      {
        path: "LaneSectionsErorrs",
        canActivate: [AuthGard],
        component: LaneSectionsErorrsComponent,
      },
      {
        path: "EquipmentLenth",
        canActivate: [AuthGard],
        component: EquipmentLenthComponent,
      },
      {
        path: "RoadesUdi",
        canActivate: [AuthGard],
        component: RoadsUdiComponent,
      },
      {
        path: "DeletedSamples",
        canActivate: [AuthGard],
        component: DeletedSamplesComponent,
      },
      {
        path: "EquipmentSectionsDetails",
        canActivate: [AuthGard],
        component: EquipmentSectionsDetailsComponent,
      },
      {
        path: "EquipmentEight",
        canActivate: [AuthGard],
        component: EquipmentEightComponent,
      },
      {
        path: "equipment-fourteen",
        canActivate: [AuthGard],
        component: EquipmentFourteenComponent,
      },
      {
        path: "equipment-validate-iri",
        canActivate: [AuthGard],
        component: EquipmentValidateIRIComponent,
      }
      ,
      {
        path: "equipment-validate-fwd",
        canActivate: [AuthGard],
        component: EquipmentValidateFWDComponent,
      },

      {
        path: "equipment-validate-gpr",
         canActivate: [AuthGard],
        component: EquipmentValidateGPRComponent,
      }
      ,

      {
        path: "equipment-validate-skid",
         canActivate: [AuthGard],
        component: EquipmentValidateSKIDComponent,
      },
      {
        path: "generalsettings",
         canActivate: [AuthGard],
        component: GenralSettingsComponent,
      },





      {
        path: "Welcome",
         canActivate: [AuthGard],
        component: WelcomeScreenComponent,
      },
      {
        path: "PCI_InterSections",
        canActivate: [AuthGard],
        component: PCIInterSectionsComponent,
      },
       {
         path: "md_reports",
        canActivate: [AuthGard],
        component: MDReportsComponent,
      },
      {
        path: "maintdeciding",
        canActivate: [AuthGard],
        component: MAINTDECIDINGSettingsComponent,
      }, {
        path: "maintdeciding2swalk",
        canActivate: [AuthGard],
        component: MAINTDECIDING2SWALKSettingsComponent,
      },
      {
        path: "PLanning",
        canActivate: [AuthGard],
        component: BudgetPlanningComponent,
      },
      {
        path: "assets-charts",
        canActivate: [AuthGard],
        component: AssetsChartsComponent,
      },
      {
        path: "advanced-charts",
        canActivate: [AuthGard],
        component: AdvancedChartsComponent,
      },

//14-5


// {
//   path:'DistressSurvey',
//   canActivate: [AuthGard],
//   component: DistressSurveyComponent,
// },



      {
        path: "Contractor",
        component: ContractorsListComponent,
      },
 
      {
        path: "map1",

        component: Map1Component,
      },
      {
        path: "mapping",

        component: MappingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetsManagementRoutingModule { }
