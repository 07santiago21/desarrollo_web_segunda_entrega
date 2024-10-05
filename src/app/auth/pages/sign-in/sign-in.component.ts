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
  

  constructor(private fb:FormBuilder, private router:Router, private userService:UserService){
    this.signInForm = this.fb.group({
      userName:['', [Validators.required, this.userService.usernameValidator]],
      password:['', [Validators.required, this.userService.passwordValidator]]
    })
  }

  onLogin(){

    
    if (!this.signInForm.valid){
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error'
      });
      return;
    }

    let userName = this.signInForm.value.userName||'';
    let password = this.signInForm.value.password||'';
    let response = this.userService.login(userName, password);

    if (response.success){
      if (response.is_owner){
        this.router.navigateByUrl('/owner-filtering');
      }
      else{

        this.router.navigateByUrl('/user');
      }

    }else{


      Swal.fire({
        title: 'Ingreso',
        text: response.message,
        icon: 'error'
      });
    }
    
  }

}