import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { yuan } from '@delon/util';
import { DialogConfig, DialogService, InfiniteLoaderComponent, ToptipsComponent, ToptipsService } from 'ngx-weui';
import { PageData, Pagination, RestResponse } from '../../../../dto';
import { WITHDRAW_STATUS } from '../../../../model/dictionary';
import { Wallet } from '../../../../model/wallet';
import { Withdraw } from '../../../../model/withdraw';

@Component({
  selector: 'app-account-withdraw',
  templateUrl: './account-withdraw.component.html',
  styles: []
})
export class AccountWithdrawComponent implements OnInit {
  yuan = yuan;
  withdrawStatus = WITHDRAW_STATUS;
  digitalWallet = new Wallet();
  withdrawalAmount: number;
  restartBtn = false;
  pagination: Pagination = new Pagination();
  withdrawList: Withdraw[];
  @ViewChild('toptips') toptips: ToptipsComponent;
  constructor(private http: _HttpClient,
              private toptipsService: ToptipsService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.http.get<RestResponse<Wallet>>(`/wallet/info`).subscribe(res => {
      this.digitalWallet = res.result;
    });
    this.getWithdraw();

  }

  onSave() {
    if (this.withdrawalAmount <= 0 || this.withdrawalAmount > this.digitalWallet.balance) {
      this.toptipsService['warn']('提现金额错误');
      return;
    }
    this.showDialog();
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    this.http.get<RestResponse<PageData<Withdraw[]>>>(`/wallet/withdraw/list`,
      { pageNumber: this.pagination.pageNumber + 1,
        pageSize: this.pagination.pageSize}).subscribe(res => {
      this.withdrawList = this.withdrawList.concat(res.result.data);
      this.pagination = res.result.pagination;
      if (this.withdrawList.length >= this.pagination.total) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

  getWithdraw() {
    this.http.get<RestResponse<PageData<Withdraw[]>>>(`/wallet/withdraw/list`).subscribe(res => {
      this.withdrawList = res.result.data;
      this.pagination = res.result.pagination;
    });
  }

  showDialog() {
    this.dialogService.show(<DialogConfig> {
      title: '提现确认',
      content: `提现金额为: ${this.withdrawalAmount}`,
      cancel: '取消',
      confirm: '确认',
      skin: 'auto',
    }).subscribe(res => {
      alert(res);
    });
    return false;
  }
}
