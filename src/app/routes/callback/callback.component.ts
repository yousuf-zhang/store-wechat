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
  type: string;

  constructor(
    private socialService: SocialService,
    private route: ActivatedRoute,
    private router: Router,
    private http: _HttpClient,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log(this.type);
    switch (this.type) {
      case 'wechat-code':
        const code = this.route.snapshot.queryParamMap.get('code');
        this.http.get<RestResponse<Agency>>('/wechat/auth/login', { 'code': code}).subscribe(
          res => {
            console.log(res);
            this.socialService.callback({
              token: res.result.token,
              time: +new Date(),
            });

            this.settings.setUser({
              name: res.result.name,
              id: res.result.id,
              avatar: res.result.avatar,
              parentId: res.result.parentId
            });
          }, err => console.log(err)
        );
        break;
    }
  }
}
