import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from "@angular/router";
import { Observable } from "rxjs";
import  { map, take } from "rxjs/operators";
import { UserServices } from "./user.service";

import { AssetsSettingsService } from './../assets-settings.service';


@Injectable({ providedIn: 'root' })
export class AuthGard implements CanActivate {
    constructor(private userServices: UserServices, private router: Router

      ,private assetsSettingsService: AssetsSettingsService
      ) {

    }

    _route ;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        this._route = route ;

        return this.userServices.user.pipe(
            take(1),
            map(user => {
                console.log(!!user);
                const isAuth = !!user;
                if (isAuth) {
                  //////check authorizarion

                  if (this.checkAuthorization(user,this._route) )

                    return true;
                }
                return this.router.createUrlTree(['/pages/assets-management/user/login']);
            }));
    }

    checkAuthorization(user,route1)
    {
      var auth1 = false ;
      var _role = this.assetsSettingsService.Roles.find(element => element.RolId == user.roleId);
      var r1 ;
      if (_role)
      {
           r1 = _role.Routes.find(element => element == route1._routerState.url);
           if (r1) auth1 = true;
      }


    return auth1;
    }
}
