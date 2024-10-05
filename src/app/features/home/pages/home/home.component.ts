import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HotelComponent } from '../../../../hotel-component/hotel-component.component';

import { Property } from '../../../properties/interfaces/property.interface';
import { HomeService } from '../../services/home.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HotelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent {
  menuVisible = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  hotels:Property[] = [];


  constructor(private homeService:HomeService){
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.hotels = this.homeService.get_hotels();
      console.log(this.hotels)
    }
  }



  order_by_price(){
    
    this.hotels = this.homeService.order_by_price(this.hotels)

  }
}