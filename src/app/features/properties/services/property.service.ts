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

  addProperty(property: Property): Observable<PropertyResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<PropertyResponse>(`${this.apiUrl}`, property, { headers });
  }

  getPropertyById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  updateProperty(id: string, updatedProperty: Property): Observable<PropertyResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.patch<PropertyResponse>(`${this.apiUrl}/${id}`, updatedProperty, { headers });
  }

  deleteProperty(id: number): Observable<PropertyResponse> {
    return this.http.delete<PropertyResponse>(`${this.apiUrl}/${id}`);
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