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
import { switchMap } from 'rxjs/operators';
import { Logger } from '../../logger/logger.service';
import { UserType } from '../../user/user-type.model';
import { IUser } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

const log = new Logger('NoAuthGuard');

@Injectable()
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  /**
   *
   * @param childRoute
   * @param state
   * @returns
   */
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

  /**
   *
   * @param route
   * @param segments
   * @returns
   */
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
    return this._check();
  }

  private _check(): Observable<boolean> {
    return this._authService.checkStatus().pipe(
      switchMap((authenticated: boolean) => {
        // If the user is already authenticated
        if (authenticated) {
          log.debug('already authenticated, redirecting...');

          // Get the current user value
          const currentUser: IUser | null = this._userService.currentUserValue;

          // Redirect to the root
          this._authService.navigateBasedOnUserType(currentUser?.userType);

          // Prevent the access
          return of(false);
        }

        // Allow the access
        return of(true);
      })
    );
  }
}
