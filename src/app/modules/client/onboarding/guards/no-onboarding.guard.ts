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
import { Role } from 'src/app/core/user/role.model';
import { UserStatus } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Injectable()
export class NoOnboardingGuard implements CanActivate {
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

    // If user is admin
    if (currentRole === Role.Admin) {
      // Navigate based on current role
      this._navigateBasedOnRole(currentRole);

      // Prevent the access
      return of(false);
    }

    // If the user is not pending
    if (currentUser?.status !== UserStatus.Pending) {
      // Navigate based on current role
      this._navigateBasedOnRole(currentRole);

      // Prevent the access
      return of(false);
    }

    // Allow the access
    return of(true);
  }

  /**
   *
   * @param currentRole
   */
  private _navigateBasedOnRole(currentRole: any): void {
    if (currentRole === Role.Admin) {
      this._router.navigate(['/admin']);
    }

    if (currentRole === Role.Tutor) {
      this._router.navigate(['/tutor']);
    }

    if (currentRole === Role.Student) {
      this._router.navigate(['/student']);
    }
  }
}
