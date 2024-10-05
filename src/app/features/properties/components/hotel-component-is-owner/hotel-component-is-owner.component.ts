import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../interfaces/property_response.interface';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-hotel-component-is-owner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-component-is-owner.component.html',
  styleUrl: './hotel-component-is-owner.component.css'
})
export class HotelComponentIsOwnerComponent {
  @Input() photos!: string;
  @Input() title!: string;
  @Input() address!: string;
  @Input() price_per_night!: number;
  @Input() property_id!: number;

  constructor(){}

  delete_property() {
    // Mostrar alerta de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario hace clic en "Sí, eliminar"
        this.delete_property_(this.property_id);
        Swal.fire({
          text: 'Propiedad eliminada',
          icon: 'success'
        }).then(() => {
          location.reload(); // Recargar la página después de la eliminación
        });
      }
    });
  }


  delete_property_(id: Number): PropertyResponse {
  
    let properties: Array<Property> = JSON.parse(localStorage.getItem("properties") || "[]");
  
    const propertyIndex = properties.findIndex(property => property.property_id === id);
  
   
    if (propertyIndex !== -1) {
      properties.splice(propertyIndex, 1); 
      localStorage.setItem("properties", JSON.stringify(properties)); 
    }
  
    return {
      success: propertyIndex !== -1 // Devuelve true si la propiedad fue encontrada y eliminada
    };
  }

}

