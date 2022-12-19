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
import { Role } from 'src/app/core/user/role.model';
import { UserStatus } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Injectable()
export class OnboardingGuard implements CanActivate, CanActivateChild, CanLoad {
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

    // Get current user role
    const currentRole = currentUser?.role;

    // If current url is onboarding
    if (currentUrl.includes('onboarding')) {
      // If user is pending
      if (currentUser?.status === UserStatus.Pending) {
        // Handle based on current role
        this._checkRole(currentRole);

        // Allow the access
        return of(true);
      }

      // Redirect to the root
      this._router.navigate(['']);

      // Prevent the access
      return of(false);
    }

    // If user is pending
    if (currentUser?.status === UserStatus.Pending) {
      // Handle based on current role
      this._checkRole(currentRole);

      // Prevent the access
      return of(false);
    }

    // Allow the access
    return of(true);
  }

  private _checkRole(currentRole: any): void {
    if (currentRole == null) {
      this._router.navigate(['/onboarding']);
    }

    if (currentRole === Role.Student) {
      this._router.navigate(['/onboarding/student']);
    }

    if (currentRole === Role.Tutor) {
      this._router.navigate(['/onboarding/tutor']);
    }
  }
}
