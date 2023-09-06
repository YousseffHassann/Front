import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-insert-model',
  templateUrl: './insert-model.component.html',
  styleUrls: ['./insert-model.component.scss']
})
export class InsertModelComponent {
  constructor(public windowRef: NbWindowRef, public formbulider: FormBuilder) { }

  
  close() {
    this.windowRef.close();
  }
  insertbudget() {
  }
}
