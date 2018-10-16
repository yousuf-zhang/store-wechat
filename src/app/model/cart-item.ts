import { Product } from './product';

export class CartItem {
  products: Product[];
  totalCount: number;
  totalAmount: number;
  /**折扣价*/
  discountAmount: number;
  /**应付金额*/
  payableAmount: number;
  remark?: string;
}
