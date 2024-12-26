import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/Message';
import {Material} from '../models/Material';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextureCardsService {

  constructor(private http: HttpClient) { }

  getTexturesCards(): Observable<Material[]> {
    return this.http.get<Material[]>('http://localhost:8080/api/v1/materials');
  }
  getAllCards(): Observable<Material[]> {
    return this.http.get<Material[]>('http://localhost:8080/api/v1/allMaterials');
  }
}
