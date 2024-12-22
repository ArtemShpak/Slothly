import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TextureCardsComponent} from './hello-world/texture-cards.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthGuard} from './AuthGuard';
import {MaterialComponent} from './material/material.component';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'hello-world', component: TextureCardsComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
  {path: 'main-page', component: MainComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
