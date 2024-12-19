import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentication/log-in/log-in.component';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {SignUpComponent} from './authentication/sign-up/sign-up.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {AuthGuard} from './AuthGuard';

const routes: Routes = [
  {path: '', component: SignUpComponent},
  {path: 'hello-world', component: HelloWorldComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
