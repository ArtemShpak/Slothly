import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-log-in',
  standalone: false,

  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) {   }

  ngOnInit() {
  }

  handleLogin() {
    console.log(this.username, this.password);
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/hello-world']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
