import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, TitleService } from '@delon/theme';
import { InfiniteLoaderComponent, TabDirective } from 'ngx-weui';
import { PageData, Pagination, RestResponse } from '../../../../dto';
import { Trade } from '../../../../model/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styles: []
})
export class TradeListComponent implements OnInit {
  @ViewChild(InfiniteLoaderComponent) il;
  trades: Trade[] = [];
  restartBtn = false;
  pagination: Pagination = new Pagination();
  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              private http: _HttpClient) { }

  ngOnInit() {
  }

  select(tab: TabDirective, payStatus?: number): void {
    this.titleService.setTitle(tab.heading);
    this.getTradeList(payStatus);
  }
  getTradeList(payStatus: number) {
    this.http.get<RestResponse<PageData<Trade[]>>>(`/trade/list`, {payStatus: payStatus}).subscribe(res => {
      if (res.result.data) {
        this.trades = res.result.data;
      }
      this.pagination = res.result.pagination;
    });
  }
  onLoadMore(comp: InfiniteLoaderComponent, payStatus?: number) {
    this.restartBtn = false;
    this.http.get<RestResponse<PageData<Trade[]>>>(`/trade/list`,
    { pageNumber: this.pagination.pageNumber + 1,
      pageSize: this.pagination.pageSize, payStatus: payStatus}).subscribe(res => {
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
