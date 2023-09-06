import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './userscomponent';
import { Users1Component } from '../pages/PMMSComponents/users1/users1.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      component: Users1Component,
    },
    {
      path: '',
      redirectTo: 'users',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: Users1Component,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
