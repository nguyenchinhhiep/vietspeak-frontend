import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
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

@Injectable()
export class OnboardingGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  /**
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // Get current url
    const currentUrl = state.url;
    return this._check(currentUrl);
  }

  /**
   *
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // Get current url
    const currentUrl = segments[0].path;
    return this._check(currentUrl);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Get current url
    const currentUrl = state.url;
    return this._check(currentUrl);
  }

  private _check(currentUrl: string): Observable<boolean> {
    // Get curren user
    const currentUser = this._userService.currentUserValue;

    // Get current user UserType
    const currentUserType = currentUser?.userType;

    // If user is admin
    if (currentUserType === UserType.Admin) {
      // Navigate based on current UserType
      this._navigateBasedOnUserType(currentUserType);

      // Prevent the access
      return of(false);
    }

    // If the user is not pending
    if (
      currentUser?.status !== UserStatus.Pending &&
      currentUser?.status !== UserStatus.Reviewing
    ) {
      // Navigate based on current UserType
      this._navigateBasedOnUserType(currentUserType);

      // Prevent the access
      return of(false);
    }

    // Allow the access
    return of(true);
  }

  /**
   *
   * @param type
   */
  private _navigateBasedOnUserType(type: any): void {
    if (type === UserType.Admin) {
      this._router.navigate(['/admin']);
    }

    if (type === UserType.Tutor) {
      this._router.navigate(['/tutor']);
    }

    if (type === UserType.Student) {
      this._router.navigate(['/student']);
    }
  }
}
