import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { toNumber, yuan } from '@delon/util';
import { MaskComponent } from 'ngx-weui';
import { RestResponse } from '../../../../dto';
import { PAY_STATUS } from '../../../../model/dictionary';
import { Trade } from '../../../../model/trade';
import { WechatJspay } from '../../../../model/wechat-jspay';
import { WechatServiceService } from '../../product/wechat-service.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styles: []
})
export class TradeComponent implements OnInit {
  yuan = yuan;
  @Input() trade: Trade;
  @Input() agencyFlag = true;
  @Output() payEmit = new EventEmitter<boolean>();
  goodsName: string[] = [];
  payStatus = PAY_STATUS;
  loading = false;
  @ViewChild('mask') mask: MaskComponent;
  @ViewChild('loadMask') loadMask: MaskComponent;

  constructor(private http: _HttpClient,
              private cache: CacheService,
              private router: Router,
              private wxService: WechatServiceService) { }

  ngOnInit() {
    this.goodsName = Array.from(new Set(this.trade.goodsList.map(value => value.productName)));
  }

  againCheckOut(payStatus: number) {
    this.mask.hide();
    this.loadMask.show();
    this.loading = true;
    if (payStatus === 1) {
      const againTrade: Trade = {
        name: this.trade.name,
        phone: this.trade.phone,
        province: this.trade.province,
        city: this.trade.city,
        country: this.trade.country,
        address: this.trade.address,
        goodsList: this.trade.goodsList,
        totalAmount: this.trade.totalAmount,
        totalCount: this.trade.totalCount,
        discountAmount: this.trade.discountAmount,
        payableAmount: this.trade.payableAmount,
        remark: this.trade.remark
      };
      this.http.post<RestResponse<WechatJspay>>(`/wechat/pay`, againTrade).subscribe( val => {
        this.loadMask.hide();
        if (val.result) {
          this.router.navigateByUrl(`/trade`);
          this.wxService.wxPay( {
            signType: 'MD5',
            paySign: val.result.paySign,
            timestamp: toNumber(val.result.timestamp),
            package: val.result.prepayId,
            nonceStr: val.result.nonceStr,
            success: res => {
              console.log(res);
            },
            cancle: res => {
              console.log(res);
            },
            fail: args => {
              console.log(args);
            },
            complete: args => {
              console.log(args);
              this.router.navigateByUrl(`trade/list`);
            }
          }).then(() => {

          }).catch((err: string) => {
            console.log(err);
          });
        }
      });
    } else {
      this.http.get<RestResponse<WechatJspay>>(`/wechat/pendingPay`, {tradeNo: this.trade.tradeNo}).subscribe( val => {
        this.loadMask.hide();
        if (val.result) {
          this.router.navigateByUrl(`/trade`);
          this.wxService.wxPay( {
            signType: 'MD5',
            paySign: val.result.paySign,
            timestamp: toNumber(val.result.timestamp),
            package: val.result.prepayId,
            nonceStr: val.result.nonceStr,
            success: res => {
              console.log(res);
            },
            cancle: res => {
              console.log(res);
            },
            fail: args => {
              console.log(args);
            },
            complete: args => {
              console.log(args);
              this.router.navigateByUrl(`trade/list`);
            }
          }).then(() => {

          }).catch((err: string) => {
            console.log(err);
          });
        }
      });
    }
  }
}
