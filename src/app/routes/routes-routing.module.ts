import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
// dashboard pages
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { OpenWechatComponent } from './exception/open-wechat.component';
import { LoginComponent } from './wechat/components/login.component';
import { WechatGuardGuard } from './wechat/wechat-guard.guard';
import { WechatComponent } from './wechat/wechat.component';
// passport pages

const routes: Routes = [
  // 全屏布局
  {
    path: '',
    component: LayoutFullScreenComponent,
    canActivate: [ WechatGuardGuard ],
    children: [
      { path: '', redirectTo: 'wechat/home', pathMatch: 'full'},
      { path: 'wechat/home', component: WechatComponent },
      { path: 'wechat/:type', component: WechatComponent },
      { path: 'agency', loadChildren: './wechat/agency/agency.module#AgencyModule', canLoad: [ WechatGuardGuard ]},
      { path: 'product', loadChildren: './wechat/product/product.module#ProductModule', canLoad: [ WechatGuardGuard ]},
      { path: 'trade', loadChildren: './wechat/trade/trade.module#TradeModule', canLoad: [ WechatGuardGuard ]},
      { path: 'account', loadChildren: './wechat/account/account.module#AccountModule', canLoad: [ WechatGuardGuard ]},
      { path: 'introduce', loadChildren: './wechat/introduce/introduce.module#IntroduceModule', canLoad: [ WechatGuardGuard ]}
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent, data: {title: '认证'} },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: 'open-wechat', component: OpenWechatComponent },
  { path: 'login', component: LoginComponent, data: { title: '登录'}},
  { path: '**', redirectTo: 'open-wechat' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
