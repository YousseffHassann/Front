import { Component, OnInit } from '@angular/core';
import { equipmentvalidatefwdService } from './equipment-validate-fwd.service';
import { GetStreetsIRI } from '../equipment-validate-iri/GetStreetsIRI.model';
import { LocalDataSource } from "ng2-smart-table";
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { TranslateService } from '@ngx-translate/core'
import { SmartTableData } from "../../../../../@core/data/smart-table";
@Component({
  selector: 'ngx-equipment-validate-fwd',
  templateUrl: './equipment-validate-fwd.component.html',
  styleUrls: ['./equipment-validate-fwd.component.scss']
})
export class EquipmentValidateFWDComponent implements OnInit {

  constructor(private translate: TranslateService, private EquipmentvalidatefwdService: equipmentvalidatefwdService) { }
  StreetsIRI: GetStreetsIRI[]
  MAIN_NO: string
  settings1 = {
    hideSubHeader: true,

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
      },
      SECTION_NO: {
       // title: "رقم المقطع  ",
        title: this.translate.instant('equipment-validate-fwd.SECTION_NO'),
        type: "string",
      },
      LANE: {
       /// title: "نوع  الحارات",
        title: this.translate.instant('equipment-validate-fwd.LANE'),

        type: "number",
      },


    },
    // rowClassFunction: (row) => {
    //   if (row.data.TCOUNTLANE != row.data.TCOUNTIRI) {

    //     return "solved";
    //   } else {
    //     return "aborted";
    //   }
    // },

  };
  source1: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.EquipmentvalidatefwdService.ValidateFWD()
      .subscribe((data) => {
         this.StreetsIRI = data;
      });
  }
  filtered: any
  onChange(value: string): void {
    this.filtered = this.StreetsIRI.filter(function (hero) {
         return hero.MAIN_NO == value;
    });

    const MAIN_NO = this.filtered.map(data => (data.MAIN_NO));
    const SURVEY_NO = this.filtered.map(data => (data.SURVEY_NO));
    this.EquipmentvalidatefwdService.
      ValidateFWD2(MAIN_NO, SURVEY_NO)
      .subscribe((data12) => {
          this.source1.empty;
            this.source1.refresh;

         this.source1.load(data12);
      });
    this.downloadCSV();
  }
  downloadCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'id',
        'رقم المقطع',
        'نوع الحارة',
      ],
    };
    this.source1.getAll().then(data => {
       new AngularCsv(data, 'حارات بالمعدة وغير موجودة بالنظام FWD', options);
    })
  }
}
