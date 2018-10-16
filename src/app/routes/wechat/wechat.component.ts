import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, SettingsService, TitleService } from '@delon/theme';
import { RestResponse } from '../../dto';
import { Agency, Product } from '../../model';

@Component({
  selector: 'app-wechat',
  templateUrl: './wechat.component.html',
  styles: []
})
export class WechatComponent implements OnInit {
  parentAgency: Agency;
  agency: Agency;
  qrCodeUrl: string;
  products: Product[];
  actives: boolean[] = [false, false, false, false];
  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              private http: _HttpClient,
              private settings: SettingsService,
              private location: Location) { }


  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
      switch (type) {
        case 'home':
          this.actives[0] = true;
          this.titleService.setTitle('首页');
          break;
        case 'qr-code':
          this.actives[1] = true;
          this.titleService.setTitle('二维码');
          break;
        case 'shopping-cart':
          this.actives[2] = true;
          this.titleService.setTitle('购物车');
          break;
        case 'personal-center':
          this.actives[3] = true;
          this.titleService.setTitle('个人中心');
          break;
        default:
          this.actives[0] = true;
          this.titleService.setTitle('首页');
      }
  }

  select(type): void {
    switch (type) {
      case 'home':
        this.titleService.setTitle('首页');
        this.location.replaceState('/wechat/home');
        this.findProducts();

        break;
      case 'qr-code':
        this.titleService.setTitle('二维码');
        this.location.replaceState('/wechat/qr-code');
        this.findQrCode();
        break;
      case 'shopping-cart':
        this.titleService.setTitle('购物车');
        this.location.replaceState('/wechat/shopping-cart');
        break;
      case 'personal-center':
        this.titleService.setTitle('个人中心');
        this.location.replaceState('/wechat/personal-center');
        this.findParent();
        this.findAgency();
        break;
      default:
        this.titleService.setTitle('首页');
        this.location.replaceState('/wechat/home');
        this.findProducts();
    }
  }

  findParent(): void {
    console.log(this.settings.user.parentId);
    this.http.get<RestResponse<Agency>>(`/wechat/parent-agency`, {'parentId': this.settings.user.parentId})
      .subscribe(res => {
        this.parentAgency = res.result;
        console.log(this.parentAgency);
      });
  }


  findAgency(): void {
    this.agency = {
      id: this.settings.user.id,
      name: this.settings.user.name,
      avatar: this.settings.user.avatar,
      level: this.settings.user.level
    };
  }

  findQrCode() {
    this.http.get<RestResponse<string>>(`/wechat/qr-code`, {'id': this.settings.user.id})
      .subscribe(res => {
        this.qrCodeUrl = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${decodeURIComponent(res.result)}`;
      });
  }

  findProducts(): void {
    this.http.get<RestResponse<Product[]>>('/product', null).subscribe(res => {
      this.products = res.result;
    });
  }
}
