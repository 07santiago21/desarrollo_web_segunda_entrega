import { Injectable, signal } from '@angular/core';
import { SignalUser } from '../interfaces/signal-user';
import { Signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, SignUpResponse } from '../interfaces/auth_response';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { UserResponse } from '../interfaces/user-response';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}

  private loggedInSubject = new BehaviorSubject<boolean>(false); 
  private ownerSubject = new BehaviorSubject<boolean>(false); 


  loggedIn$ = this.loggedInSubject.asObservable();
  owner$ = this.ownerSubject.asObservable(); 
  

  userSignal = signal<SignalUser>({user_id:null ,username: '',password:'',email:'',bio:'',is_owner:null,profile_picture:''});
  isLoggedIn = false; 
  isOwner = false; 
  Swal: any;

  login(userName: string, password: string): Observable<LoginResponse>{
    const body = {
      "username": userName,
      "password": password
    }

    return this.http.post<UserResponse>('http://localhost:3000/user/login', body).pipe(
      tap(response =>{
        console.log('hola');
        const decodedToken = jwtDecode(response.token) as User;
        console.log(decodedToken);
        this.setUser(decodedToken);
        sessionStorage.setItem('token', response.token);
      }),
      map(() => {return {success:true}})
    );

  }

  register(user:User): Observable<SignUpResponse>{
    const body = {
      "username": user.username,
      "email": user.email,
      "password": user.password,
      "profile_picture": user.profile_picture,
      "bio": user.bio,
      "is_owner": user.is_owner
    }
    return this.http.post<UserResponse>('http://localhost:3000/user', body).pipe(
      tap(response=>{
        this.setUser(user);
        console.log(response.token);
        sessionStorage.setItem('token', response.token);
      }),
      map(()=>{return {success:true}})
    )

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
    this.ownerSubject.next(false);
    sessionStorage.clear(); // Notifica que el usuario no es propietario
    
  }


  logged_user(is_owner:boolean){
    this.isLoggedIn = true; // Asigna el valor a isLoggedIn
    this.isOwner = is_owner; // Asigna el valor a isOwner

    this.loggedInSubject.next(true); // Notifica el cambio
    this.ownerSubject.next(is_owner); // Notifica el cambio

  }




}



