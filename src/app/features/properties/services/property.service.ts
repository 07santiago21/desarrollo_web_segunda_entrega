import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/property.interface';
import { PropertyResponse } from '../interfaces/property_response.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor() {}

  addProperty(property: Property): PropertyResponse {
    let propertiesArray = localStorage.getItem('properties');
    let properties: Array<Property> = propertiesArray ? JSON.parse(propertiesArray) : [];

    let lastPropertyId = properties.length > 0 ? Math.max(...properties.map((prop: Property) => prop.property_id)) + 1 : 1;

    property.property_id = lastPropertyId;

    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    return {
      success: true
    };
  }

  getPropertyById(id: string): Property|undefined {
    let propertiesArray = localStorage.getItem('properties');
    let properties: Array<Property> = propertiesArray ? JSON.parse(propertiesArray) : [];
    let property = properties.find(prop => prop.property_id === +id);
    return property
  }

  updateProperty_(property:any,update_property: any):PropertyResponse{
    for (const key in update_property) {
      if (update_property[key] !== "") {
          property[key] = update_property[key];
      }

      let properties: Array<Property> = JSON.parse(localStorage.getItem("properties")|| "[]")
      const propertyIndex = properties.findIndex(property_ => property_.property_id === property.property_id);
      properties[propertyIndex] = property
      localStorage.setItem("properties",JSON.stringify(properties))

  }
  return {
    success: true
  };

}

  getUser_id(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt).user_id;
      return user
    }
  }
}