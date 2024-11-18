import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../auth/interfaces/user';
import { UserService } from '../../../auth/services/user.service';
import { ProfileResponse } from '../interfaces/profile_response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/user'; // api
  userSignal;

  constructor(private userService: UserService, private http: HttpClient) {
    this.userSignal = this.userService.userSignal;
    userService.getUser();
  }

  updateUser(userId: number, userName: string, password: string, email: string, bio: string, profile_picture: string): Observable<ProfileResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const updateUserDto = {
      user_id: userId,
      username: userName,
      password: password,
      email: email,
      bio: bio,
      profile_picture: profile_picture
    };
    return this.http.patch<ProfileResponse>(`${this.apiUrl}/${userId}`, updateUserDto, { headers });
  }

  private setUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }
}