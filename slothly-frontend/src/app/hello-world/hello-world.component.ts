import {Component, OnInit} from '@angular/core';
import {HelloWorldService} from './hello-world.service';
import {AuthService} from '../authentication/log-in/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hello-world',
  standalone: false,
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent implements OnInit {

  message!: string;

  constructor(
    private helloWorldService: HelloWorldService,
    private auth:AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.helloWorldService.helloWorldService().subscribe( (result) => {
      console.log(result);
      this.message = result.content;
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
