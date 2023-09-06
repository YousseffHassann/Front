import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from '../user.service';

@Component({
  selector: 'ngx-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  constructor(private userServices: UserServices) { }
  ngOnInit(): void {
  }
  isLoading = false;
  error = null;
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    const firstName = form.value.firstName;
    const middleName = form.value.middleName;
    const lastName = form.value.lastName;
    const source = form.value.source;
    const roleId = form.value.roleId;
    const pubId = form.value.pubId;
    const hireDate = form.value.hireDate;
    this.userServices.createAccount(email, password, source, firstName, middleName, lastName, roleId, pubId, hireDate).subscribe(resData => {
      console.log(resData);
      this.error = null;
      this.isLoading = false;

    },
      errorResponse => {
        console.log(errorResponse);
        this.error = errorResponse.error
        this.isLoading = false;
      });
    this.isLoading = true;
    form.reset();
  }
}
