import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TextureCardsComponent } from './texture-cards/texture-cards.component';
import {HttpInterceptorService} from './httpInterceptor.service';
import { MaterialComponent } from './material/material.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin-page/admin.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    TextureCardsComponent,
    MaterialComponent,
    MainComponent,
    ProfileComponent,
    CartComponent,
    AdminComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
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
