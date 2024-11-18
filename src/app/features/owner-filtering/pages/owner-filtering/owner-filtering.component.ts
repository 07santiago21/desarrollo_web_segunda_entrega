import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponentIsOwnerComponent } from '../../../properties/components/hotel-component-is-owner/hotel-component-is-owner.component';
import { Property } from '../../../properties/interfaces/property.interface';
import { HomeService } from '../../../home/services/home.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-owner-filtering',
  templateUrl: './owner-filtering.component.html',
  styleUrls: ['./owner-filtering.component.css'],
  standalone: true,
  imports: [CommonModule, HotelComponentIsOwnerComponent, RouterModule]
})
export class OwnerFilteringComponent implements OnInit {

  hotels: Property[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.homeService.get_hotels().subscribe((hotels: Property[]) => {
        this.hotels = hotels;
        const idUser = Number(this.homeService.get_id_user());
        this.filterHotels(idUser);
      });
    }
  }

  filterHotels(idUser: number): void {
    if (idUser !== null) {
      this.hotels = this.hotels.filter(hotel => hotel.user_id === idUser);
    }
  }
}