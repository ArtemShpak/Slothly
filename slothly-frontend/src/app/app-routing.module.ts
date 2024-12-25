import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TextureCardsComponent} from './texture-cards/texture-cards.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthGuard} from './AuthGuard';
import {MaterialComponent} from './material/material.component';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';
import {CartComponent} from './cart/cart.component';
import {AdminComponent} from './admin-page/admin.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'texture-cards', component: TextureCardsComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: 'main-page', component: MainComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent},
  {path: 'admin-page', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
