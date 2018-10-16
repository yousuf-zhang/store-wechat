import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductCheckOutComponent } from './product-check-out/product-check-out.component';
import { AddressComponent } from './address/address.component';
import { AddressListComponent } from './address-list/address-list.component';
import { ProductQrCodeComponent } from './product-qr-code/product-qr-code.component';

const COMPONENTS = [
  ProductComponent,
  ProductInfoComponent,
  ProductCheckOutComponent,
  AddressComponent,
  AddressListComponent,
  ProductQrCodeComponent
];
const COMPONENTS_NOROUNT = [

];

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProductModule { }
