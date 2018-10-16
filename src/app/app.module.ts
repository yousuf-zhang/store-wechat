// angular i18n
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { StartupService } from '@core/startup/startup.service';
import { JWTInterceptor } from '@delon/auth';
// @delon/form: JSON Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import { WeUiModule } from 'ngx-weui';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DelonModule } from './delon.module';
import { LayoutModule } from './layout/layout.module';
import { RoutesModule } from './routes/routes.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeZhHans);

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DelonModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    // JSON-Schema form
    JsonSchemaModule,
    WeUiModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
