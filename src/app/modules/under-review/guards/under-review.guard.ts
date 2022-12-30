import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserType } from 'src/app/core/user/user-type.model';
import { UserStatus } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class UnderReviewGuard
  implements CanActivate, CanActivateChild, CanLoad
{
  constructor(private _router: Router, private _userService: UserService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._check();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this._check();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._check();
  }

  private _check(): Observable<boolean> {
    // Get curren user
    const currentUser = this._userService.currentUserValue;

    // Get current user stutus
    const currentStatus = currentUser?.status;

    // If user is admin
    if (currentUser?.userType === UserType.Admin) {
      // Navigate to the root url
      this._router.navigate(['/']);

      // Prevent the access
      return of(false);
    }

    // If the user is not under review
    if (currentStatus !== UserStatus.Reviewing) {
      // Navigate to the root url
      this._router.navigate(['/']);

      //  Prevent the access
      return of(false);
    }

    // Allow the access
    return of(true);
  }
}
