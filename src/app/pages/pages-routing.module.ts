import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGard } from './AssetsMangement/user/auth.guard';
import { LoginComponent } from './AssetsMangement/user/login/login.component';
import { UpdatingUserComponent } from './AdminComponents/updating-user/updating-user.component';
import { UpdateRoleComponent } from './AdminComponents/update-role/update-role.component';
import { SecRolesComponent } from './AdminComponents/sec-roles/sec-roles.component';
import { AddUserComponent } from './AdminComponents/add-user/add-user.component';
import { Users1Component } from './PMMSComponents/users1/users1.component';
import { ChtestComponent } from './PMMSComponents/chtest/chtest.component';
import { Chtest2Component } from './PMMSComponents/chtest2/chtest2.component';
import { IntersectiondistressComponent } from './PMMSComponents/intersectiondistress/intersectiondistress.component';
import { DistressSurveyComponent } from './PMMSComponents/distress-survey/distress-survey.component';
import { RegionDistressComponent } from './PMMSComponents/region-distress/region-distress.component';
import { SectionUpdateComponent } from './PMMSComponents/section-update/section-update.component';
import { IntersectionUpdateComponent } from './PMMSComponents/intersection-update/intersection-update.component';
import { RegionUpdateComponent } from './PMMSComponents/region-update/region-update.component';
import { UploadFileComponent } from './PMMSComponents/upload-file/upload-file.component';
import { UpdateRgionSectionComponent } from './AdminComponents/update-rgion-section/update-rgion-section.component';
import { SwalkComponent } from './PMMSComponents/swalk/swalk.component';
import { SurveyComponent } from './AdminComponents/survey/survey.component';
import { PCICALCComponent } from './PMMSComponents/pci-calc/pci-calc.component';
import { PciIntersectionsComponent } from './AssetsMangement/Reports/pci-intersections/pci-intersections.component';
import { ChartCost3Component } from './PMMSComponents/chart-cost3/chart-cost3.component';
import { MaintenanceReportsComponent } from './AssetsMangement/Reports/IRI-reports/IRI-reports.component';
import { WorkOrdersComponent } from './PMMSComponents/work-orders/work-orders.component';
import { SummaryDashboarComponent } from './PMMSComponents/summary-dashboar/summary-dashboar.component';
import { PRIOLANES2Component } from './AssetsMangement/Reports/prio-lanes2/prio-lanes2.component';
import { StructureComponent } from './PMMSComponents/structure/structure.component';
import { MapStaticComponent } from './PMMSComponents/map-static/map-static.component';
import { MDStreetsComponent } from './AssetsMangement/Reports/md-streets/md-streets.component';
import { RefreshComponent } from './PMMSComponents/refresh/refresh.component';
import { BudgetLanesComponent } from './PMMSComponents/budget-lanes/budget-lanes.component';
import { AllReportsComponent } from './AssetsMangement/Reports/all-reports/all-reports.component';
import { UncalculatedSectionsComponent } from './PMMSComponents/uncalculated-sections/uncalculated-sections.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',

      component: ECommerceComponent,
    },


    {
      path: 'sec_roles',

      component: SecRolesComponent,
    },

    {
      path: 'chtest',
      canActivate: [AuthGard],
      component: ChtestComponent,
    },

    {
      path: 'chtest2',
      canActivate: [AuthGard],
      component: Chtest2Component,
    },
    {
      path: 'ChartCost3',
     // canActivate: [AuthGard],
      component: ChartCost3Component,
    },

    {
      path: 'BudgetLanes',
     // canActivate: [AuthGard],
      component: BudgetLanesComponent,
    },

    {
      path: 'AllReports',
     // canActivate: [AuthGard],
      component: AllReportsComponent,
    },


    {
      path: 'DistressSurvey',
      component: DistressSurveyComponent,
    },

    {
      path: 'RegionDistress',
      canActivate: [AuthGard],
      component: RegionDistressComponent,
    },

    {
      path: 'adduser',
      //canActivate: [AuthGard],
      component: AddUserComponent,
    },

    {
      path: 'insertIntersectionDistress',
      // canActivate: [AuthGard],
      component: IntersectiondistressComponent,
    },

    {
      path: 'UpdateRole/:roleid',
      component: UpdateRoleComponent,
    },

    {
      path: 'UpdatingUser/:userid',
      component: UpdatingUserComponent,
    },

    {
      path: 'SectionUpdateComponent',
      canActivate: [AuthGard],
      component: SectionUpdateComponent,
    },

    {
      path: 'UpdateRole/:roleid',
      component: UpdateRoleComponent,
    },

    {
      path: 'UpdatingUser/:userid',
      component: UpdatingUserComponent,
    },
    {
      path: 'IntersectionUpdateComponent',
      component: IntersectionUpdateComponent,
    },

    {
      path: 'contracts',
      loadChildren: () => import('./contracts/contracts.module')
        .then(m => m.ContractsModule),
    },

    {
      path: 'RegionUpdateComponent',
      component: RegionUpdateComponent,
    },

    {
      path: 'UpdateRgionSectionComponent',
      component: UpdateRgionSectionComponent,
    },

    {
      path: 'swalk',

      component: SwalkComponent,
    },
    {
      path: 'Structure',

      component: StructureComponent,
    },
    {
      path: 'MapStatic',

      component: MapStaticComponent,
    },
    {
      path: 'Refresh',

      component: RefreshComponent,
    },
    {
      path: 'pci-intersections',

      component: PciIntersectionsComponent,
    },
    {
      path: 'maintenance-reports',

      component: MaintenanceReportsComponent,
    },
    {
      path: 'md_streets',

      component: MDStreetsComponent,
    },
    {
      path: 'survey',

      component: SurveyComponent,
    },

    {
      path: 'UploadFileComponent',
      component: UploadFileComponent,
    },
    {
      path: 'UncalculatedSectionsComponent',
      component: UncalculatedSectionsComponent,
    },
    {
      path: 'WorkOrdersComponent',
      component: WorkOrdersComponent,
    },

    {
      path: 'SummaryDashboarComponent',
      component: SummaryDashboarComponent,
    },
    {
      path: 'PRIOLANES2Component',
      component: PRIOLANES2Component,
    },


    {
      path: 'PCICALCComponent',
      component: PCICALCComponent,
    },
    {
      path: 'iot-dashboard',
      component: Users1Component,
    },
    {
      path: 'assets-management',
      loadChildren: () => import('./AssetsMangement/assets-management.module')
        .then(m => m.AssetsManagementModule),
    },


    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'iot-dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
