import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: false,
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements AfterViewInit, OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

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

  onSignUp() {
    if (this.signupForm.valid) {
      this.authenticationService.RegisterUser(this.signupForm.value).subscribe(response => {
        alert(response);
      }, error => console.error(error));
    } else {
      console.log('Signup form is invalid');
    }
  }

  onLogIn() {
    if (this.loginForm.valid) {
      this.authenticationService.authenticationService(this.loginForm.value.username, this.loginForm.value.password).subscribe((result) => {
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.router.navigate(['/main-page']);
      }, () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      });
    } else {
      console.log('Login form is invalid');
    }
  }
}
