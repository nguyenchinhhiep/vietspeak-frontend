import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Data,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Logger } from '../../logger/logger.service';
import { IUser } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

const log = new Logger('AuthGuard');

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userSevice: UserService
  ) {}

  /**
   *
   * @param route
   * @param state
   * @returns
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Get redirect url
    const redirectUrl = state.url;

    // Get route data
    const routeData = route.data;

    return this._check(redirectUrl, routeData);
  }

  private _check(redirectUrl: string, routeData?: Data): Observable<boolean> {
    return this._authService.checkStatus().pipe(
      switchMap((authenticated: boolean) => {
        // If the user is not authenticated
        if (!authenticated) {
          log.debug('Not authenticated, redirecting...');

          // Redirect to sign in page
          this._router.navigate(['/', 'login'], {
            queryParams: { redirectUrl: redirectUrl },
          });

          // Prevent the access
          return of(false);
        }

        // Check if the route is restricted by role
        if (routeData && routeData['roles']) {
          // Get the current user value
          const currentUser: IUser | null = this._userSevice.currentUserValue;

          // Check if the current user role is allowed
          if (!routeData['roles'].includes(currentUser!.role)) {
            log.debug('Not authorized, redirecting...');

            // Redirect to the root
            this._router.navigate(['']);

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        }

        // Allow the access
        return of(true);
      })
    );
  }
}
