import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { MaskComponent } from 'ngx-weui';
import { RestResponse } from '../../../../dto';
import { Address } from '../../../../model/address';
import { DATA } from '../../../../model/cn';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styles: []
})
export class AddressComponent implements OnInit {
  @Output() addressEmit = new EventEmitter<Address>();
  @Input() showStatus = true;
  address: Address = new Address();
  cityData: any = DATA;
  @ViewChild('mask') mask: MaskComponent;

  constructor(private http: _HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.http.get<RestResponse<Address>>(`/address/${id}`)
          .subscribe(res => {
            this.address = res.result;
            if (this.address.status === 1) {
              this.address.status = true;
            }
          });
      }
    });
  }

  cityChange(city: any) {
    console.log(city);
    this.address.province = city.items[0].name;
    this.address.city = city.items[1].name;
    this.address.country = city.items[2].name;
    this.address.cityCode = city.value;
  }

  onSave() {
    if (this.showStatus === false || this.address.status) {
      this.address.status = 1;
    } else {
      this.address.status = 0;
    }
    this.mask.show();
  }

  saveAddress() {
    this.http.post<RestResponse<Address>> (`/address`, this.address)
      .subscribe(res => {
        if (this.showStatus) {
          this.router.navigateByUrl('/product/address-list');
        } else {
          this.addressEmit.emit(res.result);
        }

    });
    this.mask.hide();
  }

}
