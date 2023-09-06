import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractsComponent } from "./contracts.component";
import { ContractorsComponent } from "./contractors/contractors.component";
import { ContractsFormComponent } from "./contracts-form/contracts-form.component";
//import { ContractorsComponent } from "../../contracts/contractors/contractors.component";

const routes: Routes = [{
  path: '',
  component: ContractsComponent,
  children: [
    {
      path: 'contractors',
      component: ContractorsComponent,
    },
    {
      path: 'contracts-form',
      component: ContractsFormComponent,
    },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule { }

export const routedComponents = [
  ContractsComponent,
  ContractorsComponent,
  ContractsFormComponent,
];
