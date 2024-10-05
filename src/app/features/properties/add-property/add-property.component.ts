import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import Swal from 'sweetalert2';
import { PropertyService } from '../services/property.service';
import { SupabaseService } from '../services/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent {
  addPropertyForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private propertyService: PropertyService, 
    private supabaseService: SupabaseService // Inyección del servicio aquí
  ) {
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
    });
  }

  async onSubmit() {
    if (!this.addPropertyForm.valid) {
      Swal.fire({
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }

    const imageUrl = await this.uploadImage();
    let property = this.addPropertyForm.value;
    const user_id = this.propertyService.getUser_id();
    property = {user_id: user_id, photos:imageUrl, ...property};

    try {
      let response = this.propertyService.addProperty(property);

      if (response.success) {
        Swal.fire({
          text: 'Propiedad añadida',
          icon: 'success'
        });
      }
    } catch (error) {
      console.error('error añadiendo la propiedad', error);
    }
  }

  onFileSelected(event: Event) {
    let inputFile = event.target as HTMLInputElement;
    if (!inputFile.files || inputFile.files.length <= 0) {
      return;
    }

    this.selectedFile = inputFile.files[0];
  }

  async uploadImage(): Promise<string | null>{
    if (!this.selectedFile) return null;

    const fileName = `${uuidv4()}.${this.selectedFile.name.split('.').pop()}`;
    const foldername = 'property_images';

    try {
      const publicUrl = this.supabaseService.upload(this.selectedFile, fileName, foldername);
      return publicUrl;
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      return null;
    }
  }
}
