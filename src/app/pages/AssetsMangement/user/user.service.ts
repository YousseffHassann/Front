import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

import { AssetsSettingsService } from "../assets-settings.service";

@Injectable({ providedIn: "root" })
export class UserServices {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private _AssetsSettingsService: AssetsSettingsService
  ) {}

  getUsers() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.user.getValue().getToken()}`,
    });
    // return this.http.get('https://localhost:44310/getUsers', { headers: headers, });

    return this.http.get(
      this._AssetsSettingsService.hostaddress2 + "Security/getUsers",
      { headers: headers }
    );
  }

  // logIn(email: string, password: string) {
  //     return this.http.post('https://localhost:44310/Login', {
  //         "email_address": email,
  //         "password": password,
  //     }).pipe(tap(
  //         resData => {
  //             const user = new User(
  //                 resData["accessToken"],
  //                 resData["userId"],
  //                 resData["emailAddress"],
  //                 resData["source"],
  //                 resData["firstName"],
  //                 resData["middleName"],
  //                 resData["lastName"],
  //                 resData["roleId"],
  //                 resData["pubId"],
  //                 resData["hireDate"],
  //             );
  //             this.user.next(user);
  //             localStorage.setItem('userData', JSON.stringify(user));
  //         }
  //     ));
  // }

  //   logIn(USERNAME: string, password: string) {

  //     return this.http.post('https://localhost:44310/api/Security/User/Login', {
  //         "USERNAME": USERNAME,
  //         "password": password,
  //     }).pipe(tap(
  //         resData => {
  //             const user = new User(
  //                 resData["accessToken"],

  //                 resData["userId"],
  //                 resData["emailAddress"],
  //                 resData["username"],
  //                 resData["roleId"],
  //                 resData["source"],
  //                 resData["firstName"],
  //                 resData["middleName"],
  //                 resData["lastName"],

  //                 resData["pubId"],

  //                 resData["hireDate"]
  //             );
  //             this.user.next(user);
  //             localStorage.setItem('userData', JSON.stringify(user));
  //         }
  //     ));
  // }

  //   logIn(USERNAME: string, password: string) {

  //     return this.http.post('https://localhost:44310/api/Security/User/Login', {
  //         "USERNAME": USERNAME,
  //         "password": password,
  //     }).pipe(tap(
  //         resData => {
  //             const user = new User(
  //                 resData["accessToken"],

  //                 resData["userId"],
  //                 resData["emailAddress"],
  //                 resData["username"],
  //                 resData["roleId"],
  //                 resData["source"],
  //                 resData["firstName"],
  //                 resData["middleName"],
  //                 resData["lastName"],

  //                 resData["pubId"],

  //                 resData["hireDate"]
  //             );
  //             this.user.next(user);
  //             localStorage.setItem('userData', JSON.stringify(user));
  //         }
  //     ));
  // }

  // logIn(USERNAME: string, password: string) {

  //     return this.http.post(this._AssetsSettingsService.hostaddress2 + 'Security/User/Login', {
  //         "USERNAME": USERNAME,
  //         "password": password,
  //     }).pipe(tap(
  //         resData => {
  //             const user = new User(
  //                 resData["accessToken"],

  //                 resData["userId"],
  //                 resData["emailAddress"],
  //                 resData["username"],
  //                 resData["roleId"],
  //                 resData["source"],
  //                 resData["firstName"],
  //                 resData["middleName"],
  //                 resData["lastName"],

  //                 resData["pubId"],

  //                 resData["hireDate"]
  //             );
  //             this.user.next(user);
  //             localStorage.setItem('userData', JSON.stringify(user));
  //         }
  //     ));
  // }

  /////////////////////////////////////////////
  //ADDED BY MOSTAFA
  //GET THE CURRENT IN USE SURVEY NUMBER
  getActiveSurveyNumber() {
    return this.http.get(
      this._AssetsSettingsService.hostaddress2 +
        "Archive/AccessDBSample/getactivesurveynumber"
    );
  }


  // API TO GET THE ENCRYPTED MAC ADDRESS OF THE CURRENT SERVER TO CHECK IF IT EXISTS IN THE DATABASE
  checkIfMacAddressExists(){
    return this.http.get(     this._AssetsSettingsService.hostaddress2 +
      "Security/User/checkifmacaddressexists", {
      responseType: 'text' 
    })

  }

  addAuthorizationKey(incKey:any){
    return this.http.post(
      this._AssetsSettingsService.hostaddress2 +
      "Security/User/addauthorizationkey",{"MACADDRESS":incKey})
  }
  /////////////////////////////////////////////

  logIn(USERNAME: any, password: any) {
    /*
                var AbstractReadOnlyService;
                AbstractReadOnlyService.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
                AbstractReadOnlyService.httpHeaders = AbstractReadOnlyService.httpHeaders.set('Accept', 'application/json');

                AbstractReadOnlyService.optionsStatic = {
                    headers: AbstractReadOnlyService.httpHeaders,
                   // params: new HttpParams(),
                    withCredentials: false//true
                };
        */
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //  'Authorization': `Bearer ${this.user.getValue().getToken()}`
      Accept: "application/json",
      withCredentials: "true",
    });

    //headers.httpHeaders = AbstractReadOnlyService.httpHeaders.set('Accept', 'application/json');

    // return this.http.get('https://localhost:44310/getUsers', { headers: headers, });

    return this.http
      .post(
        this._AssetsSettingsService.hostaddress2 + "Security/User/Login",
        {
          USERNAME: USERNAME,
          password: password,
        }
        //   , AbstractReadOnlyService.optionsStatic
        // , { headers: headers }
        // , { withCredentials: true }
      )
      .pipe(
        tap((resData) => {
          const user = new User(
            resData["accessToken"],

            resData["userId"],
            resData["emailAddress"],
            resData["username"],
            resData["roleId"],
            resData["source"],
            resData["firstName"],
            resData["middleName"],
            resData["lastName"],

            resData["pubId"],

            resData["hireDate"]
          );
          this.user.next(user);
          localStorage.setItem("userData", JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData: {
      _accessToken: string;
      userId: number;
      emailAddress: string;

      USERNAME: string;
      roleId: number;
      source: string;
      firstName: string;
      middleName: string;
      lastName: string;

      pubId: number;
      hireDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;
    const loadedUser = new User(
      userData._accessToken,
      userData.userId,
      userData.emailAddress,
      userData.USERNAME,
      userData.roleId,
      userData.source,
      userData.firstName,
      userData.middleName,
      userData.lastName,
      userData.pubId,
      userData.hireDate
    );
    this.user.next(loadedUser);
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(["/login"]);

    //this.router.navigate(['/pages/assets-management/user/login']);
    localStorage.removeItem("userData");
  }
  createAccount(
    email: string,
    password: string,
    source: string,
    firstName: string,
    middleName: string,
    lastName: string,
    roleId: number,
    pubId: number,
    hireDate: string
  ) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.user.getValue().getToken()}`,
    });
    return this.http.post(
      "https://localhost:44310/SignUp",
      {
        email_address: email,
        password: password,
        source: source,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        role_id: roleId,
        pub_id: pubId,
        hire_date: hireDate,
      },
      { headers: headers }
    );
  }
  editAccount(data: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.user.getValue().getToken()}`,
    });
    return this.http.put(
      "https://localhost:44310/editAccount",
      {
        user_id: data["userId"],
        email_address: data["emailAddress"],
        source: data["source"],
        first_name: data["firstName"],
        middle_name: data["middleName"],
        last_name: data["lastName"],
        role_id: data["roleId"],
        pub_id: data["pubId"],
        hire_date: data["hireDate"],
      },
      { headers: headers }
    );
  }
  deleteUser(id: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.user.getValue().getToken()}`,
    });
    return this.http.delete("https://localhost:44310/deleteAccount", {
      body: {
        user_id: id,
      },
      headers: headers,
    });
  }
}
