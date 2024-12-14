import { Component } from '@angular/core';
import {SignUpComponent} from './sign-up/sign-up.component';

@Component({
  selector: 'app-authentication',
  standalone: false,

  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  SignUpState = true;

  onChangeState() {
    console.log('onChangeState');
    this.SignUpState = !this.SignUpState;
  }

  constructor() { }
}
