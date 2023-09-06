import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { UserServices } from '../user.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error = null;
  constructor(private userServices: UserServices, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.userServices.logIn(email, password,).subscribe(resData => {
      console.log(resData);
      this.error = null;
      this.isLoading = false;
      this.router.navigate(['/pages/assets-management/Welcome'])
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
