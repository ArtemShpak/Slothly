import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  getMaterials() {
    return this.http.get(`http://localhost:8080/api/v1/materials`);
  }

  createMaterial(formData: FormData){
    return this.http.post('http://localhost:8080/api/v1/addMaterial', formData);
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v1/removeMaterial/${id}`);
  }

  updateMaterial(id: number, formData: FormData): Observable<Material> {
    return this.http.put<Material>(`http://localhost:8080/api/v1/updateMaterial/${id}`, formData);
  }
}
