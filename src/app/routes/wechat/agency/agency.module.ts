import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { AngecyListComponent } from './angecy-list/angecy-list.component';

const COMPONENTS = [
  AgencyComponent,
  AngecyListComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AgencyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AgencyModule { }
