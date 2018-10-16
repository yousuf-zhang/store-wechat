import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { InfiniteLoaderComponent } from 'ngx-weui';
import { PageData, Pagination, RestResponse } from '../../../../dto';
import { Trade } from '../../../../model/trade';

@Component({
  selector: 'app-agency-trade',
  templateUrl: './agency-trade.component.html',
  styles: []
})
export class AgencyTradeComponent implements OnInit {
  trades: Trade[] = [];
  restartBtn = false;
  pagination: Pagination = new Pagination();
  constructor(private http: _HttpClient) { }

  ngOnInit() {
    this.http.get<RestResponse<PageData<Trade[]>>>(`/trade/list`, {agencyFlag: 1}).subscribe(res => {
      if (res.result && res.result.data) {
        this.trades = res.result.data;
        this.pagination = res.result.pagination;
      }
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    this.http.get<RestResponse<PageData<Trade[]>>>(`/trade/list`,
      { pageNumber: this.pagination.pageNumber + 1,
        pageSize: this.pagination.pageSize, agencyFlag: 1}).subscribe(res => {
      this.trades = this.trades.concat(res.result.data);
      this.pagination = res.result.pagination;
      if (this.trades.length >= this.pagination.total) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }
}
