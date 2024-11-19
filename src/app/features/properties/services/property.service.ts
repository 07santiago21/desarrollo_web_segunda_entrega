import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../interfaces/property.interface';
import { PropertyResponse } from '../interfaces/property_response.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/properties'; // api de santos

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token!
    })
  }

  addProperty(property: Property): Observable<PropertyResponse> {
    const body = {
      "title": property.title,
      "description": property.description,
      "address": property.address,
      "latitude": Number(property.latitude),
      "longitude": Number(property.longitude),
      "price_per_night": Number(property.price_per_night),
      "num_bedrooms": Number(property.rooms),
      "num_bathrooms": Number(property.bathrooms),
      "max_guests": Number(property.max_capacity)
    }

    const headers = this.getHeaders();
    console.log(headers);
    return this.http.post<PropertyResponse>(`${this.apiUrl}`, body, { headers });
  }

  getPropertyById(id: string): Observable<Property> {
    const headers = this.getHeaders(); 
    return this.http.get<Property>(`${this.apiUrl}/${id}`, {headers});
  }

  updateProperty(id: string, updatedProperty: Property): Observable<PropertyResponse> {
    const headers = this.getHeaders();
    return this.http.patch<PropertyResponse>(`${this.apiUrl}/${id}`, updatedProperty, { headers });
  }

  deleteProperty(id: number): Observable<PropertyResponse> {
    const headers = this.getHeaders();
    return this.http.delete<PropertyResponse>(`${this.apiUrl}/${id}`, {headers});
  }

  getUser_id(): string | null {
    const userStr = localStorage.getItem('loggedUser');
    if (userStr) {
      const user = JSON.parse(userStr).user_id;
      return user;
    }
    return null;
  }
}