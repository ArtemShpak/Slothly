import { Component } from '@angular/core';
import {SignUpService} from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpState = true;

  user = { name: '', password: '', email: '', role: 'ROLE_USER', };

  constructor(private signUp: SignUpService) { }

  onSignUp() {
    return this.signUp.PostData(this.user).subscribe(response => {alert('Новий користувач успішно створений');}, error => console.error(error));
  }

}
