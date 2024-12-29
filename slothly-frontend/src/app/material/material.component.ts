import { Component, OnInit } from '@angular/core';
import { MaterialService } from './material.service';
import { AuthService } from '../authentication/auth.service';
import { Material } from '../models/Material';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  standalone: false
})
export class MaterialComponent implements OnInit {

  materials: any = [];
  user: string = '';

  constructor(private materialService: MaterialService, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getLoggedInUserName();
    this.materialService.getMaterials().subscribe((result) => {
      this.materials = result;
    });
  }

  onFileChange(event: any, material: any) {
    material.selectedFile = event.target.files[0];
  }

  deleteMaterial(id: number) {
    this.materialService.deleteMaterial(id).subscribe(() => {
      this.materials = this.materials.filter((material: Material) => material.id !== id);
    });
  }

  updateMaterial(id: number, name: string, description: string, price: number, selectedFile: File) {
    const material = this.materials.find((material: Material) => material.id === id);
    if (material) {
      material.name = name;
      material.description = description;
      material.price = price;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      if (selectedFile) {
        formData.append('photo', selectedFile, selectedFile.name);
      }
      this.materialService.updateMaterial(id, formData).subscribe((updatedMaterial: Material) => {
        const index = this.materials.findIndex((material: Material) => material.id === id);
        this.materials[index] = updatedMaterial;
      });
    }
  }
}
