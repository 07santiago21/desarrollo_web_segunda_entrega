import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../interfaces/property_response.interface';

@Component({
  selector: 'app-hotel-component-is-owner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-component-is-owner.component.html',
  styleUrls: ['./hotel-component-is-owner.component.css']
})
export class HotelComponentIsOwnerComponent {
  @Input() photos!: string;
  @Input() title!: string;
  @Input() address!: string;
  @Input() price_per_night!: number;
  @Input() property_id!: number;

  constructor(private propertyService: PropertyService) {}

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
      }
    });
  }

  delete_property_(id: number): void {
    this.propertyService.deleteProperty(id).subscribe(
      (response: PropertyResponse) => {
        if (response.success) {
          Swal.fire({
            text: 'Propiedad eliminada',
            icon: 'success'
          }).then(() => {
            location.reload(); // Recargar la página después de la eliminación
          });
        } else {
          Swal.fire({
            text: 'No se pudo eliminar la propiedad',
            icon: 'error'
          });
        }
      },
      (error) => {
        Swal.fire({
          text: 'Error al eliminar la propiedad',
          icon: 'error'
        });
        console.error('Error deleting property:', error);
      }
    );
  }
}