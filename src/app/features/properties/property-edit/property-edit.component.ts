import { SupabaseService } from './../services/supabase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PropertyService } from '../services/property.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { Property } from '../interfaces/property.interface';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [PropertyService],
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css'],
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
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      price_per_night: ['', [Validators.required]],
      rooms: ['', [Validators.required]],
      bathrooms: ['', [Validators.required]],
      max_capacity: ['', [Validators.required]],
      photos: ['', []], // Optional, as it depends on file selection
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la propiedad desde la URL
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        // Obtener datos de la propiedad
        this.propertyService.getPropertyById(this.id).subscribe(
          (property: Property) => {
            this.editPropertyForm.patchValue(property); // Cargar datos en el formulario
            this.imagePreview = property.photos; // Mostrar la imagen actual
          },
          (error) => {
            console.error('Error al cargar la propiedad:', error);
            Swal.fire({
              text: 'No se pudo cargar la propiedad.',
              icon: 'error',
            });
          }
        );
      }
    });
  }

  async onSubmit() {
    if (!this.editPropertyForm.valid) {
      Swal.fire({
        text: 'Debe completar todos los campos.',
        icon: 'error',
      });
      return;
    }

    // Preparar el objeto actualizado
    const update_property = this.editPropertyForm.value;

    if (this.id) {
      let imageUrl = this.imagePreview; // Mantener la imagen actual si no se selecciona una nueva
      if (this.selectedFile) {
        const uploadResult = await this.uploadImage();
        if (uploadResult) {
          imageUrl = uploadResult;
        } else {
          Swal.fire({
            text: 'Error al subir la nueva imagen.',
            icon: 'error',
          });
          return;
        }
      }

      // Agregar URL de imagen a los datos actualizados
      const updatedProperty = {
        ...update_property,
        photos: imageUrl,
        latitude: Number(update_property.latitude),
        longitude: Number(update_property.longitude),
        price_per_night: Number(update_property.price_per_night),
        rooms: Number(update_property.rooms),
        bathrooms: Number(update_property.bathrooms),
        max_capacity: Number(update_property.max_capacity),
      };

      // Llamar al servicio para actualizar la propiedad
      this.propertyService.updateProperty(this.id, updatedProperty).subscribe(
        (response) => {
          Swal.fire({
            text: 'Propiedad actualizada exitosamente.',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/owner-filtering']);
          });
        },
        (error) => {
          console.error('Error al actualizar la propiedad:', error);
          Swal.fire({
            text: 'No se pudo actualizar la propiedad.',
            icon: 'error',
          });
        }
      );
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result; // Mostrar previsualización de la imagen
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
      console.error('Error al subir la imagen:', error);
    }
    return null;
  }

  onCancel() {
    this.router.navigate(['/owner-filtering']);
  }
}
