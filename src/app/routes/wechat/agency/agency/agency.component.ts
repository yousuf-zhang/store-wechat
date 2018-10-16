import { Component, Input, OnInit } from '@angular/core';
import { Agency } from '../../../../model';
import { AGENCY_LEVER } from '../../../../model/dictionary';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styles: []
})
export class AgencyComponent implements OnInit {
  @Input() agency: Agency;
  level = AGENCY_LEVER;
  @Input() showPhone = true;
  constructor() { }

  ngOnInit() {
  }

}
