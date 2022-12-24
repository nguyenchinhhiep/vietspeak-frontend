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
    | Promise<boolean | UrlTree>
    {
    return this._check();
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
    | Promise<boolean | UrlTree>
    {
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

    // Get current user role
    const currentRole = currentUser?.role;

    // If the user is pending
    if (currentUser?.status === UserStatus.Pending) {
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
    if (currentRole == null) {
      this._router.navigate(['/onboarding']);
    }

    if (currentRole === Role.Admin) {
      this._router.navigate(['/admin']);
    }

    if (currentRole === Role.Student) {
      this._router.navigate(['/onboarding/student']);
    }

    if (currentRole === Role.Tutor) {
      this._router.navigate(['/onboarding/tutor']);
    }
  }
}
