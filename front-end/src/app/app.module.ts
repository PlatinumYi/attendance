import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './service/api.service';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';

import { RegisterComponent } from './register/register.component';

import { LayoutComponent } from './layout/layout.component';
import { UserLoginService } from './service/user-login.service';
import { PartsService } from './service/parts.service';
import { UserRegisterService } from './service/user-register.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    ApiService,
    UserLoginService,
    UserRegisterService,
    PartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
