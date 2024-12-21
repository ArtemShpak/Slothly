import { AfterViewInit, Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements AfterViewInit {

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;


  ngAfterViewInit() {
    const wrapper = document.querySelector('.wrapper');
    const signupHeader = document.querySelector('.signup header');
    const loginHeader = document.querySelector('.login header');

    if (wrapper && signupHeader && loginHeader) {
      loginHeader.addEventListener('click', () => {
        wrapper.classList.add('active');
      });

      signupHeader.addEventListener('click', () => {
        wrapper.classList.remove('active');
      });
    }
  }

  user = { username: '', password: '', email: '', role: 'ROLE_USER' };

  constructor(private authenticationService:AuthService, private router: Router ) { }

  onSignUp() {
      return this.authenticationService.RegisterUser(this.user).subscribe(response => {
        alert(response);
      }, error => console.error(error));
  }
  onLogIn() {
    console.log(this.username);
    console.log(this.password);
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/main-page']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
