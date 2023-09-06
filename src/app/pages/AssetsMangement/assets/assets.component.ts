import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalDataSource, } from 'ng2-smart-table';
import { AssetsServices } from './assets.service';
import { AddAssetParamsButtonComponent, } from './add-asset-params-button/add-asset-params-button.component';
import { LookupService } from './lookups.service';
import { EditAssetButtonComponent } from './edit-asset-button/edit-asset-button.component';
import { NbDialogService } from '@nebular/theme';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { AssetsSettingsService } from '../assets-settings.service';



@Component({
  selector: 'ngx-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  selectedImageFile = null;
  placeHolderUrl = "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
  imageUrl = null;
  isLoading = false;

  tab1: boolean;
  tab2: boolean;
  tab3: boolean;
  selectedId = null;
  source: LocalDataSource;
  source2: LocalDataSource;
  assetsData = [];
  assetsParamsData = [];
  governments = [];
  physicalStatusLookups = [];
  usageTypeLookups = [];
  ownerShipTypeLookups = [];
  typesLookups = [];
  legalStatusLookups = [];
  rentalStatusLookups = [];
  investmentStatusLookups = [];
  investmentValueLookups = [];
  // lookupValues = [[], [], [], [], [], [], [], []];

  @ViewChild('assetsForm') public assetsForm: NgForm;
  @ViewChild('assetsParamsForm') public assetsParamsForm: NgForm;
  constructor(private http: HttpClient, private assetsServices: AssetsServices, private lookupService: LookupService, private dialogService: NbDialogService, private assetsSettingsService: AssetsSettingsService) {
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = false;
  }
  async ngOnInit(): Promise<void> {
    const govs = await this.lookupService.getGevernments().toPromise();
    this.governments = govs;
    var result = await this.retreiveLookupsById([1, 2, 3, 4, 5, 6, 7, 8]);
    for (var response in result) {
      if (this.assetsSettingsService.Lookup.PhysicalStatus.code == result[response]["type_ID"]) {
        this.physicalStatusLookups.push(result[response]);
      } else if (this.assetsSettingsService.Lookup.UsageType.code == result[response]["type_ID"]) {
        this.usageTypeLookups.push(result[response]);
      } 
      else if (this.assetsSettingsService.Lookup.OwnerShipType.code == result[response]["type_ID"]) {
        this.ownerShipTypeLookups.push(result[response]);
      }
       else if (this.assetsSettingsService.Lookup.Type.code == result[response]["type_ID"]) {
        this.typesLookups.push(result[response]);
      } else if (this.assetsSettingsService.Lookup.LegalStatus.code == result[response]["type_ID"]) {
        this.legalStatusLookups.push(result[response]);
      } else if (this.assetsSettingsService.Lookup.RentalStatus.code == result[response]["type_ID"]) {
        this.rentalStatusLookups.push(result[response]);
      } else if (this.assetsSettingsService.Lookup.InvestmentStatus.code == result[response]["type_ID"]) {
        this.investmentStatusLookups.push(result[response]);
      } else if (this.assetsSettingsService.Lookup.InvestmentValue.code == result[response]["type_ID"]) {
        this.investmentValueLookups.push(result[response]);
      }

    }
    console.log(this.ownerShipTypeLookups);
    // console.log("Govs", this.governments);
    // console.log("phys", this.physicalStatusLookups);

    await this.retrieveAssets();

  }
  async retrieveAssets() {
    const response = await this.assetsServices.getAssets().toPromise();
    this.assetsData = [];
    for (const key in response) {
      this.assetsData.push(response[key])
    }
    this.source = new LocalDataSource(this.assetsData);
    return;

  }

  retreiveLookupsById(ids) {
    return this.lookupService.getLookupById(ids).toPromise();
  }


  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    const name = form.value.name;
    const address = form.value.address;
    const physicalStatus = form.value.physicalStatus;
    const usageType = form.value.usageType;
    const ownerShipType = form.value.ownerShipType;
    const type = form.value.type;
    const legalStatus = form.value.legalStatus;
    const rentalStatus = form.value.rentalStatus;
    const investmentStatus = form.value.investmentStatus;
    const investmentValue = form.value.investmentValue;
    const photo = this.imageUrl
    const legalDocument = form.value.legalDocument;
    const govId = form.value.govId;
    const area = form.value.area;
    const notes = form.value.notes;
    this.assetsServices.createAsset(name, address, physicalStatus, ownerShipType, usageType, type, legalStatus, photo, legalDocument, rentalStatus, govId, investmentStatus, investmentValue, area, notes)
      .subscribe(resData => {
        console.log(resData);
        this.dialogService.open(DialogueComponent, {
          context: {
            title: 'تم',
            message: "لقد تمت اضافة الأصل",
          },
        });
      });
    // form.reset();
    // this.selectedId = null;
    // this.imageUrl = null;
    this.isLoading = false;
  }



  onEdit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;
    const name = form.value.name;
    const address = form.value.address;
    const physicalStatus = form.value.physicalStatus;
    const usageType = form.value.usageType;
    const ownerShipType = form.value.ownerShipType;
    const type = form.value.type;
    const legalStatus = form.value.legalStatus;
    const rentalStatus = form.value.rentalStatus;
    const investmentStatus = form.value.investmentStatus;
    const investmentValue = form.value.investmentValue;
    const photo = this.imageUrl
    const legalDocument = form.value.legalDocument;
    const govId = form.value.govId;
    const area = form.value.area;
    const notes = form.value.notes;
    if (window.confirm('هل أنت متأكد أنك تريد تعديل الأصل بالكود: ' + this.selectedId)) {
      this.assetsServices.updateAsset(this.selectedId, name, address, physicalStatus, ownerShipType, usageType, type, legalStatus, photo, legalDocument, rentalStatus, govId, investmentStatus, investmentValue, area, notes).subscribe(resData => {
        console.log(resData);
      });
    }
    // form.reset();
    // this.selectedId = null;
    // this.imageUrl = null;
    this.isLoading = false;
  }
  onDelete(event) {
    console.log(event.data.id);
    if (window.confirm('Are you sure you want to delete asset with id: ' + event.data.id)) {
      this.assetsServices.deleteAssset(event.data.id).subscribe(
        resData => {
          console.log(resData);
          event.confirm.resolve();
        }
      );
    } else {
      event.confirm.reject();
    }
  }
  onSelectedImage(event) {
    this.selectedImageFile = <File>event.target.files[0];
  }
  onUpload() {
    const formData = new FormData();
    formData.append('files', this.selectedImageFile, this.selectedImageFile.name);

    this.http.post('http://10.0.0.2:8082/api/uploadImage', formData, { responseType: 'text', }).subscribe(response => {

      this.selectedImageFile = null;
      this.imageUrl = response;
    });
  }
  switchToFirstTab(rowData) {
    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.selectedId = rowData.id;
    this.imageUrl = rowData.photo;
    this.assetsForm.controls['name'].setValue(rowData.name);
    this.assetsForm.controls['address'].setValue(rowData.address);
    this.assetsForm.controls['legalDocument'].setValue(rowData.legalDocument);
    this.assetsForm.controls['physicalStatus'].setValue(rowData.physicalStatus);
    this.assetsForm.controls['usageType'].setValue(rowData.usageType);
    this.assetsForm.controls['ownerShipType'].setValue(rowData.ownerShipType);
    this.assetsForm.controls['type'].setValue(rowData.type);
    this.assetsForm.controls['legalStatus'].setValue(rowData.legalStatus);
    this.assetsForm.controls['rentalStatus'].setValue(rowData.rentalStatus);
    this.assetsForm.controls['investmentStatus'].setValue(rowData.investmentStatus);
    this.assetsForm.controls['investmentValue'].setValue(rowData.investmentValue);
    this.assetsForm.controls['govId'].setValue(rowData.gov_id);
    this.assetsForm.controls['area'].setValue(rowData.area);
    this.assetsForm.controls['notes'].setValue(rowData.notes);
  }
  switchToSecondTab() {
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = false;
  }
  switchToThirdTab(id) {
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = true;
  }

  changeTab(event) {

    if (event.tabTitle == "إضافة الأصول") {
      this.tab1 = true;
      this.tab2 = false;
      this.tab3 = false;
    } else if (event.tabTitle == "تفاصيل الأصول") {
      this.tab1 = false;
      this.tab2 = true;
      this.tab3 = false;
    } else if (event.tabTitle == "إضافة معايير تقييم الأصل") {
      this.tab1 = false;
      this.tab2 = false;
      this.tab3 = true;
    }
  }
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    actions: {
      add: false,
      edit: false,
      delete: true,
      position: 'left',
      columnTitle: "",
    },
    columns: {
      id: {
        title: 'كود الأصل',
        filter: false,
      },
      name: {
        title: 'أسم الأصل',
        filter: false,
      },
      address: {
        title: 'العنوان',
        filter: false,
      },
      type_AR: {
        title: 'نوع الأصل',
        filter: false,
      }, physicalStatus_AR: {
        title: 'الوضع المادي',
        filter: false,
      },

      ownerShipType_AR: {
        title: 'نوع الملكية',
        filter: false,
      },
      rentalStatus_AR: {
        title: 'حالة الإيجار',
        filter: false,
      },
      area: {
        title: 'المساحة',
        filter: false,
      },
      photo: {
        title: 'صورة الأصل',
        type: 'html',
        valuePrepareFunction: (picture: string) => { return `<img width="50" src="${picture}" />`; },
        filter: false,
      },
      addAssetParamsButton: {
        type: 'custom',
        filter: false,

        renderComponent: AddAssetParamsButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.onPressed.subscribe(
            event => {
              console.log("Switching to third");
              this.selectedId = instance.rowData.id;
              this.switchToThirdTab(instance.rowData.id);
            }
          )
        },

      },
      editAssetsButton: {
        type: 'custom',
        filter: false,
        renderComponent: EditAssetButtonComponent,
        onComponentInitFunction: (instance) => {
          instance.onPressed.subscribe(
            event => {

              this.switchToFirstTab(instance.rowData);
            }
          )
        },

      },

    },
  };

  onSearch(query: string = '') {
    if (query.length == 0) {
      this.source = new LocalDataSource(this.assetsData)
      return;
    }
    this.source.setFilter([
      // fields we want to inclue in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'address',
        search: query
      },
      {
        field: 'type',
        search: query
      }, {
        field: 'physicalStatus',
        search: query
      },
      {
        field: 'ownerShipType',
        search: query
      },
      {
        field: 'rentalStatus',
        search: query
      },
      {
        field: 'area',
        search: query
      },
    ], false);
  }
}

