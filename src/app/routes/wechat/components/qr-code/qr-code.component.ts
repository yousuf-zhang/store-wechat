import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styles: []
})
export class QrCodeComponent implements OnInit {
  @Input() qrCodeUrl: string;

  constructor(public settings: SettingsService) { }

  ngOnInit() {
  }

}
