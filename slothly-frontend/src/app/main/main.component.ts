import {Component, OnInit} from '@angular/core';
import {Material} from '../models/Material';
import {TextureCardsService} from '../texture-cards/texture-cards.service';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  implements OnInit {

  showTextures: boolean = true;
  showAll: boolean = false;
  showMockups: boolean = true;
  showIcons: boolean = true;

  textures: Material[] = [];
  mockups: Material[] = [];
  icons: Material[] = [];


  constructor(private Cards: TextureCardsService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.Cards.getAllCards().subscribe((result: Material[]) => {
      this.textures = result.filter(material => material.type === 'Texture');
      this.mockups = result.filter(material => material.type === 'Mockup');
      this.icons = result.filter(material => material.type === 'Icon');
    });
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('dblclick', (event) => {
        event.preventDefault();
      });
    });
  }

  showTextureCards() {
    this.showTextures = !this.showTextures;
    this.showAll = true;
    this.showAll = !(this.showMockups && this.showIcons && this.showTextures);
  }

  showMockupCards() {
    this.showMockups = !this.showMockups;

    this.showAll = !(this.showMockups && this.showIcons && this.showTextures);
  }
  showIconCards() {
    this.showIcons = !this.showIcons;
    this.showAll = true;
    this.showAll = !(this.showMockups && this.showIcons && this.showTextures);
  }

  addMaterial(material: Material): void {
    this.cartService.addMaterialToCart(material).subscribe(cart => {
      alert(cart);
    });
  }
}
