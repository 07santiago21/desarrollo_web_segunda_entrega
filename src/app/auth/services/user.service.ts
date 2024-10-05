import { Injectable, signal } from '@angular/core';
import { SignalUser } from '../interfaces/signal-user';
import { Signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/auth_response';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInSubject = new BehaviorSubject<boolean>(false); 
  private ownerSubject = new BehaviorSubject<boolean>(false); 


  loggedIn$ = this.loggedInSubject.asObservable();
  owner$ = this.ownerSubject.asObservable(); 
  

  userSignal = signal<SignalUser>({user_id:null ,username: '',password:'',email:'',bio:'',is_owner:null,profile_picture:''});
  isLoggedIn = false; 
  isOwner = false; 
  Swal: any;

  login(userName: string, password: string): LoginResponse{
    const usuarios: Array<User> = JSON.parse(localStorage.getItem("users")|| "[]")

    if (!(usuarios.length === 0)){

        const existe = usuarios.find(item => item.username === userName  && item.password === password)
        if(existe){
          this.setUser(existe);
          
          this.logged_user(existe.is_owner)
          
          console.log('Signal updated:', this.userSignal());
          
          return {
            success: true,
            is_owner:existe.is_owner
            
          }

        }

    }
    
    return {
      success: false,
      message: 'Usuario o contraseña incorrectos'
    }    

  }

  register(user:User): SignUpResponse{
    let usersArray = localStorage.getItem('users');
    let users: Array<User> = usersArray ? JSON.parse(usersArray): [];

    let existe = users.find(item => item.username.toLowerCase() === user.username.toLowerCase());

    if(existe){
      return {
        success: false,
        message: 'Usuario ya existe'
      }
    }

    

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    this.setUser(user);

    this.logged_user(user.is_owner)

    return {
      success: true,
      is_owner: user.is_owner
    };

  }

  private setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }

  removeUser() {
    localStorage.removeItem('loggedUser');
    this.userSignal.set({user_id:null ,username: '',password:'',email:'',bio:'',is_owner:null,profile_picture:''}); 
}

  getUser(){
    const userSrt = localStorage.getItem('loggedUser');
    if(userSrt){
      const user = JSON.parse(userSrt);
      this.userSignal.set(user);
    }
    return this.userSignal;
  }

  usernameValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const validUsername = /^[A-Za-z][A-Za-z0-9]{7,14}$/.test(control.value);

      return validUsername ? null : {invalidUsername: true};
    }
  }


  
  passwordValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const validPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@*$#&])[A-Za-z0-9@$*#&]{12,20}$/.test(control.value);

      return validPassword ? null : {invalidPassword: true};
    }
  }

  


  logout() {

    this.isLoggedIn = false;
    this.isOwner = false;
    this.removeUser();

    this.loggedInSubject.next(false); // Notifica que el usuario ha cerrado sesión
    this.ownerSubject.next(false); // Notifica que el usuario no es propietario
    
  }


  logged_user(is_owner:boolean){
    this.isLoggedIn = true; // Asigna el valor a isLoggedIn
    this.isOwner = is_owner; // Asigna el valor a isOwner

    this.loggedInSubject.next(true); // Notifica el cambio
    this.ownerSubject.next(is_owner); // Notifica el cambio

  }




}



