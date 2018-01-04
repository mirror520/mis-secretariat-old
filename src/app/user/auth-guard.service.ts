import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isLoggedIn) {
      console.log('必須先登入使用者');
      this.userService.redirectUrl = state.url;
      this.router.navigate(['/login']);

      return false;
    }

    if (this.userService.currentUser.account === 'ar0660') {
      return true;
    }
  }
}
