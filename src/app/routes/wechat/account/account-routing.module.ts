import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { AccountWithdrawComponent } from './account-withdraw/account-withdraw.component';


const routes: Routes = [
  {path: '', component: AccountPanelComponent, children: [
      {path: 'detail', component: AccountDetailComponent, data: {title: '收益管理'}},
      {path: 'withdraw', component: AccountWithdrawComponent, data: {title: '提现管理'}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
