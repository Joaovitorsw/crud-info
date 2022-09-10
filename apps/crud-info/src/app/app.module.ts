import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BaseApiModule, ENVIRONMENT_TOKEN } from '@my-workspace/base-api';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, BaseApiModule, BrowserAnimationsModule],
  providers: [
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
