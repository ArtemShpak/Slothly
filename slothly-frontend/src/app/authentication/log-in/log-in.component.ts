import { Component } from '@angular/core';
import {LogInService} from './log-in.service';

@Component({
  selector: 'app-log-in',
  standalone: false,

  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  user = {email: '', password: ''};

  constructor(private loginService : LogInService ) {}

  onLogIn() {
    return this.loginService.postData(this.user).
      subscribe(
        (response) => {
          console.log(response);
          alert('Вход выполнен успешно!');
        },
        (error) => console.error(error)
      );
  }
}
