import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HotelComponent } from '../../../../hotel-component/hotel-component.component';
import { HeaderComponent } from '../../../../layout/components/header/header.component';
import { FooterComponent } from '../../../../layout/components/footer/footer.component';
import { Property } from '../../../properties/interfaces/property.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HotelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent implements OnInit {
  menuVisible = false;
  hotels: Property[] = [];
  searchForm: FormGroup;

  constructor(private homeService: HomeService) {
    this.searchForm = new FormGroup({
      where: new FormControl(''),
      precio: new FormControl(''),
      numeroHabitaciones: new FormControl(''),
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.hotels = this.homeService.get_hotels();
      console.log(this.hotels);
    }
  }

  order_by_price(){
    
    this.hotels = this.homeService.order_by_price(this.hotels)

  }
}