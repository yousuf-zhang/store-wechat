import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
// single pages
import { CallbackComponent } from './callback/callback.component';
// dashboard pages
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { OpenWechatComponent } from './exception/open-wechat.component';
import { RouteRoutingModule } from './routes-routing.module';
import { HomeComponent } from './wechat/components/home/home.component';
import { LoginComponent } from './wechat/components/login.component';
import { PersonalCenterComponent } from './wechat/components/personal-center/personal-center.component';
import { QrCodeComponent } from './wechat/components/qr-code/qr-code.component';
import { ShoppingCartComponent } from './wechat/components/shopping-cart/shopping-cart.component';
import { WechatComponent } from './wechat/wechat.component';


const COMPONENTS = [
  WechatComponent,
  OpenWechatComponent,
  LoginComponent,
  CallbackComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component
];
const COMPONENTS_NOROUNT = [
  HomeComponent,
  QrCodeComponent,
  ShoppingCartComponent,
  PersonalCenterComponent,
];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
