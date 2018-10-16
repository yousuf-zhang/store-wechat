import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { JWeiXinService } from 'ngx-weui';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestResponse } from '../../../dto';
import { WechatConfig } from '../../../model/wechat-config';

declare const wx: any;

@Injectable({
  providedIn: 'root'
})
export class WechatServiceService {
  constructor(private wxService: JWeiXinService, private http: _HttpClient) { }
  private share: any;
  wxPay(payDate: any): Promise<boolean> {
    this.share = payDate;
    console.log(this.share);
    return new Promise((resolve, reject) => {
      this.wxService.get().then(res => {
        if (!res) {
          reject('jweixin.js 加载失败');
          return;
        }
        wx.ready(() => {
          wx.chooseWXPay(this.share);
          resolve();
        });
        wx.error(() => {
          reject('config 注册失败');
        });

        this.http.get<RestResponse<WechatConfig>>('/wechat/config')
          .pipe(
            catchError((error: Response | any) => {
              reject('无法获取签名数据');
              return Observable.throw('error');
            }),
          ).subscribe(config => {
            if (!config) {
              reject('jsapi 获取失败');
              return;
            }
            config.result.debug = false;
            config.result.jsApiList = ['chooseWXPay'];
            wx.config(config.result);
          });
      });
    });
  }
}
