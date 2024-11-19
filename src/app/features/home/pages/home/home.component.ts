import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
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
  filteredHotels: Property[] = [];
  searchForm: FormGroup;
  commentForm: FormGroup;

  constructor(private homeService: HomeService) {
    this.searchForm = new FormGroup({
      where: new FormControl(''),
      precio: new FormControl(''),
      guests: new FormControl(''), 
    });

    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.homeService.get_hotels().subscribe((hotels: Property[]) => {
        this.hotels = hotels;
        this.filteredHotels = hotels;
        console.log(this.hotels);
      });
    }
  }

  onSearch() {
    const { where, precio, guests } = this.searchForm.value;
    this.homeService.filterHotels(where, precio, guests).subscribe((filteredHotels: Property[]) => {
      this.filteredHotels = filteredHotels;
    });
  }

  order_by_price() {
    this.filteredHotels = this.homeService.order_by_price(this.filteredHotels);
  }

  onCommentSubmit(propertyId: number) {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value.comment;
      this.homeService.addComment(propertyId, comment).subscribe(
        response => {
          console.log(`Comment on property ${propertyId}: ${comment}`);

        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
  onReserve(propertyId: number) {
      this.homeService.makeReservation(propertyId).subscribe(
        response => {
          console.log(`Reserve property ${propertyId}`);

        },
        error => {
          console.error('Error making reservation:', error);
        }
      );
    }

  
}