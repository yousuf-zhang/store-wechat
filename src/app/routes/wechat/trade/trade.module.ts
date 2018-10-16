import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TradeRoutingModule } from './trade-routing.module';
import { TradeListComponent } from './trade-list/trade-list.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { TradeComponent } from './trade/trade.component';
import { AgencyTradeComponent } from './agency-trade/agency-trade.component';
import { TradeDetailComponent } from './trade-detail/trade-detail.component';

const COMPONENTS = [
  TradeListComponent,
  TradePanelComponent,
  AgencyTradeComponent,
  TradeDetailComponent
];
const COMPONENTS_NOROUNT = [
  TradeComponent
];

@NgModule({
  imports: [
    SharedModule,
    TradeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TradeModule { }
