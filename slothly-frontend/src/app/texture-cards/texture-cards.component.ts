import { Component, OnInit } from '@angular/core';
import { TextureCardsService } from './texture-cards.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Material } from '../models/Material';

@Component({
  selector: 'texture-cards',
  templateUrl: './texture-cards.component.html',
  styleUrls: ['./texture-cards.component.css'],
  standalone: false
})
export class TextureCardsComponent implements OnInit {

  materials: any = [];

  constructor(
    private helloWorldService: TextureCardsService,
    private auth: AuthService,
    private router: Router ) { }

  ngOnInit() {
    this.materials = [];
    this.helloWorldService.getTexturesCards().subscribe((result) => {
      console.log(result);
      this.materials = result;
    });
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
