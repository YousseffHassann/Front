import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileService } from '../../../Services/upload-file.service';

@Component({
  selector: 'ngx-inconsistent-sections',
  templateUrl: './inconsistent-sections.component.html',
  styleUrls: ['./inconsistent-sections.component.scss']
})
export class InconsistentSectionsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private uploadFileService: UploadFileService) { }


  mainNo:string
  finalData:any
  inConsistLanesNumber:any
  ngOnInit(): void {
    this.mainNo=this.data.mainNo
    this.getSectionsInAccessAndNotInSectionsTable()
    this.getSectionsWhereConsistLanesEqualZero()
  }

  getSectionsInAccessAndNotInSectionsTable(){
    this.uploadFileService.getSectionsInAccessAndNotInSectionsTable(this.mainNo).
    subscribe(res=>{
      console.log(res)
      this.finalData=res
    })
  }

  getSectionsWhereConsistLanesEqualZero(){
    this.uploadFileService.getSectionsWhereConsistLanesEqualZero(this.data.filename,localStorage.getItem("surveynumber")).
    subscribe(res=>{
      console.log(res)
      this.inConsistLanesNumber=res
    })
  }
}
