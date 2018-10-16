import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyEditComponent } from './agency-edit/agency-edit.component';
import { AgencyPanelComponent } from './agency-panel.component';
import { AgencyListComponent } from './angecy-list/agency-list.component';

const routes: Routes = [
  { path: '',
    component: AgencyPanelComponent,
    children: [
      {path: 'list', component: AgencyListComponent, data: {title: '会员列表'}},
      {path: 'edit', component: AgencyEditComponent, data: {title: '会员设置'}}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
