import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetsServices } from '../assets.service';
import { AssetParameterModel } from './asset-paramater.model';

@Component({
  selector: 'ngx-assets-parameters',
  templateUrl: './assets-parameters.component.html',
  styleUrls: ['./assets-parameters.component.scss']
})
export class AssetsParametersComponent implements OnInit, OnChanges {
  @Input() id;
  assetsParamsData: AssetParameterModel = new AssetParameterModel();
  assetsParamsChartData: any;
  isLoading = false;
  add: boolean;
  constructor(private assetsServices: AssetsServices) {
    // this.assetsParamsData = { assetId: null, climaticFeatures: null, flexDimention: null, suitabilityArea: null, accessibility: null, civilServicesDefence: null, residential: null, commerical: null, industrial: null, managerial: null, storageArea: null, electricity: null, water: null, sewageSystem: null, naturalGas: null, transportation: null, hypermarkets: null, entertainment: null, resedetialCompounds: null, hospitals: null, universitiesInstitutions: null, industrialZones: null, specialViews: null, gardens: null, socialLevel: null, };

  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.id.currentValue === null) return;
    try {
      this.isLoading = true;
      const response = await this.assetsServices.getAssetsParamsById(changes.id.currentValue).toPromise();
      this.assetsParamsData = response["params"];
      this.assetsParamsChartData = response["chart"];
      console.log(response);
      this.isLoading = false;
      this.add = false;
    } catch (error) {
      console.log(error.error);
      this.isLoading = false;
      this.assetsParamsData = new AssetParameterModel();
      this.assetsParamsData.assetId = this.id;
      this.assetsParamsChartData = null;
      this.add = true;
    }

  }
  ngOnInit(): void {
  }
  async onSubmit(form: NgForm) {
    if (!form.valid) return;
    if (this.add) {
      this.isLoading = true;
      const response = await this.assetsServices.createAssetParams(this.assetsParamsData).toPromise();
      this.assetsParamsData = response["params"];
      this.assetsParamsChartData = response["chart"];
      this.isLoading = false;
    } else {
      this.isLoading = true;
      const response = await this.assetsServices.editAssetParams(this.assetsParamsData).toPromise();
      this.assetsParamsData = response["params"];
      this.assetsParamsChartData = response["chart"];
      console.log(response);
      this.isLoading = false;
    }
  }

}
