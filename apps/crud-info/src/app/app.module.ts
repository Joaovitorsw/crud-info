import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseApiModule, ENVIRONMENT_TOKEN } from '@my-workspace/base-api';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { JwtInterceptor } from './interceptors/jwt.Interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BaseApiModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
