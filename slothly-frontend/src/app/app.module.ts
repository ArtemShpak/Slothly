import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TextureCardsComponent } from './hello-world/texture-cards.component';
import {HttpInterceptorService} from './httpInterceptor.service';
import { MaterialComponent } from './material/material.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    TextureCardsComponent,
    MaterialComponent,
    MainComponent,
    ProfileComponent
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
