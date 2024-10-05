import { Injectable } from '@angular/core';
import { Property } from '../../properties/interfaces/property.interface';
import { User } from '../../../auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  order_by_asc = false;

  constructor() { }

  get_hotels(){
    let properties: Array<Property> = JSON.parse(localStorage.getItem("properties")|| "[]")
    return properties
  }

  get_id_user(){
    let user: User = JSON.parse(localStorage.getItem("loggedUser")|| "[]")
    return user.user_id
  }

  order_by_price(properties: Array<Property>){
    
    this.order_by_asc = !this.order_by_asc

    return properties.sort((a, b) => {
      if(this.order_by_asc){

        return b.price_per_night-a.price_per_night;
      }
      else{
        
        return a.price_per_night - b.price_per_night;
      }
    });
  }
  


}
