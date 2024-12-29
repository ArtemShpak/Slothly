import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {MaterialService} from '../material/material.service';
import {Router} from '@angular/router';
import {TextureCardsService} from '../texture-cards/texture-cards.service';

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
  selectedFile: File | null = null;
  materials: any = [];
  constructor(private cards: TextureCardsService,
              private materialService: MaterialService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.auth.getUserProfile().subscribe((data: any) => {
      this.profile = data;
    });
    this.cards.getTexturesCards().subscribe((result) => {
      this.materials = result;
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
    this.auth.updateProfile(this.profile).subscribe(() => {
    });
    this.toggleEditForm();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onCreateMaterial(){
    this.user = this.auth.getLoggedInUserName();
    this.material.author = this.user;
    console.log(this.material);
    const formData = new FormData();
    formData.append('name', this.material.name);
    formData.append('description', this.material.description);
    formData.append('price', this.material.price.toString());
    formData.append('type', this.material.type);
    formData.append('author', this.material.author);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile, this.selectedFile.name);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    this.materialService.createMaterial(formData).subscribe((result) => {
        console.log('Material added successfully', result);
      }, error => {
        console.error('Error adding material', error);
      });
    this.toggleCreateMaterialForm();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
