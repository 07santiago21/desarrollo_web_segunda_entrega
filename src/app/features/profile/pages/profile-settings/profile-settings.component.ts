import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { Router, RouterModule } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../auth/services/user.service';
import { Signal } from '@angular/core';
import { SignalUser } from '../../../../auth/interfaces/signal-user';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { SupabaseService } from '../../../properties/services/supabase.service';
import {v4 as uuidv4} from 'uuid';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule,HttpClientModule, CommonModule],
  providers: [ProfileService],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent {


  editProfileForm:FormGroup;
  userSignal!: Signal<SignalUser>
  profileServices;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(private fb: FormBuilder, private router: Router,private userService: UserService,private profileService:ProfileService,
    private supabaseService: SupabaseService
  ) {

    this.userSignal = this.userService.userSignal;
    this.profileServices = this.profileService
  

    this.editProfileForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    email: [''],
    password: [''],
    bio: [''],
  });

}


  async onEditProfile(){

    let userName = this.editProfileForm.value.userName||'';
    let password = this.editProfileForm.value.password||''; 
    let email = this.editProfileForm.value.email||'';
    let bio = this.editProfileForm.value.bio||'';
    let profile_picture = '';

    if(this.selectedFile){
      profile_picture = await this.uploadProfileImage();
    }



    var user_id = this.userSignal().user_id
    if (user_id){
      const response = this.profileServices.updateUser(user_id,userName,password,email,bio,profile_picture)
      
      if (response) {
        Swal.fire({
          text: 'perfil editado',
          icon: 'success'
        });
      }
    }



    

  }

  async uploadProfileImage(): Promise<any>{
    if(!this.selectedFile)return null;
    const fileName = `${uuidv4()}.${this.selectedFile.name.split('.').pop()}`;
    const foldername = 'profile_images';

    try{
      const publicUrl = await this.supabaseService.upload(this.selectedFile, fileName, foldername);
      return publicUrl;
    } catch(error){
      console.error('Error subiendo la imagen:', error);
      return null;
    }
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
