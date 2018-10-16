export class WechatJspay {
  appId: string;
  timestamp: string;
  // 支付签名随机串，不长于 32 位
  nonceStr: string;
  // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
  prepayId: string;
  // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  signType: string;
  // 支付签名
  paySign: string;
}
