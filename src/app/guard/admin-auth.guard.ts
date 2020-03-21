import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


    let type = '';

    if ( this.auth.isAuthenticated === true ) {
      const user = this.userService.getUserData(this.auth.id);
      type = user.type;
    }

    if ( this.auth.isAuthenticated !== true || type !== 'admin' ) {
      console.log('Access Denied');
      this.router.navigate(['/visitor']);
    }

    return true;
  }
}
