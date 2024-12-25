import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: false,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  users: any = [];

  removeUser(id: number) {
    this.adminService.removeUser(id);
  }

  changeUserRole(id: number, newRole: string) {
    this.adminService.changeUserRole(id, newRole);
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe((result) => {
      console.log(result);
      this.users = result;
    });
  }
}
