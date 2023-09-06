
import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms'
import { contractorService } from "../Contractor.service";
import { LocalDataSource } from "ng2-smart-table";
import { AlertService } from 'ngx-alerts'
import { SmartTableData } from "../../../../@core/data/smart-table";
import { HttpErrorResponse } from '@angular/common/http';
import { InsertModelComponent } from '../../Contractors/insert-model/insert-model.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-contractors-list',
  templateUrl: './contractors-list.component.html',
  styleUrls: ['./contractors-list.component.scss']
})
export class ContractorsListComponent implements OnInit {
  // settings1 = {
  //   //hideSubHeader: true,

  //   mode: "external",
  //   actions: {
  //     delete: false,
  //     edit: false,
  //     add: false,
  //     position: "right",
  //   },
  //   columns: {

  //   },
  // };
  settings1: Object;

  source1: LocalDataSource = new LocalDataSource();

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  visitors: string[] = [];
  modalRef: BsModalRef;

  constructor(private alertService: AlertService, private modalService: BsModalService, private contractor: contractorService, private windowService: NbWindowService, public formbulider: FormBuilder) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  insert = this.formbulider.group({
    CONTRACTOR_NAME: [''],
    DESCRIPTION: [''],
    MOBILE: [''],
    CONTRACTOR_NO: [''],
    FAX: [''],
    PHONE: [''],
    EMAIL: [''],

  });

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }

  openWindowForm() {
    const windowRef = this.windowService.open(InsertModelComponent, { title: `Add Contractor` });

  }
  async insertbudget() {



    await this.contractor.InsertContractor(this.insert.value).subscribe(
      res => {
        if (res.toString() != 'false') {
          this.alertService.info('تم اضافه البيان بنجاح');

          this.modalRef.hide();
          this.getData();

        }


      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.alertService.info('يوجد مشكلة في الادخال ');
        } else {

          this.alertService.info('يوجد مشكله للوصول للقاعدةالبيانات ');
        }
      });


    //await this.insert.reset({ YEAR_OF_BUDGET: [] });
    //await this.insert.reset({ BUDGET: [] });
    // this.insert.controls.BUDGET.setValue('');
    // this.insert.controls.YEAR_OF_BUDGET.setValue('');


  }
  getData() {
    this.contractor.Get_Contractor
      ()
      .subscribe((data) => {
        this.source1.empty;
        this.source1.refresh;
        this.source1.load(data);
        this.settings1 = this.loadTableSettings();

      });
  }
  loadTableSettings() {
    return {
      add: {
        addButtonContent: '',
        createButtonContent: '',
        cancelButtonContent: '',
        confirmCreate: true,

      },
      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="ion-trash-a"></i>',
        confirmDelete: true
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
        CONTRACTOR_ID: {
          title: "CONTRACTOR_ID ",
          type: "string",
        },
        EMAIL: {
          title: "EMAIL",
          type: "string",
        },
        PHONE: {
          title: "PHONE",
          type: "string",
        },

        FAX: {
          title: "FAX",
          type: "string",
        }
        ,

        CONTRACTOR_NO: {
          title: "CONTRACTOR_NO",
          type: "string",
        },

        DESCRIPTION: {
          title: "DESCRIPTION ",
          type: "string",
        },

        CONTRACTOR_NAME: {
          title: "CONTRACTOR_NAME ",
          type: "string",
        }

      },
    };
  }
  updateRecord(event) {
    console.log(event);
    var data = {
      "CONTRACTOR_NAME": event.newData.CONTRACTOR_NAME,
      "DESCRIPTION": event.newData.DESCRIPTION,
      "MOBILE": event.newData.MOBILE,
      "CONTRACTOR_NO": event.newData.CONTRACTOR_NO,
      "PHONE": event.newData.PHONE,
      "EMAIL": event.newData.EMAIL,
      "CONTRACTOR_ID": event.newData.CONTRACTOR_ID,



      "FAX": event.newData.FAX
    };


    event.confirm.resolve(event.newData);
    this.contractor.UpdateContractor(data);
    this.alertService.info('تم التعديل بنجاح');

  }


  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event.data.EMAIL);

    if (window.confirm('Are you sure you want to delete?')) {


      this.contractor.DeleteCONTRACTOR
        (event.data.CONTRACTOR_ID).subscribe();

      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }
  ngOnInit(): void {
    this.getData();

  }

}
