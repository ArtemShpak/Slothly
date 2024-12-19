import {Component, OnInit} from '@angular/core';
import { MaterialService } from './material.service';

@Component({
  selector: 'app-material',
  standalone: false,
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  // materials:any = [];

  material = {name: '', description: '', price: 0, type: '', author: ''};

  constructor(private materialService: MaterialService) { }

  // ngOnInit() {
  //   // this.materials = [];
  //   this.materialService.materialService().subscribe((result) => {
  //     this.materials = result;
  //     console.log(result);
  //   });
  // }

  onCreateMaterial(){
    console.log(this.material);
    this.materialService.createMaterial(this.material).subscribe((result) => {
      console.log(result);
    });
  }
}
