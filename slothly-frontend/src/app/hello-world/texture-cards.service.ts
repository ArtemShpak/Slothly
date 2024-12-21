import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/Message';
import {Material} from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class TextureCardsService {

  constructor(private http: HttpClient) { }

  helloWorldService() {
    return this.http.get('http://localhost:8080/api/v1/materials');
  }
}
