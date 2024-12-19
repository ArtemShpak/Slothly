import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Material} from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  materialService() {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('javaguides' + ':' + 'password') });
    return this.http.get('http://localhost:8080/api/v1/material');
  }
}
