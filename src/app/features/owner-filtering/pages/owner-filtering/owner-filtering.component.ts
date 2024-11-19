import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponentIsOwnerComponent } from '../../../properties/components/hotel-component-is-owner/hotel-component-is-owner.component';
import { Property } from '../../../properties/interfaces/property.interface';
import { HomeService } from '../../../home/services/home.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../../auth/interfaces/user';

@Component({
  selector: 'app-owner-filtering',
  templateUrl: './owner-filtering.component.html',
  styleUrls: ['./owner-filtering.component.css'],
  standalone: true,
  imports: [CommonModule, HotelComponentIsOwnerComponent, RouterModule]
})
export class OwnerFilteringComponent implements OnInit {

  hotels: Property[] = [];
  filteredHotels: Property[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.get_hotels().subscribe({
      next: (data: Property[]) => {
        this.hotels = data;
        const id = this.getUserId(); 
        console.log(id);
        this.filterHotels(id);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filterHotels(idUser: number): void {
    if (idUser !== null) {
      this.hotels = this.hotels.filter(hotel => hotel.user_id === idUser);
      console.log(this.hotels);
    }
  }

  getUserId(): number{
    const token = sessionStorage.getItem('token');
    const decodedToken: any = jwtDecode(token!);
    return decodedToken.user_id;
  }
}