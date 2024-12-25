import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  materialService() {
    return this.http.get('http://localhost:8080/api/v1/materials');
  }

  createMaterial(material: any) {
    return this.http.post('http://localhost:8080/api/v1/addMaterial', material, { responseType: 'text' });
  }
}
