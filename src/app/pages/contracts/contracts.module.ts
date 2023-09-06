import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbRouteTabsetModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ContractsRoutingModule, routedComponents } from './contracts-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AlertModule } from 'ngx-alerts';
import { ThemeModule } from '../../@theme/theme.module';
import { ContractorsComponent } from './contractors/contractors.component';
import { ContractsFormComponent } from './contracts-form/contracts-form.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from 'ngx-language-selector';
import { HttpClient } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    ThemeModule,
    ContractsRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),

    ReactiveFormsModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000}),
    NbTabsetModule,
    NbRouteTabsetModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    ...routedComponents,
    ContractorsComponent,
    ContractsFormComponent,
  ],
})
export class ContractsModule { }
