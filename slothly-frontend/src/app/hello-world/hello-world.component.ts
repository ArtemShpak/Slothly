import { Component, OnInit } from '@angular/core';
import { HelloWorldService } from './hello-world.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Material } from '../models/Material';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
  standalone: false
})
export class HelloWorldComponent implements OnInit {

  materials: any = [];

  constructor(
    private helloWorldService: HelloWorldService,
    private auth: AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.materials = [];
    this.helloWorldService.helloWorldService().subscribe((result) => {
      console.log(result);
      this.materials = result;
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
