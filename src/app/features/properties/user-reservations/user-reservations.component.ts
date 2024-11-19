import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponentIsOwnerComponent } from '../components/hotel-component-is-owner/hotel-component-is-owner.component';
import { Property } from '../interfaces/property.interface';
import { HomeService } from '../../home/services/home.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css'],
  standalone: true,
  imports: [CommonModule, HotelComponentIsOwnerComponent, RouterModule]
})
export class UserReservationsComponent implements OnInit {

  reservations: Property[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const userId = this.homeService.get_id_user();
      if (userId) {
        this.homeService.get_user_reservations(userId).subscribe((reservations: Property[]) => {
          this.reservations = reservations;
        });
      }
    }
  }
}