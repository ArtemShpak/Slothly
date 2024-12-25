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

  materials: Material[] = [];
  user: string = '';

  constructor(private materialService: MaterialService, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getLoggedInUserName();
    this.materialService.getMaterials().subscribe((result) => {
      this.materials = result;
    });
  }

  deleteMaterial(id: number) {
    this.materialService.deleteMaterial(id).subscribe(() => {
      this.materials = this.materials.filter(material => material.id !== id);
    });
  }

  updateMaterial(id: number, price: number) {
    const material = this.materials.find(material => material.id === id);
    if (material) {
      material.price = price;
      this.materialService.updateMaterial(id, material).subscribe(updatedMaterial => {
        const index = this.materials.findIndex(material => material.id === id);
        this.materials[index] = updatedMaterial;
      });
    }
  }
}
