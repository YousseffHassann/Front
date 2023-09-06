import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SwserviceService } from '../../Services/swservice.service';
import { SurveyService } from '../../Services/survey.service';
import { LocalDataSource } from 'ng2-smart-table';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../PMMSComponents/smart-table-datepicker/smart-table-datepicker.component';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'ngx-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  settings = {

    // mode: "external",
    hideSubHeader: true,
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
      position: "right",
    },

    columns: {

      SURVEY_NO: {
        title: 'Survey Number ',
        type: 'string',
        editable: false,

      },
      DATE_FROM: {
        title: 'From',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '250px',
        filter: false,
        // sortDirection: 'ascending',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },
      // DATE_TO: {
      //   title: 'الى',
      //   type: 'datetime',
      // },
      DATE_TO: {
        title: 'To',
        type: 'custom',
        renderComponent: SmartTableDatepickerRenderComponent,
        width: '250px',
        filter: false,
        //sortDirection: 'desc',
        editor: {
          type: 'custom',
          component: SmartTableDatepickerComponent,
        }
      },



      CURRENT_SURVEY: {
        title: 'Current Survey ',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 1) { return '<p class="fa fa-check-circle"> Yes</p>'; }
          return '<p> No</p>';
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: '1', title: 'Yes' },
              { value: '0', title: 'No' }
            ],
          },
        }

        //    type: 'custom',
        // renderComponent: AppCustomCheckboxComponent,
        // width: '250px',
        // filter: false,

        //  // sortDirection: 'ascending',
        //  editor: {
        //   type: 'custom',      
        // renderComponent: AppCustomCheckboxComponent,
        //  }
      },

    },
  };
  dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('DATE_FROM');
    const end = control.get('DATE_TO');
    console.log("validators called");
    return start.value !== null && end.value !== null && start.value < end.value
      ? null : { dateValid: true };
  }


  registerationForm: FormGroup = new FormGroup({
    DATE_FROM: new FormControl(null,
      {
        validators: [Validators.required],
        asyncValidators: [this.surveyDateValidator()],
        updateOn: 'blur'
      }),
    DATE_TO: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [this.surveyDateValidator()],
      updateOn: 'blur'
    }),
    CURRENT_SURVEY: new FormControl(null, [Validators.required,]),


  }, { validators: this.dateValidator,
    asyncValidators: this.surveyDatesValidator()});
  clickupsdatedataformbufrombutton: any[] = [];


  checkAdd: boolean;


  constructor(private survey: SurveyService, private appcomp: AppComponent) { }

  surveyDatesValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const start = control.get('DATE_FROM');
      const end = control.get('DATE_TO');
      const currSurvey = control.get('CURRENT_SURVEY');
      // console.log("validators called")
      // const date = moment(control.value);
      // let formate = date.format('YYYY-MM-DD');
      return this.survey.AddSurveyDatesValidation({

        "DATE_FROM": start.value,
        "DATE_TO": end.value,
        "CURRENT_SURVEY": +currSurvey.value,
      }).pipe(
        map(res => {
          console.log(res);

          // if res is true, username exists, return true
          return res ? null : { error1: 'No matching symbol found' };
          // NB: Return null if there is no error
        })
      );
    };

  }
  surveyDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const date = moment(control.value);
      let formate = date.format('YYYY-MM-DD');
      return this.survey.GetSurveysFilteredDates(formate).pipe(
        map(res => {
          console.log(res);

          // if res is true, username exists, return true
          return res ? null : { error: 'No matching symbol found' };
          // NB: Return null if there is no error
        })
      );
    };

  }


  SubmitRegisteration(forminfo: FormGroup) {
    this.checkAdd = false;
    this.clickupsdatedataformbufrombutton = forminfo.value;


    this.survey.AddSurvey({

      "DATE_FROM": this.clickupsdatedataformbufrombutton['DATE_FROM'],
      "DATE_TO": this.clickupsdatedataformbufrombutton['DATE_TO'],
      "CURRENT_SURVEY": +this.clickupsdatedataformbufrombutton['CURRENT_SURVEY'],
    }).
      subscribe((res) => {
        console.log('Hi!!');

        console.log(res);
        if (res) {
          alert("Survey has been added successfully.");
        }
        this.GetSurvey();
      })
    forminfo.reset();
  }


  EditSurvey(event) {
    const date = moment(event.newData.DATE_FROM);
    let formate = date.format('YYYY-MM-DD');
    const date1 = moment(event.newData.DATE_TO);
    let formate1 = date1.format('YYYY-MM-DD');
    console.log(event.data);

    const surveyNo = event.data.SURVEY_NO;


        this.survey.GetSurveysFiltered(formate,formate1,surveyNo).
          subscribe((res) => {
            console.log('Hi!!');

            console.log(res);


                if (res) {

                  this.survey.UpdateSurvey({
                    "SURVEY_NO": +event.data.SURVEY_NO,
                    "DATE_FROM": formate,
                    "DATE_TO": formate1,
                    "CURRENT_SURVEY": +event.newData.CURRENT_SURVEY,
                  }).
                    subscribe((res) => {
                      console.log('Hi!!');

                      console.log(res);

                      if (res) {
                        alert(`Survey No: ${event.data.SURVEY_NO} has been updated`);
                      this.GetSurvey();

                      }
                      else {
                        alert(`You Entered an invalid Date.`);
                       
                        this.GetSurvey();
                      }
                    })
                  this.GetSurvey();
                }
                else {
                  alert(`You Entered an invalid Date.`);
                 
                  this.GetSurvey();
                }


              
          });



  };



  GetSurvey() {
    this.survey.GetSurvey().subscribe((res) => {
      this.checkAdd = false;

      this.source.load(res);
      this.source.refresh();
      console.log(this.source);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event.data.SURVEY_NO);

      this.survey.DeleteSurvey(event.data.SURVEY_NO).subscribe((res) => {
        console.log(res);
      });
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.GetSurvey();


  }
  openForm() {

    this.checkAdd = true;

  }
  Close(userForm: NgForm) {
    this.checkAdd = false;
    userForm.resetForm();

  }
}
