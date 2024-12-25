// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import {Cart} from '../models/Cart';
import {CartService} from './cart.service';
import {Material} from '../models/Material';
import {AuthService} from '../authentication/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  materials: any = [];
  user!: string;

  constructor(private cartService: CartService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getLoggedInUserName();
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(material => {
      this.materials = material;
    });
  }

  removeMaterialFromCart(id: number): void {
    this.cartService.removeMaterialFromCart(id).subscribe(() => {
      this.loadCart();
    });
  }
}
