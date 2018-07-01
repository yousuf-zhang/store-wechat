import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { AngecyListComponent } from './angecy-list/angecy-list.component';

const routes: Routes = [
  { path: '',
    component: AgencyComponent,
    children: [
      {path: '', component: AngecyListComponent}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
