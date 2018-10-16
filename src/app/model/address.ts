export class Address {
  id?: number;
  name: string;
  phone: string;
  /**省*/
  province: string;
  /**市*/
  city: string;
  /**区*/
  country: string;
  cityCode: string;
  /**详细地址*/
  address: string;
  /**是否是默认地址*/
  status: boolean|number;
}
