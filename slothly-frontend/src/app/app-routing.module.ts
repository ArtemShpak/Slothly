import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './authentication/log-in/log-in.component';
import {HelloWorldComponent} from './hello-world/hello-world.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'hello-world', component: HelloWorldComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
