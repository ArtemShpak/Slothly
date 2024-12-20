import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthGuard} from './AuthGuard';
import {MaterialComponent} from './material/material.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'hello-world', component: HelloWorldComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
