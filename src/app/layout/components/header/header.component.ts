import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule] 
})
export class HeaderComponent implements OnInit {
  menuVisible = false;
  isLoggedIn = false; 
  isOwner = false; 
  currentRoute: string = '';

  constructor(private router: Router,private userService:UserService ) {}

  ngOnInit() {
    
    this.userService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; 
    });

    // Suscribirse a cambios de isOwner
    this.userService.owner$.subscribe(owner => {
      this.isOwner = owner; 
    });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {

    this.userService.logout()
    this.router.navigate(['']);
    
  }

}