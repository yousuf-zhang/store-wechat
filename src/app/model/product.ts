export class Product {
  // 产品编号
  productNo: string;
  // 产品名称
  productName: string;
  // 产品封面
  cover: string;
  // 零售价
  amount: number;
  // 会员价
  vipAmount: number;
  // 产品图片
  images?: string[];
  // 作用
  effect?: string;
  // 成分
  ingredient?: string;
  // 商品信息
  description: string;
  // 质检报告
  qualityReport?: string;
  // 数量
  count?: number;
}
