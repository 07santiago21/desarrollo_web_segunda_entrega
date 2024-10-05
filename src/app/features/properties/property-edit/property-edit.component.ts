import { SupabaseService } from './../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PropertyService } from '../services/property.service'; 
import { v4 as uuidv4 } from 'uuid'; // Import UUID

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [PropertyService],
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {
  id: string | null = null; 
  editPropertyForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private propertyService: PropertyService, 
    private supabaseService: SupabaseService,
    private router: Router // Inject Router
  ) {
    this.editPropertyForm = this.fb.group({
      title: ['', []],
      description: ['', []],
      address: ['', []],
      latitude: ['', []],
      longitude: ['', []], 
      price_per_night: ['', []],
      rooms: ['', []],
      bathrooms: ['', []],
      max_capacity: ['', []],
      photos: ['', []]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  async onSubmit() {
    const update_property = this.editPropertyForm.value;
    if (this.id) {
      const property = this.propertyService.getPropertyById(this.id);
      if (!property) {
        Swal.fire({
          text: 'Propiedad no encontrada',
          icon: 'error'
        });
        return;
      }
      let imageUrl = property.photos;
      if (this.selectedFile) {
        const uploadResult = await this.uploadImage();
        if (uploadResult) {
          imageUrl = uploadResult;
        } else {
          Swal.fire({
            text: 'Error subiendo la imagen',
            icon: 'error'
          });
          return;
        }
      }

      const updatedProperty = {...update_property, photos: imageUrl};
      const response = this.propertyService.updateProperty_(property, updatedProperty);

      if (response.success) {
        Swal.fire({
          text: 'Propiedad editada',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/owner-filtering']); 
        });
      } else {
        Swal.fire({
          text: 'Error al editar',
          icon: 'error'
        });
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  async uploadImage(): Promise<string | null> {
    if (!this.selectedFile) return null;

    const fileName = `${uuidv4()}.${this.selectedFile.name.split('.').pop()}`;
    const foldername = 'property_images';

    try {
      const publicUrl = await this.supabaseService.upload(this.selectedFile, fileName, foldername);
      return publicUrl;
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
    }
    return null;
  }

  onCancel() {
    this.router.navigate(['/owner-filtering']); 
  }
}
