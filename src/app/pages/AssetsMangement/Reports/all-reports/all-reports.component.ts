import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../Services/reports.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'ngx-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss']
})
export class AllReportsComponent implements OnInit {

  excelFiles = [
    { name: 'MD_STREETS2_COST2' },
    { name: 'MD_STREETS2_DET' },
    // { name: 'MD_STREETS2_DESC' },

    { name: 'MD_SECTIONS2_DESC' },
    { name: 'MD_LANES2_DESC' },
    { name: 'MD_SAMPLES2_DESC' },

    { name: 'PCI_SECTIONS2_V' },
    { name: 'PCI_LANES2_V' },
    { name: 'PCI_SECTION_SAMPLE2_V' },

    { name: 'IRI_STREETS2' },
    { name: 'IRI_SECTIONS2' },
    { name: 'IRI_LANES2' },
    { name: 'IRI_SAMPLES2' },
    { name: 'DISTRESS_PCI2_DEDUCT' },

    // Add more file names and URLs as needed
  ];
  constructor(private reportsService: ReportsService) { }


  exportExcel(tableName: string): void {


    this.reportsService.GetReports(tableName).subscribe((response: Blob) => {
      // Save the file using FileSaver.js
      const fileName = `${tableName}_` + new Date().toISOString() + '.xlsx';
      saveAs(response, fileName);
    }, (error) => {
      console.error('Error occurred:', error);
    });
  }
  ngOnInit(): void {
  }

}
