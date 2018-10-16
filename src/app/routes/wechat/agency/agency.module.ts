import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';
import { AgencyPanelComponent } from './agency-panel.component';
import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency/agency.component';
import { AgencyListComponent } from './angecy-list/agency-list.component';
import { AgencyEditComponent } from './agency-edit/agency-edit.component';

const COMPONENTS = [
  AgencyComponent,
  AgencyListComponent,
  AgencyDetailComponent,
  AgencyPanelComponent,
  AgencyEditComponent

];
const COMPONENTS_NOROUNT = [
  AgencyComponent
];

@NgModule({
  imports: [
    SharedModule,
    AgencyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT

  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AgencyModule { }
