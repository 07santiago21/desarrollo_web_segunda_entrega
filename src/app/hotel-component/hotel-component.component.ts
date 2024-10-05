import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-component',
  templateUrl: './hotel-component.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./hotel-component.component.css'],
  standalone: true
})
export class HotelComponent {
  @Input() photos!: string;
  @Input() title!: string;
  @Input() address!: string;
  @Input() price_per_night!: number;
  @Input() property_id!: number;
}