import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Property } from '../interfaces/property.interface';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  providers: [PropertyService],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: string | null = null; 
  property: Property | undefined;

  constructor(
    private route: ActivatedRoute,
    @Inject(PropertyService) private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.getPropertyById(this.id);
      }
    });
  }

  private getPropertyById(id: string): void {
    this.propertyService.getPropertyById(id).subscribe(
      (property: Property) => {
        this.property = property;
      },
      (error) => {
        console.error('Error fetching property:', error);
      }
    );
  }
}