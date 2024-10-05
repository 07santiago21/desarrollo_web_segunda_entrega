import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';
import { Property } from '../interfaces/property.interface';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  providers:[PropertyService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id: string | null = null; 
  property:Property|undefined

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      
      if (this.id){
      this.getPropertyById(this.id)
      }
      
      
    });

}


private getPropertyById(id: string): void {
  const propertiesArray = localStorage.getItem('properties');
  const properties: Array<Property> = propertiesArray ? JSON.parse(propertiesArray) : [];

  
  this.property = properties.find(prop => prop.property_id === +id);
  
  
  
}

}
