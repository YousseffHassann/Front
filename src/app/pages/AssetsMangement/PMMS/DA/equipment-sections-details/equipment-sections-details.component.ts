import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core'
import { GetStreetsIRI } from "../../DA/GetStreetsIRI.model"
import { equipmentsectionsdetailsService } from './equipment-sections-details.service';
@Component({
  selector: 'ngx-equipment-sections-details',
  templateUrl: './equipment-sections-details.component.html',
  styleUrls: ['./equipment-sections-details.component.scss']
})
export class EquipmentSectionsDetailsComponent implements OnInit {
  radio1: boolean = true;
  radio2: boolean = true;
  radio3: boolean = true;
  StreetsIRI: GetStreetsIRI[];
  STREET_ID: string;
  loading: true;
  check1: boolean = false;
  settings1 = {
    //hideSubHeader: true,

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      index: {
        title: "Item",
        type: "text",
        width: "100px",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      }
      ,




      SECTION_NO: {
        //  title: "رقم المقطع",
        title: this.translate.instant('EquipmentSectionsDetails.SECTION_NO'),
        type: "string",
      },


      SEC_LANES_COUNT: {
        // title: "  عدد الحارات		 ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_COUNT'),

        type: "string",
      }
      ,

      SEC_LANES_TYPE: {
        // title: "نوع الحاره ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_TYPE'),

        type: 'string',
      },


      SEC_LENGTH: {
        //  title: "طول المقطع  ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LENGTH'),

        type: 'string',
      }
    },

    SEC_WIDTH: {
      // title: "عرض المقطع  ",
      title: this.translate.instant('EquipmentSectionsDetails.SEC_WIDTH'),

      type: 'string',
    },


    SEC_LANES_LENGTH: {
      //  title: "طول كل الحارات   ",
      title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_LENGTH'),

      type: 'string',
    }
  };
  settings2 = {
    //hideSubHeader: true,

    mode: "external",
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },
    columns: {
      index: {
        title: "Section",
        type: "text",
        width: "100px",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
      }
      ,

      SECTION_NO: {
        //  title: "رقم المقطع",
        title: this.translate.instant('EquipmentSectionsDetails.SECTION_NO'),
        type: "string",
      },


      SEC_LANES_COUNT: {
        // title: "  عدد الحارات		 ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_COUNT'),

        type: "string",
      }
      ,

      SEC_LANES_TYPE: {
        // title: "نوع الحاره ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_TYPE'),

        type: 'string',
      },


      SEC_LENGTH: {
        //  title: "طول المقطع  ",
        title: this.translate.instant('EquipmentSectionsDetails.SEC_LENGTH'),

        type: 'string',
      }
    },

    SEC_WIDTH: {
      // title: "عرض المقطع  ",
      title: this.translate.instant('EquipmentSectionsDetails.SEC_WIDTH'),

      type: 'string',
    },


    SEC_LANES_LENGTH: {
      //  title: "طول كل الحارات   ",
      title: this.translate.instant('EquipmentSectionsDetails.SEC_LANES_LENGTH'),

      type: 'string',
    }
  };
  source1: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();

  constructor(private translate: TranslateService, private EquipmentsectionsdetailsService: equipmentsectionsdetailsService) {
    translate.setDefaultLang('en');
    translate.use('en');

  }

  ngOnInit(): void {
    this.EquipmentsectionsdetailsService
      .GetSectionsDetailsIRI_byST()
      .subscribe((data) => {
        this.StreetsIRI = data;
      });

  }
  mainstreet: string
  onChange(value: string): void {
    this.check1 = true;
    this.mainstreet = value;
    this.EquipmentsectionsdetailsService.GetSectionsDetailsSYS_ST
      (value)
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;

        this.source1.load(data);
      });
  }
  radioChange1() {
    this.EquipmentsectionsdetailsService
      .GetSectionsDetailsIRI_byST2(this.mainstreet)
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;

        this.source1.load(data);
      });

    this.radio1 = false;
    this.radio2 = true;
    this.radio3 = true;
  }
  radioChange2() {
    this.EquipmentsectionsdetailsService
      .GetSectionsDetailsSYS_ST(this.mainstreet)
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;

        this.source1.load(data);
      });

    this.radio1 = true;
    this.radio2 = false;
    this.radio3 = true;
  }
  radioChange3() {

    this.EquipmentsectionsdetailsService
      .GetSectionsDetailsNewIRI_St(this.mainstreet)
      .subscribe((data) => {
        this.source2.empty;
        this.source2.refresh;

        this.source2.load(data);
      });


    this.radio1 = true;
    this.radio2 = true;
    this.radio3 = false;
  }
}
