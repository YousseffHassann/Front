import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { UserServices } from '../user.service';

@Component({
  selector: 'ngx-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent {

  serverSource: ServerDataSource;
  source: LocalDataSource;
  data = []
  constructor(private userServices: UserServices, http: HttpClient) {
    this.userServices.getUsers().subscribe(
      resData => {
        console.log("Data wasle");
        console.log(resData)
        for (const key in resData) {
          this.data.push(resData[key]);
        }
        this.source = new LocalDataSource(this.data)
      }
    );
  }

  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to edit this field?')) {
      event.confirm.resolve();

      this.userServices.editAccount(event.newData).subscribe(
        resData => {
          console.log(resData);
        }
      );
    } else {
      event.confirm.reject();

    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event.data["userId"]);
      this.userServices.deleteUser(event.data["userId"]).subscribe(
        resData => {
          console.log(resData);
        }
      );
    } else {
      event.confirm.reject();
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
      columnTitle: ""
    },

    columns: {
      userId: {
        title: 'معرف المستخدم',
        filter: true,
        editable: false,
      },
      emailAddress: {
        title: 'عنوان البريد الإلكتروني',
        filter: true,

      },
      firstName: {
        title: 'الاسم الأول',
        filter: true
      },
      middleName: {
        title: 'الاسم الأوسط',
        filter: true
      },
      lastName: {
        title: 'الكنية',
        filter: true
      },
      source: {
        title: 'مصدر',
        filter: true
      },
      roleId: {
        title: 'معرف الدور',
        filter: true,
        type: "number"
      },
      pubId: {
        title: 'معرّف الناشر',
        filter: true,


      },
      hireDate: {
        title: ' موعد التوظيف',
        filter: true,
      },

    }
  };


  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'userId',
        search: query
      },
      {
        field: 'emailAddress',
        search: query
      },
      {
        field: 'firstName',
        search: query
      },
      {
        field: 'middleName',
        search: query
      },
      {
        field: 'lastName',
        search: query
      },
      {
        field: 'source',
        search: query
      },
      {
        field: 'roleId',
        search: query
      },
      {
        field: 'pubId',
        search: query
      },
      {
        field: 'hireDate',
        search: query
      },

    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
