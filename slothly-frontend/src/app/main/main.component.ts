import { Component } from '@angular/core';
import {Material} from '../models/Material';
import {TextureCardsService} from '../texture-cards/texture-cards.service';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  textures: Material[] = [];
  mockups: Material[] = [];
  icons: Material[] = [];

  constructor(private Cards: TextureCardsService) {
  }

  ngOnInit() {
    this.Cards.getTexturesCards().subscribe((result: Material[]) => {
      this.textures = result.filter((cards: Material) => cards.type === 'Texture');
      this.mockups = result.filter((cards: Material) => cards.type === 'Mockup');
      this.icons = result.filter((cards: Material) => cards.type === 'Icon');
    });
  }
}
