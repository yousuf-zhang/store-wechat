import { Component, OnInit } from '@angular/core';
import { yuan } from '@delon/util';
import { CartItem } from '../../../../model/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: []
})
export class ShoppingCartComponent implements OnInit {
  data: CartItem[];
  yuan = yuan;
  constructor() { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.data = new Array(5).fill({}).map((i, index) => {
      return {
        href: 'http://ant.design',
        productNo: `rxr-10-100 ${index}`,
        productName: 'product',
        count: index,
        amount: 12.24,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
      };
    });
  }

}
