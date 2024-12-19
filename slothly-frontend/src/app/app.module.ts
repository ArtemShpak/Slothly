import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication/authentication.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import {HttpInterceptorService} from './httpInterceptor.service';
import { MaterialComponent } from './material/material.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HelloWorldComponent,
    MaterialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  exports: [
    AuthenticationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
