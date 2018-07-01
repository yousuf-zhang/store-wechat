import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-wechat',
  template: `<article class="weui-article" style="text-align: center">
    <div class="weui_msg">
      <div class="weui_icon_area">
        <i class="weui-icon-info weui-icon_msg"></i></div>
      <div class="weui_text_area">
        <h4 class="icon-box__title">请在微信客户端打开链接</h4>
      </div>
    </div>
  </article>
  `,
  styles: []
})
export class OpenWechatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
