import {BrowserModule} from '@angular/platform-browser';
/* Routing */
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
/* Angular Material */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
/* FormsModule */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/* Angular Flex Layout */
import {FlexLayoutModule} from "@angular/flex-layout";
/* Components */
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {ConfigService} from "./config/config.service";
import {AccountComponent} from './components/account/account.component';
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    ConfigService,
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
