import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGard } from './pages/AssetsMangement/user/auth.guard';
import { NgxLoginComponent } from './auth/login/login.component';
//import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'pages',

    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  }, {
    path: 'login',
    loadChildren: () => import('./login/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,

    children: [
      {
        path: '',
        component: NbLoginComponent,
      },


      // {
      //   path: 'login2',
      //   component: LoginComponent,
      // },

      {
        path: 'login',
        loadChildren: () => import('./login/pages.module')
          .then(m => m.PagesModule),
      },

      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },

  { path: 'print', loadChildren: () => import('./print/print.module').then(m => m.PrintModule) },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];
const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
