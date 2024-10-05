import { Injectable } from '@angular/core';
import { User } from '../../../auth/interfaces/user';
import { UserService } from '../../../auth/services/user.service';
import { ProfileResponse } from '../interfaces/profile_response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userSignal
  
  constructor(private userService: UserService) {

    this.userSignal = this.userService.userSignal;
    userService.getUser()
  
  }

  updateUser(userId: number,userName:string,password:string,email:string,bio:string,profile_picture:string): ProfileResponse{


    let usuarios: Array<User> = JSON.parse(localStorage.getItem("users")|| "[]")

    const userIndex = usuarios.findIndex(user => user.user_id === userId);
  
    if (userIndex !== -1) {
      const currentUser = usuarios[userIndex];
      
      usuarios[userIndex] = {
        ...currentUser,
        username: userName !== '' ? userName : currentUser.username,
        password: password !== '' ? password : currentUser.password,
        email: email !== '' ? email : currentUser.email,
        bio: bio !== '' ? bio : currentUser.bio,
        profile_picture: profile_picture !== '' ? profile_picture : currentUser.profile_picture
      };

      this.setUser(usuarios[userIndex])
      localStorage.setItem("users",JSON.stringify(usuarios))

    } else {
      console.log('Usuario no encontrado');
    }

    return {
      success: true
    };
  }


  private setUser(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.userSignal.set(user);
  }
  

  
}
