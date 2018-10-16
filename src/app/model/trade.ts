import { Agency } from './agency';
import { Product } from './product';

export class Trade {
  name: string;
  phone: string;
  province: string;
  city: string;
  /**区*/
  country: string;
  /**详细地址*/
  address: string;
  goodsList: Product[];
  totalAmount: number;
  totalCount: number;
  /**折扣价*/
  discountAmount: number;
  /**应付金额*/
  payableAmount: number;
  remark: string;

  payStatus?: number;
  /**订单号*/
  tradeNo?: string;
  bankType?: string;
  transactionId?: string;
  /**支付完成时间*/
  payEndTime?: string;
  agency?: Agency;
  createTime?: Date;

  /**物流单号*/
  trackingNo?: string;
  /**物流公司*/
  trackingName?: string;
  shipStatus?: number;

}
