import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbLayoutDirection, NbLayoutDirectionService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { UserServices } from '../../../pages/AssetsMangement/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AssetsSettingsService } from '../../../pages/AssetsMangement/assets-settings.service'
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {


usern:any;
  private userSub: Subscription;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  isAuthenticated = true;
  user: any;
  @Input() isInverted: boolean = false;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'custom-dark',
      name: 'custom-dark',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  isRtl = false;
  selectedLanguage = 'en';
  languages = [
    { name: 'English', code: 'en' },
    { name: 'Arabic', code: 'ar' },
  ];
  
  constructor(private AssetsSettingsService: AssetsSettingsService, public translate: TranslateService, private sidebarService: NbSidebarService, private directionService: NbLayoutDirectionService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private userServices: UserServices) {
    this.translate.setDefaultLang('ar');
    this.selectedLanguage = this.translate.getDefaultLang();
  }

  toggleDirection() {
    this.isRtl = !this.isRtl;
    const direction = this.isRtl ? NbLayoutDirection.RTL : NbLayoutDirection.LTR;
    this.directionService.setDirection(direction);
  }
  onContecxtItemSelection(title) {
    if (title == "Log out")

      this.userServices.logOut();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.isRtl = !this.isRtl;
    const direction = this.isRtl ? NbLayoutDirection.RTL : NbLayoutDirection.LTR;
    this.directionService.setDirection(direction);
  }

  onLanguageChange() {
    this.AssetsSettingsService.raisDataEmitterEvent(this.selectedLanguage)
    this.translate.setDefaultLang(this.selectedLanguage);

    this.translate.use(this.selectedLanguage);
    //alert(this.selectedLanguage)
    // this.AssetsSettingsService.selectedLanguage = this.selectedLanguage;
    this.isRtl = !this.isRtl;
    //alert(this.translate.currentLang);

    const direction = this.isRtl ? NbLayoutDirection.RTL : NbLayoutDirection.LTR;
    this.directionService.setDirection(direction);
    this.translate.get('LogIn').subscribe((res: string) => {

    });
  }
  ngOnInit() {

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    this.translate.use(this.selectedLanguage);
    this.userSub = this.userServices.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        this.user = user;

      }
    );
    this.currentTheme = this.themeService.currentTheme;

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

this.usern=localStorage.getItem("UserNameOfLogin");
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.userSub.unsubscribe;
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
