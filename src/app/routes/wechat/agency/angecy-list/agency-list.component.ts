import { Component, OnInit } from '@angular/core';
import { _HttpClient, TitleService } from '@delon/theme';
import { InfiniteLoaderComponent, TabDirective } from 'ngx-weui';
import { PageData, Pagination, RestResponse } from '../../../../dto';
import { Agency } from '../../../../model';
import { Trade } from '../../../../model/trade';

@Component({
  selector: 'app-angecy-list',
  templateUrl: './agency-list.component.html',
  styles: []
})
export class AgencyListComponent implements OnInit {
  restartBtn = false;
  pagination: Pagination = new Pagination();
  agencyList: Agency[];
  agencyCounts = new Array<number>(3);
  constructor(private titleService: TitleService,
              private http: _HttpClient) { }

  ngOnInit() {
    this.http.get<RestResponse<number[]>>(`/agency/count`).subscribe(res => {
      console.log(res);
      this.agencyCounts = res.result;
    });
  }
  select(tab: TabDirective, type?: number): void {
    this.titleService.setTitle(tab.heading);
    this.http.get<RestResponse<PageData<Agency[]>>>(`/agency/list`, {type: type}).subscribe(res => {
      console.log(res);
      this.agencyList = res.result.data;
      this.pagination = res.result.pagination;
    });

  }
  onLoadMore(comp: InfiniteLoaderComponent, type?: number) {
    this.restartBtn = false;
    this.http.get<RestResponse<PageData<Trade[]>>>(`/agency/list`,
      { pageNumber: this.pagination.pageNumber + 1,
        pageSize: this.pagination.pageSize, type: type}).subscribe(res => {
      this.agencyList = this.agencyList.concat(res.result.data);
      this.pagination = res.result.pagination;
      if (this.agencyList.length >= this.pagination.total) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

}
