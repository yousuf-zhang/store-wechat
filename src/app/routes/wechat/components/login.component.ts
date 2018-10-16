import { Component, OnInit } from '@angular/core';
import { SocialService } from '@delon/auth';
import { CacheService } from '@delon/cache';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  template: ``,
  providers: [ SocialService ]
})
export class LoginComponent implements OnInit {

  constructor(private socialService: SocialService,
              private cache: CacheService) {}

  ngOnInit() {
    const callback = `${environment.CLIENT_URL}/callback/wechat-code`;
    // const callback = `${environment.SERVER_URL}/wechat/auth/code`;
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd8a4a8b67963cf9&redirect_uri=${decodeURIComponent(
      callback,
    )}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
    // const url =  `${environment.SERVER_URL}/wechat/auth/code?redirect_uri=${decodeURIComponent(
    //   callback,
    // )}`;

    this.socialService.login(url, `${this.cache.getNone('redirectUri')}`, {
      type: 'href',
    });
  }

}
