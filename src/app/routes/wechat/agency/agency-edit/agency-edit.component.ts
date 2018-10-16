import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '@delon/cache';
import { _HttpClient, SettingsService } from '@delon/theme';
import { ToptipsService } from 'ngx-weui';
import { RestResponse } from '../../../../dto';
import { Agency } from '../../../../model';

@Component({
  selector: 'app-agency-edit',
  templateUrl: './agency-edit.component.html',
  styles: []
})
export class AgencyEditComponent implements OnInit {
  agency: Agency = new Agency();
  constructor(private http: _HttpClient,
              private settings: SettingsService,
              private srv: ToptipsService,
              private cache: CacheService,
              private router: Router) { }

  ngOnInit() {
    this.http.get<RestResponse<Agency>>(`/agency/${this.settings.user.id}`).subscribe(res => {
      console.log(res);
      this.agency = res.result;
    });
  }

  onSave() {
    this.http.put(`/agency/edit`, this.agency).subscribe(res => {
      console.log(res);
      this.srv['success']('修改成功');
      if (this.cache.getNone('shopCart')) {
        this.router.navigateByUrl(`/product/check-out`);
      }
    });

  }
}
