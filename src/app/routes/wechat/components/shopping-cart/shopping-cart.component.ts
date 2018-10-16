import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { SettingsService } from '@delon/theme';
import { yuan } from '@delon/util';
import { Product } from '../../../../model';
import { CartItem } from '../../../../model/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {
  data: CartItem;
  yuan = yuan;
  constructor(private cache: CacheService,
              private router: Router,
              private settings: SettingsService) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.data = this.cache.getNone('shopCart');
    if (this.data) {
      this.calculateData();
    }
  }


  goHome(): void {
    this.router.navigateByUrl(`/wechat/home`);
  }

  changeData(item: Product, add: number) {
    this.data.products.forEach(value => {
      if (value.productNo === item.productNo) {
        value.count = add;
      }
    });
    this.calculateData();
    this.cache.set('shopCart', this.data);
  }

  removeItem(item): void {
    const products: Product[] = this.data.products.filter(value => value.productNo !== item.productNo);
    if (products.length === 0) {
      this.data = null;
      this.cache.remove('shopCart');
    } else {
      this.data.products = products;
      this.calculateData();
    }
  }


  goCheckOut(): void {
    if (!this.settings.user.telephone) {
      this.router.navigateByUrl(`/agency/edit`);
    } else {
      this.router.navigateByUrl(`/product/check-out`);
    }
  }

  /**
   * 计算商品数量和金额
   */
  calculateData() {
    this.data.totalCount = 0;
    this.data.totalAmount = 0;
    this.data.payableAmount = 0;
    this.data.products.forEach(product => {
      this.data.totalAmount += product.amount * product.count;
      this.data.totalCount += product.count;
      this.data.payableAmount += product.vipAmount * product.count;
    });
    if (this.settings.user.level !== 0 || this.data.totalAmount > 300 ) {
      this.data.discountAmount = this.data.payableAmount - this.data.totalAmount;
    } else {
      this.data.payableAmount = this.data.totalAmount;
      this.data.discountAmount = 0;
    }
    this.cache.set('shopCart', this.data);
  }
}
