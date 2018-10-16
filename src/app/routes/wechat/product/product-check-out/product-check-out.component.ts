import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { toNumber, yuan } from '@delon/util';
import { MaskComponent, ToptipsService } from 'ngx-weui';
import { RestResponse } from '../../../../dto';
import { Product } from '../../../../model';
import { Address } from '../../../../model/address';
import { CartItem } from '../../../../model/cart-item';
import { Trade } from '../../../../model/trade';
import { WechatJspay } from '../../../../model/wechat-jspay';
import { WechatServiceService } from '../wechat-service.service';

@Component({
  selector: 'app-product-check-out',
  templateUrl: './product-check-out.component.html',
  styles: []
})
export class ProductCheckOutComponent implements OnInit {
  data: CartItem;
  address: Address = new Address();
  addAddress = false;
  showAddress = false;
  loading = false;
  yuan = yuan;

  @ViewChild('mask') mask: MaskComponent;
  @ViewChild('loadMask') loadMask: MaskComponent;

  constructor(private http: _HttpClient,
              private cache: CacheService,
              private router: Router,
              private wxService: WechatServiceService,
              private route: ActivatedRoute,
              private srv: ToptipsService) { }

  ngOnInit() {
    this.data = this.cache.getNone('shopCart');
    if (!this.data) {
      this.router.navigateByUrl(`/wechat/home`);
    } else {
      this.getAddress();
    }
  }

  getAddress(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log(params);
      const id = params.get('id');
      if (id) {
        this.http.get<RestResponse<Address>>(`/address/${id}`).subscribe(res => {
          if (res.result) {
            this.address = res.result;
            this.showAddress = true;
          } else {
            this.addAddress = true;
          }
        });
      } else {
        this.http.get<RestResponse<Address>>(`/address`).subscribe(res => {
          if (res.result) {
            this.address = res.result;
            this.showAddress = true;
          } else {
            this.addAddress = true;
          }
        });
      }
    });
  }

  getNewAddress(address: Address) {
    this.address = address;
    this.showAddress = true;
    this.addAddress = false;
  }

  pay() {
    if (this.addAddress) {
      this.srv['warn']('收货信息未提交');
      return;
    }
    const goodsList: Product[] = [];
    this.data.products.forEach(value => {
      for (let i = 0; i < value.count; i++) {
        goodsList.push(value);
      }
    });
    const trade: Trade = {
      name: this.address.name,
      phone: this.address.phone,
      province: this.address.province,
      city: this.address.city,
      country: this.address.country,
      address: this.address.address,
      goodsList: goodsList,
      totalAmount: this.data.totalAmount,
      totalCount: this.data.totalCount,
      discountAmount: this.data.discountAmount,
      payableAmount: this.data.payableAmount,
      remark: this.data.remark
    };
    this.mask.hide();
    this.loadMask.show();
    this.loading = true;
    this.http.post<RestResponse<WechatJspay>>(`/wechat/pay`, trade).subscribe( val => {
      this.loadMask.hide();
      if (val.result) {
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
            this.cache.remove('shopCart');
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
