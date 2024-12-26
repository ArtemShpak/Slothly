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
    this.Cards.getAllCards().subscribe((result: Material[]) => {
      this.textures = result.filter(material => material.type === 'texture');
      this.mockups = result.filter(material => material.type === 'mockup');
      this.icons = result.filter(material => material.type === 'icon');
    });
  }
}
