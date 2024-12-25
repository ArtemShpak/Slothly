// src/app/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../models/Cart';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get(`${this.baseUrl}/cart`);
  }

  addMaterialToCart(material: Material): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/addMaterialInCart`, material, { responseType: 'text' as 'json' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding material to cart:', error);
        return throwError(() => new Error('Failed to add material to cart'));
      })
    );
  }

  removeMaterialFromCart(id: number) {
    return this.http.delete(`${this.baseUrl}/removeMaterialFromCart/${id}`, { responseType: 'text' });
  }
}
