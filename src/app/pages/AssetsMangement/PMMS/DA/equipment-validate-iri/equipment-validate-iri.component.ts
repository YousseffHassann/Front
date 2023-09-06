import { Component, OnInit } from '@angular/core';
import { equipmentvalidateiriService } from './equipment-validate-iri.service';
import { GetStreetsIRI } from './GetStreetsIRI.model';
import { LocalDataSource } from "ng2-smart-table";
import { TranslateService } from '@ngx-translate/core'
import { SmartTableData } from "../../../../../@core/data/smart-table";

@Component({
  selector: 'ngx-equipment-validate-iri',
  templateUrl: './equipment-validate-iri.component.html',
  styleUrls: ['./equipment-validate-iri.component.scss']
})
export class EquipmentValidateIRIComponent implements OnInit {

  constructor(private translate: TranslateService, private EquipmentvalidateiriService: equipmentvalidateiriService) {
    translate.setDefaultLang('en');
    translate.use('en');

  }
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
        //  title: "رقم المقطع  ",
        title: this.translate.instant('equipment-validate-iri.SECTION_NO'),
        type: "string",
      },
      LANE: {
        //title: "نوع  الحارات",
        title: this.translate.instant('equipment-validate-iri.LANE'),

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
    this.EquipmentvalidateiriService.ValidateIRI()
      .subscribe((data) => {
        this.StreetsIRI = data;
      });
  }
  filtered: any
  onChange(value: string): void {
    this.filtered = this.StreetsIRI.filter(function (hero) {
      return hero.MAIN_NO == value;
    });
    var result = []
    this.filtered.forEach(item => {
      let count = result.filter(x => x.MAIN_NO == item.MAIN_NO).length

      if (count == 0) {
        result.push(item)
      }
    })

    const MAIN_NO = result.map(data => (data.MAIN_NO));
    const SURVEY_NO = result.map(data => (data.SURVEY_NO));
    this.EquipmentvalidateiriService.
      ValidateIRI2(MAIN_NO, SURVEY_NO)
      .subscribe((data12) => {
        this.source1.empty;
        this.source1.refresh;

        this.source1.load(data12);
      });
  }

}
