import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signUpForm = this.fb.group({
      user_id: ['', [Validators.required]],
      username: ['', [Validators.required, this.userService.usernameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.userService.passwordValidator()]],
      profile_picture: [''],
      bio: [''],
      is_owner: [false]
    });
  }

  onRegister(){
    if(!this.signUpForm.valid){
      Swal.fire({
        text: 'ingrese bien los datos',
        icon: 'error'
      })
      return;
    }

    let user_id = this.signUpForm.value.user_id || '';
    let username = this.signUpForm.value.username || '';
    let email = this.signUpForm.value.email || '';
    let password = this.signUpForm.value.password || '';
    let profile_picture = this.signUpForm.value.profile_picture || '';
    let bio = this.signUpForm.value.bio || '';
    let is_owner = this.signUpForm.value.is_owner || false;
    console.log(is_owner);



    this.userService.register({user_id, username, email, password, profile_picture, bio, is_owner}).subscribe({
      next: () => this.goToUrl('/owner-filtering'),
      error: error => Swal.fire({
        text: error.error.message,
        icon: 'error'
      })
    })

  }



  goToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}