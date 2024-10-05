import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import Swal from 'sweetalert2';
import { PropertyService } from '../services/property.service';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [PropertyService] 
})
export class AddPropertyComponent {
  addPropertyForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private propertyService: PropertyService,private supabaseService: SupabaseService) {
    this.addPropertyForm = this.fb.group({
      
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]], 
      price_per_night: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      bathrooms: ['', [Validators.required]],
      max_capacity: ['', [Validators.required]],
      photos: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.addPropertyForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }

    let property = this.addPropertyForm.value;
    const user_id = this.propertyService.getUser_id()
    property = {user_id ,...property}

    let response = this.propertyService.addProperty(property);

    if (response) {
      Swal.fire({
        text: 'Propiedad añadida',
        icon: 'success'
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
}