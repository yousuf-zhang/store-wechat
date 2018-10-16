import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { yuan } from '@delon/util';
import { RestResponse } from '../../../../dto';
import { Product } from '../../../../model';
import { PAY_STATUS, SHIP_STATUS } from '../../../../model/dictionary';
import { Trade } from '../../../../model/trade';

@Component({
  selector: 'app-trade-detail',
  templateUrl: './trade-detail.component.html',
  styles: []
})
export class TradeDetailComponent implements OnInit {
  trade: Trade = new Trade();
  goodsList: Product[] = [];
  payStatus = PAY_STATUS;
  shipStatus = SHIP_STATUS;
  yuan = yuan;
  constructor(private http: _HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const tradeNo = params.get('tradeNo');
      this.http.get<RestResponse<Trade>>(`/trade/detail/${tradeNo}`).subscribe(res => {
        this.trade = res.result;
        const goodsMap: Map<string, Product> = new Map<string, Product>();
        res.result.goodsList.forEach(value => {
          if (goodsMap.get(value.productNo)) {
            goodsMap.get(value.productNo).count += 1;
          } else {
            value.count = 1;
            goodsMap.set(value.productNo, value);
          }
        });
        goodsMap.forEach(value => this.goodsList.push(value));
      });
    });
  }

}
