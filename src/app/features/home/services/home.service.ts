import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../../properties/interfaces/property.interface';
import { User } from '../../../auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/properties'; // api
  order_by_asc = false;

  constructor(private http: HttpClient) { }

  get_hotels(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  get_id_user(): string | null {
    const userStr = localStorage.getItem('loggedUser');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      return user.user_id.toString();
    }
    return null;
  }

  order_by_price(properties: Array<Property>): Property[] {
    this.order_by_asc = !this.order_by_asc;

    return properties.sort((a, b) => {
      if (this.order_by_asc) {
        return b.price_per_night - a.price_per_night;
      } else {
        return a.price_per_night - b.price_per_night;
      }
    });
  }

  filterHotels(where: string, precio: number, guests: number): Observable<Property[]> {
    let params = new HttpParams();
    if (where) {
      params = params.set('where', where);
    }
    if (precio) {
      params = params.set('precio', precio.toString());
    }
    if (guests) {
      params = params.set('guests', guests.toString());
    }

    return this.http.get<Property[]>(`${this.apiUrl}/filter`, { params });
  }
}