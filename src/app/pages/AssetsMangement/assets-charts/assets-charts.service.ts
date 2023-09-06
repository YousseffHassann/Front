import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, } from "rxjs";
import { exhaustMap, take, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserServices } from "../user/user.service";



@Injectable({ providedIn: 'root' })
export class AssetsChartsService {
    constructor(private http: HttpClient, private router: Router, private userService: UserServices) { }


    getAssetsArea() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getAssetsArea', { headers: headers, });
        }));
    }
    getAssetsCount() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getAssetsCount', { headers: headers, });
        }));
    }
    getAssetsAvgs() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getAssetsParametersAverage', { headers: headers, });
        }));
    }
  


}


