import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/Message';
import {Material} from '../models/Material';

@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient) { }

  helloWorldService() {
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('javaguides' + ':' + 'password') });
    return this.http.get<Message>('http://localhost:8080/api/v1/profile');
  }
}
