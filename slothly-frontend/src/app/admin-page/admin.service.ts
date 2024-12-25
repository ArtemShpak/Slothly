import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  removeUser(userId: number) {
    this.http.delete(`http://localhost:8080/api/v1/admin/removeUser/${userId}`)
      .subscribe(response => {
        console.log('User removed successfully');
      }, error => {
        console.error('Error removing user', error);
      });
  }

  changeUserRole(userId: number, newRole: string) {
    this.http.put(`http://localhost:8080/api/v1/admin/changeUserRole/${userId}`, null, {
      params: { newRole }
    }).subscribe(response => {
      console.log('User role changed successfully');
    }, error => {
      console.error('Error changing user role', error);
    });
  }

  getUsers() {
    return this.http.get<User>('http://localhost:8080/api/v1/admin/users');
  }
}
