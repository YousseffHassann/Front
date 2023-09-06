import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { PagesMenuAuthService } from './AssetsMangement/user/pages-menu-auth.service'
import { TranslateService } from '@ngx-translate/core'
import { UserServices } from "./AssetsMangement/user/user.service";
import { AssetsSettingsService } from "../pages/AssetsMangement/assets-settings.service"
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {


  menu = MENU_ITEMS;
  //menu = null;

  //  constructor( private _PagesMenuAuthService :PagesMenuAuthService) {
  //   //_PagesMenuAuthService.getMenuByUser("w");
  //  //this.menu =  _PagesMenuAuthService.getMenuByUser("w",)this.menu;
  //  _PagesMenuAuthService.getMenuByUser("w",this.menu);

  // }
lang:any
  constructor(private AssetsSettingsService: AssetsSettingsService, private translate: TranslateService, private _PagesMenuAuthService: PagesMenuAuthService, private userService: UserServices) {
    //_PagesMenuAuthService.getMenuByUser("w");
    //this.menu =  _PagesMenuAuthService.getMenuByUser("w",)this.menu;this.lang=localStorage.getItem('lang')
    this.lang = localStorage.getItem('lang')

    translate.use(this.lang);
    this.userService.user.subscribe((data) => {
      //  this._role = data;
      if (data == null)
        this.menu = null;

      else
        this.menu = this._PagesMenuAuthService.getMenuByRole(data.roleId);
      this.translateMenu(this.menu);
      // alert(JSON.stringify(this.menu))

    });

  }
  translateMenu(menu: any[]) {
    menu.forEach((item) => {
      item.title = this.translate.instant(item.title);

      if (item.children) {
        this.translateMenu(item.children);

      }
    });

  }
}