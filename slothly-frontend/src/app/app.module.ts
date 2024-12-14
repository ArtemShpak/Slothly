import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
