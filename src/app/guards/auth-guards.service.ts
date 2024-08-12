import { UserService } from './../Services/user/user.service';
import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements  CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      console.log('User not logged in, redirecting to home page');
      this.router.navigate(['/home']);
      return false;
    }
    console.log('User logged in, access granted to dashboard');
    return true;
  }
}
