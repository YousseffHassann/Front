import { Component, OnInit } from '@angular/core';
import { general_settingsService } from '../general_settings.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'ngx-update-settings',
  templateUrl: './update-settings.component.html',
  styleUrls: ['./update-settings.component.scss']
})
export class UpdateSettingsComponent implements OnInit {

  constructor(public ge: general_settingsService) { }

  ngOnInit(): void {
    this.ge.MdSetting = {
      RECORD_ID: null,
      GMAINT_DEC_ID: null,
      RECOMMENDED_DECISION: null,
      LIMIT_RATIO: null,
      MAINT_DEC_ID: null,
      STREET_TYPE: null,
      STREET_TYPE_NAME: null
    }
  }
  submit() {

  }
}
