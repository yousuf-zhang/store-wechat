import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { yuan } from '@delon/util';
import { RestResponse } from '../../../../dto';
import { Product } from '../../../../model';
import { CartItem } from '../../../../model/cart-item';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html'
})
export class ProductInfoComponent implements OnInit {
  yuan = yuan;
  product: Product;

  constructor(private route: ActivatedRoute,
              private http: _HttpClient,
              private cache: CacheService,
              private router: Router) { }

  ngOnInit() {
    this.findProductByProductNo();
  }

  findProductByProductNo(): void {
    this.route.paramMap.subscribe(params => {
      const productNo = params.get('productNo');
      this.http.get<RestResponse<Product>>(`/product/${productNo}`)
        .subscribe(res => {
          this.product = res.result;
          this.product.count = 1;
        });
    });
  }

  addShoppingCart(): void {
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
