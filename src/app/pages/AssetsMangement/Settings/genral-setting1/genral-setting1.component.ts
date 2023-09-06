import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { general_settingsService } from "../general_settings.service";

@Component({
  template: `
<label> {{ selectedOption }}</label>

 `,
})
export class GenralSetting1Component implements OnInit {
  selectedOption: any;






  options: Array<{ value: any, label: string }> = [
    { value: 0, label: 'select' },

  ];
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  constructor(public general_settingsService: general_settingsService) {

  }
  ngOnInit() {
    this.selectedOption = this.rowData.RECOMMENDED_DECISION
      ;
   
    this.general_settingsService.GetMAINT_DECISIONS_PCI
      ()
      .subscribe((data) => {

        data.forEach(e => {

          this.options.push({
            value: e.RECOMMENDED_DECISION_ID, label: e.RECOMMENDED_DECISION

          }
          );


        }

        );



        // for (let o of data) {
        //   this.select.push({
        //     value: o.RECOMMENDED_DECISION_ID, title: o.RECOMMENDED_DECISION
        //   });

        // }

      });









  }

 
  public getValue() {
    return this.selectedOption;
  }
  updateSelectedOption(event) {
    this.selectedOption = event.target.value;
  }
  public setValue(value: any) {
    this.selectedOption = value;
  }

  public onBlur() { }

}
