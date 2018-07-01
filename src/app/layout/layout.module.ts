import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LayoutFullScreenComponent } from './fullscreen/fullscreen.component';


const COMPONENTS = [
  LayoutFullScreenComponent,
];


@NgModule({
  imports: [SharedModule],
  providers: [],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class LayoutModule { }
