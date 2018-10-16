import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, SettingsService } from '@delon/theme';
import { yuan } from '@delon/util';
import { ChartG2Directive } from 'ngx-weui';
import { RestResponse } from '../../../../dto';
import { Agency } from '../../../../model';
import { Wallet } from '../../../../model/wallet';
import { WalletInfo } from '../../../../model/wallet-info';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styles: []
})
export class AccountDetailComponent implements OnInit, AfterViewInit {
  agency: Agency;
  yuan = yuan;
  wallet: WalletInfo = {
    digitalWallet: new Wallet(),
    tradeAmount: new Array<number>(6),
    thirdTradeAmount: new Array<number>(2),
    firstTradeAmount: new Array<number>(2),
    secondTradeAmount: new Array<number>(2)
  };
  @ViewChild('chart') chart: ChartG2Directive;
  constructor(private settings: SettingsService,
              private http: _HttpClient) { }

  ngOnInit() {
    this.agency = {
      id: this.settings.user.id,
      name: this.settings.user.name,
      avatar: this.settings.user.avatar
    };
    this.getWalletInfo();
  }

  ngAfterViewInit(): void {
    console.log(this.wallet.tradeAmount);
    this.render();
  }


  render() {
    this.http.get<RestResponse<number[]>>(`/wallet/semiannual/trade-amount`,
      {agencyId: this.agency.id}).subscribe(res => {
      const tradeAmount = res.result;
      const data = [
        { 'month': this.monthStr(5), 'tem': tradeAmount[5], 'city': this.agency.name },
        { 'month': this.monthStr(4), 'tem': tradeAmount[4], 'city': this.agency.name },
        { 'month': this.monthStr(3), 'tem': tradeAmount[3], 'city': this.agency.name },
        { 'month': this.monthStr(2), 'tem': tradeAmount[2], 'city': this.agency.name },
        { 'month': this.monthStr(1), 'tem': tradeAmount[1], 'city': this.agency.name },
        { 'month': this.monthStr(), 'tem': tradeAmount[0], 'city': this.agency.name }
      ];
      const defs = {
        time: {
          tickCount: 6,
          range: [0, 1]
        },
        tem: {
          tickCount: 5,
          min: 0
        }
      };
      // 配置time刻度文字样式
      const label = {
        fill: '#979797',
        font: '14px san-serif',
        offset: 6
      };

      const Util = this.chart.GM.Util;
      this.chart.chart.axis('month', {
        label: function (text, index, total) {
          const cfg = Util.mix({}, label);
          // 第一个点左对齐，最后一个点右对齐，其余居中，只有一个点时左对齐
          if (index === 0) {
            cfg.textAlign = 'start';
          }
          if (index > 0 && index === total - 1) {
            cfg.textAlign = 'end';
          }
          return cfg;
        }
      });
      this.chart.chart.axis('tem', {
        label: {
          fontSize: 14
        }
      });
      this.chart.chart.source(data, defs);
      this.chart.chart.line().position('month*tem').color('city').shape('smooth');
      this.chart.chart.render();
    });

  }

  getWalletInfo() {
    this.http.get<RestResponse<WalletInfo>>(`/wallet/show/detail`, {agencyId: this.agency.id}).subscribe(res => {
      this.wallet = res.result;
    });
  }

  private monthStr(month?: number): string {
    const date = new Date();
    if (month) {
      date.setMonth(date.getMonth() - month);
    }
    return date.getMonth() + 1 + '月';
  }

}
