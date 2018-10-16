import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificationComponent } from './certification/certification.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { IntroduceAgencyComponent } from './introduce-agency/introduce-agency.component';
import { IntroduceComponent } from './introduce.component';

const routes: Routes = [
  {path: '', component: IntroduceComponent, children: [
    {path: 'company-profile', component: CompanyProfileComponent, data: {title: '公司简介'}},
    {path: 'certification', component: CertificationComponent, data: {title: '资质认证'}},
    {path: 'agency', component: IntroduceAgencyComponent, data: {title: '成为VIP会员'}},
    {path: 'train', component: IntroduceAgencyComponent, data: {title: '培训资料'}}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroduceRoutingModule { }
