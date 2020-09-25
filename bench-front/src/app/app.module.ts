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
import { CreateFormComponent } from './components/create-form/create-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DebounceClickDirective} from "./debounce-click.directive";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FlexLayoutModule
  ],
  providers: [
    ConfigService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
