import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AssetsSettingsService } from './../assets-settings.service';

import { TranslateService } from '@ngx-translate/core';



@Injectable({
  providedIn: 'root'
})
export class PagesMenuAuthService {

  MENU_ITEMS: NbMenuItem[] = null;
  _Menu_By_Role = null;




  // constructor(private assetsSettingsService: AssetsSettingsService,private userService: UserServices) {

  // }



  constructor(private translate: TranslateService, private assetsSettingsService: AssetsSettingsService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }






  getMenuByRole(roleId: number) {



    // this._role = this.assetsSettingsService.Roles.find(element => element.RolId == roleId);

    // this._Menu_By_Role = this._role.Menu;
    //   this.updateMenuFromRole(this._Menu_By_Role );
    //   return this.MENU_ITEMS ;
    //   //return this.MENU_ITEMS ;



    var _role2 = this.assetsSettingsService.Roles.find(element => element.RolId == roleId);

    return this.updateMenuFromRole(_role2.Menu);
    //return this.MENU_ITEMS ;
    this.translateMenu(_role2.Menu)



  }
  private translateMenu(menuItems: NbMenuItem[]): void {
    menuItems.forEach(menuItem => {
      if (menuItem.title) {
        this.translate.get(menuItem.title).subscribe(translatedText => {
          menuItem.title = translatedText;
        });
      }
      if (menuItem.children) {
        this.translateMenu(menuItem.children);
      }
    });
  }




  updateMenuFromRole(_obj2) {

    this.MENU_ITEMS = [




      {

        // title: 'إدارة الأصول',
        title: this.translate.instant('menu.assetmanagement'),
        icon: 'edit-2-outline',
        children: _obj2,



      },





    ];

    return this.MENU_ITEMS;
  }

}
