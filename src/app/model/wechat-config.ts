export class WechatConfig {
  debug: boolean;
  /** 必填，公众号的唯一标识 */
  appId: string;
  /** 必填，生成签名的时间戳 */
  timestamp: number;
  /** 必填，生成签名的随机串 */
  nonceStr: string;
  /** 必填，签名，见附录1 */
  signature: string;
  jsApiList: string[];
}
