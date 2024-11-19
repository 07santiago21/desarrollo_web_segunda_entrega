import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'] 
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signInForm = this.fb.group({
      userName: ['', [Validators.required, this.userService.usernameValidator]],
      password: ['', [Validators.required, this.userService.passwordValidator]]
    });
  }

  onLogin() {
    if (!this.signInForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }

    let userName = this.signInForm.value.userName || '';
    let password = this.signInForm.value.password || '';

    this.userService.login(userName, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/owner-filtering');
      },
      error: error => {
        Swal.fire({
          title: 'Ingreso',
          text: error.error.message,
          icon: 'error'
        });
      }
    });

  }

  navigateToSignUp() {
    this.router.navigate(['/sign-up']); 
  }
}