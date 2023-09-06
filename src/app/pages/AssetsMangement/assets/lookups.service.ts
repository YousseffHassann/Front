import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserServices } from "../user/user.service";



@Injectable({ providedIn: 'root' })
export class LookupService {
    constructor(private http: HttpClient, private router: Router, private userService: UserServices) { }

    getLookupById(ids) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getLookups', { headers: headers, params: { listOfIds: ids }, },);
        }));
    }
    getGevernments() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get<[]>('http://10.0.0.2:8082/api/getGovernments', { headers: headers, },);
        }));
    }
}


