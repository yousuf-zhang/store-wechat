import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyTradeComponent } from './agency-trade/agency-trade.component';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';
import { TradeListComponent } from './trade-list/trade-list.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';

const routes: Routes = [
  {path: '', component: TradePanelComponent, children: [
      {path: 'list', component: TradeListComponent, data: {title: '订单列表'}},
      {path: 'agency/list', component: AgencyTradeComponent, data: {title: '会员订单'}},
      {path: 'detail/:tradeNo', component: TradeDetailComponent, data: {title: '订单详情'}}
  ]},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }
