import {Component, OnInit} from '@angular/core';
import { MaterialService } from './material.service';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-material',
  standalone: false,
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materials:any = [];
  user: string = '';


  constructor(private materialService: MaterialService, private auth: AuthService) { }

  ngOnInit() {

    this.materialService.materialService().subscribe((result) => {
      this.materials = result;
      alert(this.auth.getLoggedInUserName());
      console.log(result);
    });
  }

}
