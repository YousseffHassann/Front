import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
//import { User } from '../../pages/AssetsMangement/user/user.model';
//import { UserServices } from '../../pages/AssetsMangement/user/user.service'
import { TranslateService } from "@ngx-translate/core";
import { NbLayoutDirection, NbLayoutDirectionService } from "@nebular/theme";
import { AssetsSettingsService } from "../../AssetsMangement/assets-settings.service";
import { UserServices } from "../../AssetsMangement/user/user.service";
import * as lang from "esri/core/lang";
import { Console } from "console";
import { HttpErrorResponse } from "@angular/common/http";

//import { AssetsSettingsService } from '../../pages/AssetsMangement/assets-settings.service'
@Component({
  selector: "ngx-login",
  templateUrl: "./users1.component.html",
  styleUrls: ["./users1.component.scss"],
})
export class Users1Component implements OnInit {























  onLanguageChange(val) {
    this.translate.use(val);
    console.log(val);
    localStorage.setItem('lang',val);
    // this.AssetsSettingsService.selectedLanguage = this.selectedLanguage;
    this.isRtl = !this.isRtl;
    const direction = this.isRtl ? NbLayoutDirection.RTL : NbLayoutDirection.LTR;
    this.directionService.setDirection(direction);
    this.translate.get('LogIn').subscribe((res: string) => {
    });
    location.reload();
  }




  
  lang: any = "en";
 selectedLanguage = "en";
  languages = [
    { name: "English", code: "en" },
      { name: 'Arabic', code: 'ar' },
  ];
  bg: string = "assets/images/WEBSITE-23.png";
  isLoading = false;
  error = null;
  myHero: string;
  constructor(
    private directionService: NbLayoutDirectionService,
    private AssetsSettingsService: AssetsSettingsService,
    private translate: TranslateService,
    private userServices: UserServices,
    private router: Router
  ) {
     this.lang=this.translate.currentLang;

    this.myHero = this.translate.instant("LogIn");
  }

  authorizedMacAddress:any


  activateMacAddress(form:NgForm){
    let incKey = form.value.key;
    console.log(incKey)
    this.userServices.addAuthorizationKey(incKey).
    subscribe((res=>{
      this.checkIfMacAddressExists()
    }))
  }

  ngOnInit(): void {
    console.log(this.lang);
    this.checkIfMacAddressExists()
  }

  // checkIfMacAddressExists(){
  //   this.userServices.checkIfMacAddressExists().
  //   subscribe((res=>{
  //           console.log(res)
  //     this.authorizedMacAddress=res;
  //     console.log(this.authorizedMacAddress)
  //   }));
  // }
  checkIfMacAddressExists() {
    this.userServices.checkIfMacAddressExists().subscribe((response: string) => {
        // Handle the response string here
       
        console.log(response);
              this.authorizedMacAddress=response;

        // Perform any additional processing or logic based on the response
      }, (error: HttpErrorResponse) => {
        // Handle any errors that occur during the HTTP request
        console.error(error);
        if(error.status === 400) {
          // handle 400 error
          this.authorizedMacAddress="Locked";
        }

      });
  }
  isRtl = true;

  // onLanguageChange(val) {
  //   this.translate.use(val);
  //   console.log(val);
  //   localStorage.setItem('lang',val);
  //   // this.AssetsSettingsService.selectedLanguage = this.selectedLanguage;
  //   this.isRtl = !this.isRtl;
  //   const direction = this.isRtl ? NbLayoutDirection.RTL : NbLayoutDirection.LTR;
  //   this.directionService.setDirection(direction);
  //   this.translate.get('LogIn').subscribe((res: string) => {

  //   });
  // }

  surveyNumber: any;
  UNAME: any;
  PASSWORD: any;

  validate: any;

  message: boolean = false;
  usernameMessage: boolean = false;
  allmessage: any = false;

  onSubmit(form: NgForm) {
   

    //     if (!form.valid)
    //     {

    //       if (localStorage.getItem("username") != "PMMS" || localStorage.getItem("username") != "Admin" && localStorage.getItem("username") !=' ') {
    // console.log("UserNameError ");
    //         this.usernameMessage = true;
    //         this.message = false;
    //         console.log(localStorage.getItem("username"));
    //         console.log(typeof (localStorage.getItem("username")));
    //       }
    //       else
    //       {
    //         this.message = true;
    //         this.usernameMessage = false;
    //         console.log("Not UserName Error")
    //       }

    //     }
    const email = form.value.email;
    const password = form.value.password;
    console.log(password);
    this.UNAME = email;
    this.PASSWORD = password;


    this.userServices.getActiveSurveyNumber().subscribe((res) => {
      this.surveyNumber = res[0].SURVEY_NO;
      localStorage.setItem("surveynumber", this.surveyNumber);
      localStorage.setItem("username", email);
      console.log(this.surveyNumber);
      console.log("***********************");
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("surveynumber"));

      localStorage.setItem("UserNameOfLogin", localStorage.getItem("username"));
      console.log();

      if (!form.valid) {
        this.usernameMessage = true;

        // if (localStorage.getItem("username") == "PMMS" || localStorage.getItem("username") == "Admin" && localStorage.getItem("username") !== null && form.valid ) {
        //     console.log("UserNameError ");
        //     this.usernameMessage = false;
        //     this.message = true;
        //     console.log(localStorage.getItem("username"));
        //     console.log(typeof (localStorage.getItem("username")));
        //   }

        // else if (localStorage.getItem("username") == "PMMS" || localStorage.getItem("username") == "Admin" && password && form.valid) {
        //   this.message = false;
        //   this.usernameMessage = false;
        // }

        // else  {
        //     this.message = false;
        //     this.usernameMessage = true;
        //     console.log("Not UserName Error");
        //   }
      }
    });

    this.userServices.logIn(email, password).subscribe(
      (resData) => {
        console.log(resData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(["/pages/MapStatic"]);
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.error = errorResponse.error;
        this.isLoading = false;
      }
    );
    this.isLoading = true;
    // form.reset();
  }
}
