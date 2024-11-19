import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../auth/services/user.service';
import { Signal } from '@angular/core';
import { SignalUser } from '../../../../auth/interfaces/signal-user';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [ProfileService],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  editProfileForm: FormGroup;
  userSignal!: Signal<SignalUser>;
  profileServices;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.userSignal = this.userService.userSignal;
    this.profileServices = this.profileService;

    this.editProfileForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      email: [''],
      password: [''],
      bio: [''],
      profile_picture: ['']
    });
  }

  profile = {
    img: 'path/to/image.jpg',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  saveProfile() {
    console.log('Profile saved', this.profile);
  }

  onEditProfile() {
    let userName = this.editProfileForm.value.userName || '';
    let password = this.editProfileForm.value.password || '';
    let email = this.editProfileForm.value.email || '';
    let bio = this.editProfileForm.value.bio || '';
    let profile_picture = this.editProfileForm.value.profile_picture || '';

    var user_id = this.userSignal().user_id;
    if (user_id) {
      this.profileServices.updateUser(user_id, userName, password, email, bio, profile_picture).subscribe(
        (response) => {
          if (response.success) {
            Swal.fire({
              text: 'Perfil editado',
              icon: 'success'
            });
          } else {
            Swal.fire({
              text: 'Error al editar el perfil',
              icon: 'error'
            });
          }
        },
        (error) => {
          Swal.fire({
            text: 'Error al editar el perfil',
            icon: 'error'
          });
          console.error('Error updating profile:', error);
        }
      );
    }

    console.log(userName, password, email, bio, profile_picture);
    console.log(this.userSignal());
  }

  navigateToHome() {
    this.router.navigate(['']); 
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]){
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }
}