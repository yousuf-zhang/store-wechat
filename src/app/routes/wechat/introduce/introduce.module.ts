import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IntroduceRoutingModule } from './introduce-routing.module';
import { IntroduceComponent } from './introduce.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CertificationComponent } from './certification/certification.component';
import { IntroduceAgencyComponent } from './introduce-agency/introduce-agency.component';
import { TrainComponent } from './train/train.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    IntroduceRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    IntroduceComponent,
    CompanyProfileComponent,
    CertificationComponent,
    IntroduceAgencyComponent,
    TrainComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class IntroduceModule { }
