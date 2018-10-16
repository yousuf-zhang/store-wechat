import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrCodeComponent } from '../components/qr-code/qr-code.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressComponent } from './address/address.component';
import { ProductCheckOutComponent } from './product-check-out/product-check-out.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductQrCodeComponent } from './product-qr-code/product-qr-code.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {path: '', component: ProductComponent, children: [
    {path: 'check-out', component: ProductCheckOutComponent, data: {title: '订单编辑'}},
    {path: 'address-list', component: AddressListComponent, data: {title: '收货地址'}},
      {path: 'address-add', component: AddressComponent, data: {title: '新增收货地址'}},
      {path: 'address-edit/:id', component: AddressComponent, data: {title: '修改收货地址'}},
    {path: 'qrcode', component: ProductQrCodeComponent, data: {title: '商品信息'}},
    {path: ':productNo', component: ProductInfoComponent, data: {title: '商品详情'}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
