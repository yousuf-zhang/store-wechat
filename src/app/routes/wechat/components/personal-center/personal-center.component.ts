import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../../../../model';
import { AGENCY_LEVER } from '../../../../model/dictionary';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styles: []
})
export class PersonalCenterComponent implements OnInit {
  @Input() parentAgency: Agency;
  @Input() agency: Agency;
  level = AGENCY_LEVER;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAgency(): void {
    this.router.navigateByUrl('/agency/list');
  }
}
