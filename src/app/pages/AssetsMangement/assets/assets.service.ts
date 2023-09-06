import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, } from "rxjs";
import { Subject } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { UserServices } from "../user/user.service";
import { AssetParameterModel } from "./assets-parameters/asset-paramater.model";



@Injectable({ providedIn: 'root' })
export class AssetsServices {


    assetsRequest = new Subject<void>();
    assetsComplete = new Subject<void>();
    assetsClassification = new Subject<void>();
    filterCryteriaObject;
    ClassificationObj;

    assetsObject;

    constructor(private http: HttpClient, private router: Router, private userService: UserServices) { }

    createAsset(
        name: string,
        address: string,
        physicalStatus: number,
        ownerShipType: number,
        usageType: number,
        type: number,
        legalStatus: number,
        photo: string,
        legalDocument: string,
        rentalStatus: number,
        govId: number,
        investmentStatus: number,
        investmentValue: number,
        area: number,
        notes: string
    ) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.post('http://10.0.0.2:8082/api/addAsset', {

                "Name": name,
                "Address": address,
                "PhysicalStatus": physicalStatus,
                "OwnerShipType": ownerShipType,
                "UsageType": usageType,
                "Type": type,
                "LegalStatus": legalStatus,
                "Photo": photo,
                "LegalDocument": legalDocument,
                "RentalStatus": rentalStatus,
                "gov_id": govId,
                "InvestmentStatus": investmentStatus,
                "InvestmentValue": investmentValue,
                "Area": area,
                "Notes": notes
            },
                { responseType: "text", headers: headers, },

            );
        }));

    }
    getAssets() {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getAssets', { headers: headers, responseType: 'json', });
        }));
    }
    getAssetById(id: number) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`

            })
            return this.http.get('http://10.0.0.2:8082/api/getAssetById', { headers: headers, params: { ID: id }, });
        }));
    }
    updateAsset(
        id: number,
        name: string,
        address: string,
        physicalStatus: number,
        ownerShipType: number,
        usageType: number,
        type: number,
        legalStatus: number,
        photo: string,
        legalDocument: string,
        rentalStatus: number,
        govId: number,
        investmentStatus: number,
        investmentValue: number,
        area: number,
        notes: string
    ) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.put('http://10.0.0.2:8082/api/editAsset', {
                "ID": id,
                "Name": name,
                "Address": address,
                "PhysicalStatus": physicalStatus,
                "OwnerShipType": ownerShipType,
                "UsageType": usageType,
                "Type": type,
                "LegalStatus": legalStatus,
                "Photo": photo,
                "LegalDocument": legalDocument,
                "RentalStatus": rentalStatus,
                "gov_id": govId,
                "InvestmentStatus": investmentStatus,
                "InvestmentValue": investmentValue,
                "Area": area,
                "Notes": notes
            },
                { responseType: "text", headers: headers, }
            );
        }));
    }
    deleteAssset(id: number) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.delete('http://10.0.0.2:8082/api/deleteAsset', {
                body: {
                    "ID": id,
                },
                responseType: "text",
                headers: headers,
            });
        }));
    }
    createAssetParams(
        assetsParamsData: AssetParameterModel
    ) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.post('http://10.0.0.2:8082/api/addAssementParams', assetsParamsData,
                { responseType: 'json', headers: headers, },
            );
        }));

    }
    editAssetParams(
        assetsParamsData: AssetParameterModel
    ) {
        console.log(assetsParamsData);
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.put('http://10.0.0.2:8082/api/editAssementParams', assetsParamsData,
                { responseType: 'json', headers: headers, },
            );
        }));

    }
    getAssetsParamsById(id: number) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get<AssetParameterModel>('http://10.0.0.2:8082/api/getAssementParamsById', { headers: headers, params: { id: id }, responseType: 'json', });
        }));
    }
    getAssetsParamChartData(id: number) {
        return this.userService.user.pipe(take(1), exhaustMap(user => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.getToken()}`
            })
            return this.http.get('http://10.0.0.2:8082/api/getAssementParamsChartDataById', { headers: headers, params: { id: id }, responseType: 'json', });
        }));
    }





    ///////////////////#By waleed  


    public sendDataToMap(assetIds, govId) {
        this.filterCryteriaObject = {
          assetsData: false,
          assetsObject: assetIds,
          STREET_ID: 2,
        };
        this.assetsRequest.next();
    }

    public queryAssetsFilter(dd: any, filterCryteriaObject1: any): void {



        //  this.filterCryteriaObject.GovId = filterCryteriaObject1.GovId ; 
        this.filterCryteriaObject = filterCryteriaObject1;
        // this.assetsObject = false 
        this.assetsObject = [12, 13, 63, 61, 65, 64];
        if (dd == -1) {
            //this.assetsObject = false ;
            this.filterCryteriaObject = {
                assetsData: false
                , assetsObject: this.assetsObject
                , GovId: filterCryteriaObject1.GovId
            }

        }
        else {
            //this.assetsObject = false 
            //this.assetsObject = [1,2];


            this.filterCryteriaObject = {
                assetsData: true
                , assetsObject: this.assetsObject
                , GovId: filterCryteriaObject1.GovId
            }

        }
        this.assetsRequest.next();


    }

    // //////----#stub
    // getAssetbyId(id: string): any {
    //     let _asset: any;

    //     // let asset1 = {"Id":"1"
    //     // ,"descrption":"description22"
    //     // }
    //     // let asset2 = {"Id":"2"
    //     // ,"descrption":"description22"
    //     // }

    //     let asset1 = {
    //         "Id": "1"
    //         , "Id2": "Id21111111"
    //     }
    //     let asset2 = {
    //         "Id": "2"
    //         , "Id2": "Id2222222"
    //     }


    //     if (id == "1") _asset = asset1;
    //     else _asset = asset2;



    //     return _asset;
    // }


    // getAssetById(id: number) {
    //     return this.userService.user.pipe(take(1), exhaustMap(user => {
    //         const headers = new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.getToken()}`

    //         })
    //         return this.http.get('http://10.0.0.2:8082/api/getAssetById', { headers: headers, params: { ID: id }, });
    //     }));
    // }


    // getAssetById2(id: number):any {
    //     return this.userService.user.pipe(take(1), exhaustMap(user => {
    //         const headers = new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.getToken()}`

    //         })
    //         let asset = this.http.get('http://10.0.0.2:8082/api/getAssetById', { headers: headers, params: { ID: id }, });
    //         return asset ; 
    //     }));
    // }


    // getAssetsPopupData(id: string): string {

    //     //let asset =  this.getAssetbyId(id);

    //     let _asset: any;

    //     let asset1 = {
    //         "Id": "1"
    //         , "descrption": "description22"
    //     }
    //     let asset2 = {
    //         "Id": "2"
    //         , "descrption": "description22"
    //     }


    //     if (id == "1") _asset = asset1;
    //     else _asset = asset2;

    //     let content = "<Div> Asset id: " + _asset.Id + "</Div>" +
    //         "<Div> descrption: " + _asset.descrption + "</Div>";

    //     return content;
    // }



    public classifyAssets(ClassificationName: string): void {

        this.ClassificationObj = ClassificationName;
        //this.assetsClassification.next();
        this.assetsClassification.next();

    }


}


