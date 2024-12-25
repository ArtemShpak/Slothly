import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {MaterialService} from '../material/material.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  isEditFormVisible: boolean = true;
  isCreateFormVisible: boolean = true;
  isStatFormVisible: boolean = false;
  user: string = '';
  material = {name: '', description: '', price: 0, type: '', author: ''};

  constructor(private profileService: AuthService,
              private materialService: MaterialService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe((data: any) => {
      this.profile = data;
    });
  }

  toggleEditForm() {
    this.isEditFormVisible = !this.isEditFormVisible;
    this.isStatFormVisible = !this.isEditFormVisible || !this.isCreateFormVisible;
  }

  toggleCreateMaterialForm() {
    this.isCreateFormVisible = !this.isCreateFormVisible;
    this.isStatFormVisible = !this.isEditFormVisible || !this.isCreateFormVisible;
  }


  onUpdate() {
    console.log(this.profile);
    this.profileService.updateProfile(this.profile).subscribe(() => {
    });
    this.toggleEditForm();
  }

  onCreateMaterial(){
    this.user = this.auth.getLoggedInUserName();
    this.material.author = this.user;
    console.log(this.material);
    this.materialService.createMaterial(this.material).subscribe((result) => {
      console.log(result);
    });
    this.toggleCreateMaterialForm();
    this.router.navigate(['/profile']);
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
