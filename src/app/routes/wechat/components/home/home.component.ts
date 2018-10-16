import { Component, Input, OnInit } from '@angular/core';
import { CacheService } from '@delon/cache';
import { yuan } from '@delon/util';
import { Router } from '@angular/router';

import { Product } from '../../../../model';
import { CartItem } from '../../../../model/cart-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  yuan = yuan;

  @Input() products: Product[];
  product: Product;
  constructor(private router: Router,
              private cache: CacheService) { }

  ngOnInit() {
  }

  findProductByProductNo(productNo: string) {
    this.router.navigateByUrl(`/product/${productNo}`);
  }

  addShoppingCart(productNo: string): void {
    this.products.forEach(pro => {
        if (pro.productNo === productNo) {
          this.product = pro;
        }
    });
    let cartItem: CartItem = this.cache.getNone('shopCart');
    try {
      if (cartItem == null) {
        cartItem = {
          products: [this.product],
          totalCount: 1,
          totalAmount: this.product.amount,
          discountAmount: 0,
          payableAmount: this.product.amount
        };

      } else {
        cartItem.products.map(value => {
          if (value.productNo === this.product.productNo) {
            value.count += 1 ;
          } else {
            cartItem.products.push(this.product);
          }
        });
      }
      this.cache.set('shopCart', cartItem);
      this.router.navigateByUrl(`/wechat/shopping-cart`);
    } catch (e) {
      console.log(e);
      this.cache.remove('shopCart');
    }
  }
}
