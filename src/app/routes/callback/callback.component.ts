import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from '@delon/auth';
import { _HttpClient, SettingsService } from '@delon/theme';
import { RestResponse } from '../../dto';
import { Agency } from '../../model';

@Component({
  selector: 'app-callback',
  template: ``,
  providers: [SocialService],
})
export class CallbackComponent implements OnInit {

  constructor(
    private socialService: SocialService,
    private route: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private settings: SettingsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      switch (type) {
        case 'wechat-code':
          this.login();
          this.location.replaceState('/wechat/home');
          break;
      }
    });

  }

  login(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');
      this.http.get<RestResponse<Agency>>('/wechat/auth/login', { 'code': code}).subscribe(
        res => {
          this.socialService.callback({
            token: res.result.token,
            time: +new Date(),
          });

          this.settings.setUser({
            name: res.result.name,
            id: res.result.id,
            avatar: res.result.avatar,
            parentId: res.result.parentId,
            level: res.result.level,
            telephone: res.result.telephone
          });
        }, err => console.log(err)
      );
    });

  }
}
