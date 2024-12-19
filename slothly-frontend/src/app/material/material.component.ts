import { Component } from '@angular/core';
import {MaterialService} from './material.service';
import {Material} from '../models/Material';

@Component({
  selector: 'app-material',
  standalone: false,

  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {

  material: Material = new Material();

  constructor(private materialService: MaterialService) { }

  ngOnInit() {

    console.log("HelloWorldComponent");
    this.materialService.materialService().subscribe( (result) => {
      // result = this.material;
      console.log(result);
    });
  }

}
