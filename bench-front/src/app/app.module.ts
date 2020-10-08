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
import {BackendService} from "./service/backend.service";
import {AccountComponent} from './components/account/account.component';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DebounceClickDirective} from "./debounce-click.directive";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CookieHelper} from "./service/cookie.helper";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    AccountComponent,
    DebounceClickDirective,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FlexLayoutModule
  ],
  providers: [
    BackendService,
    CookieHelper
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
