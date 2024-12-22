import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {MaterialService} from '../material/material.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {};
  isEditFormVisible: boolean = false;
  isCreateFormVisible: boolean = false;
  material = {name: '', description: '', price: 0, type: '', author: ''};

  constructor(private profileService: AuthService, private materialService: MaterialService) { }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe((data: any) => {
      this.profile = data;
    });
  }

  toggleEditForm() {
    this.isEditFormVisible = !this.isEditFormVisible;
  }

  toggleCreateMaterialForm() {
    this.isCreateFormVisible = !this.isCreateFormVisible;
  }

  onSubmit() {
    this.profileService.updateProfile(this.profile).subscribe(() => {
      this.toggleEditForm();
    });
  }

  onCreateMaterial(){
    console.log(this.material);
    this.materialService.createMaterial(this.material).subscribe((result) => {
      console.log(result);
    });
  }
}
