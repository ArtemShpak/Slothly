import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/register';

  PostData(user: any) {
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }
}
