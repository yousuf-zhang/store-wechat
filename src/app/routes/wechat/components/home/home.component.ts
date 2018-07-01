import { Component, Input, OnInit } from '@angular/core';
import { yuan } from '@delon/util';
import { Router } from '@angular/router';

import { Product } from '../../../../model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  yuan = yuan;

  @Input() products: Product[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  pay(productNo: string) {
    this.router.navigateByUrl('/home');
  }
}
