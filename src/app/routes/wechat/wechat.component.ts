import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, SettingsService, TitleService } from '@delon/theme';
import { TabbarComponent } from 'ngx-weui';
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
  constructor(private route: ActivatedRoute,
              private titleService: TitleService,
              private http: _HttpClient,
              private settings: SettingsService) { }

  @ViewChild(TabbarComponent) tabbar: TabbarComponent;
  actives: boolean[] = [false, false, false, false];

  ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
      switch (type) {
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
      case 'qr-code':
        this.titleService.setTitle('二维码');
        this.findQrCode();
        break;
      case 'shopping-cart':
        this.titleService.setTitle('购物车');
        break;
      case 'personal-center':
        this.titleService.setTitle('个人中心');
        this.findParent();
        this.findAgency();
        break;
      default:
        this.titleService.setTitle('首页');
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
      avatar: this.settings.user.avatar
    };
  }

  findQrCode() {
    this.http.get<RestResponse<string>>(`/wechat/qr-code`, {'id': this.settings.user.id})
      .subscribe(res => {
        this.qrCodeUrl = res.result;
      });
  }

  findProducts(): void {
    this.products = new Array(5).fill({}).map((i, index) => {
      return {
        productNo: `test${index}`,
        productName: `测试产品${index}`,
        cover: `./assets/banner.png`,
        amount: 100,
        description: '测试测试.....测试测试.....测试测试.....测试测试.....测试测试.....测试测试.....测试测试.....测试测试.....测试测试.....'
      };
    });
  }
}
