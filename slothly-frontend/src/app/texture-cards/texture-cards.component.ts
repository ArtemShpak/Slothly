import {Component, Input, OnInit} from '@angular/core';
import { TextureCardsService } from './texture-cards.service';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { Material } from '../models/Material';
import {CartService} from '../cart/cart.service';
import {Cart} from '../models/Cart';

@Component({
  selector: 'texture-cards',
  templateUrl: './texture-cards.component.html',
  styleUrls: ['./texture-cards.component.css'],
  standalone: false
})
export class TextureCardsComponent implements OnInit {

  materials: any = [];
  private info: string = '';

  material = {name: '', description: '', price: 0, type: '', author: ''};

  constructor(
    private helloWorldService: TextureCardsService,
    private auth: AuthService,
    private router: Router,
    private cartService: CartService) { }

  @Input() type: string = '';
  @Input() cards: Material[] = [];

  ngOnInit() {
    this.materials = [];
    this.helloWorldService.getAllCards().subscribe((result) => {
      console.log(result);
      this.materials = result;
    });
  }

  addMaterial(material: Material): void {
    this.cartService.addMaterialToCart(material).subscribe(cart => {
      alert(cart);
    });
  }
}
