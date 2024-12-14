import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/login';

  postData(user: any) {
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }
}
