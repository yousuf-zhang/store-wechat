import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { AccountRoutingModule } from './account-routing.module';
import { AccountWithdrawComponent } from './account-withdraw/account-withdraw.component';


const COMPONENTS = [
  AccountPanelComponent,
  AccountDetailComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    AccountWithdrawComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AccountModule { }
