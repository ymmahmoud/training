import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService, SocialUser} from 'angularx-social-login';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // All requests on guarded routes should still be verified server side of course, this is just an additional layer
      if (localStorage.getItem('id_token') == null) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
  }
}
