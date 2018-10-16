import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { CacheService } from '@delon/cache';
import { _HttpClient } from '@delon/theme';
import { RestResponse } from '../../../../dto';
import { Address } from '../../../../model/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styles: []
})
export class AddressListComponent implements OnInit {
  addressList: Address[];
  constructor(private http: _HttpClient,
              private route: Router,
              private cache: CacheService) { }

  ngOnInit() {
    this.http.get<RestResponse<Address[]>>(`/address/list`).subscribe(value => {

      if (value.result) {
        this.addressList = value.result;
        this.addressList.forEach( val => {
          if (val.status === 1) {
            val.status = true;
          } else {
            val.status = false;
          }
        });
      }
    });
  }

  changeStatus(address: Address) {
    console.log(address.status);
    if (address.status === false) {
      this.http.put(`/address/change-status/${address.id}`).subscribe( () => {
        this.addressList.forEach(value => {
          if (value.id === address.id) {
            address.status = true;
          } else {
            address.status = false;
          }
        });
      });
    }

  }

  editAddress(address: Address) {
    this.route.navigateByUrl(`/product/address-edit/${address.id}`);
  }

  deleteAddress(id: number) {
    this.http.delete(`/address/${id}`).subscribe(() => {
      this.addressList = this.addressList.filter(value => value.id !== id);
    });
  }

  selectAddress(address: Address) {
    if (this.cache.getNone('shopCart')) {
      this.route.navigate([`/product/check-out`], {queryParams: {id: address.id}});
    }
  }

}
