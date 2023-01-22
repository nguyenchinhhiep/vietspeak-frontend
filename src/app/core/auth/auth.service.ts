import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  delay,
  Observable,
  of,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import { ApiEndpoint, ApiMethod, IApiResponse } from '../http/api.model';
import { HttpService } from '../http/services/http.service';
import { StorageKey, StorageType } from '../storage/storage.model';
import { StorageService } from '../storage/storage.service';
import { UserType } from '../user/user-type.model';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {
  // Create authenticated flag
  private _isAuthenticated: boolean = false;

  constructor(
    private _storageService: StorageService,
    private _httpService: HttpService,
    private _userService: UserService,
    private _router: Router
  ) {}

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    this._storageService.setItem(
      StorageType.Local,
      StorageKey.AccessToken,
      token
    );
  }

  get accessToken(): string {
    return (
      this._storageService.getItem(StorageType.Local, StorageKey.AccessToken) ||
      ''
    );
  }

  /**
   * Setter & getter for refresh token
   */
  set refreshToken(token: string) {
    this._storageService.setItem(
      StorageType.Local,
      StorageKey.RefreshToken,
      token
    );
  }

  get refreshToken(): string {
    return (
      this._storageService.getItem(
        StorageType.Local,
        StorageKey.RefreshToken
      ) || ''
    );
  }

  /**
   * Setter & getter for user email
   */

  set email(email: string) {
    this._storageService.setItem(StorageType.Local, StorageKey.Email, email);
  }

  get email(): string {
    return (
      this._storageService.getItem(StorageType.Local, StorageKey.Email) || ''
    );
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    // Check if the user is already signed in
    if (this._isAuthenticated) {
      throwError(() => 'User is already signed in.');
    }

    return this._httpService
      .request({
        apiUrl: ApiEndpoint.Login,
        method: ApiMethod.Post,
        body: credentials,
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          if (res.status === 'success') {
            // Set authenticated flag to true
            this._isAuthenticated = true;

            // Store access token in the local storage
            this.accessToken = res.data.accessToken;

            // Store refresh token in the local storage
            this.refreshToken = res.data.refreshToken;

            // Store user email in the local storage
            this.email = res.data.email;

            // Store the use on the user service
            this._userService.currentUser = res.data;
          }

          return of(res);
        }),
        shareReplay()
      );
  }

  /**
   * Sign Up
   *
   * @param user
   */
  register(user: { email: string; password: string }): Observable<any> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.Register,
        method: ApiMethod.Post,
        body: user,
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          // Set authenticated flag to true
          this._isAuthenticated = true;

          // Store access token in the local storage
          this.accessToken = res.data.accessToken;

          // Store refresh token in the local storage
          this.refreshToken = res.data.refreshToken;

          // Store user email in the local storage
          this.email = res.data.email;

          // Store the use on the user service
          this._userService.currentUser = res.data;

          return of(res);
        }),
        shareReplay()
      );
  }

  /**
   * Forgot password
   *
   * @param email
   * @returns
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.ForgotPassword,
        method: ApiMethod.Post,
        body: {
          email: email,
        },
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          return of(res);
        }),
        shareReplay()
      );
  }

  /**
   * Forgot password
   *
   * @param email
   * @returns
   */
  resetPassword(payload: {
    token: string;
    userId: string;
    password: string;
  }): Observable<any> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.PasswordReset,
        method: ApiMethod.Post,
        body: payload,
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          return of(res);
        }),
        shareReplay()
      );
  }

  /**
   * Sign out
   *
   * @returns
   */
  logout(): Observable<boolean> {
    // Set authenticated flag to true
    this._isAuthenticated = false;

    // Remove the access token from the local storage
    this._storageService.removeItem(StorageType.Local, StorageKey.AccessToken);

    // Remove the refresh token from the local storage
    this._storageService.removeItem(StorageType.Local, StorageKey.RefreshToken);

    // Remove the user email from the local storage
    this._storageService.removeItem(StorageType.Local, StorageKey.Email);

    // Return
    return of(true);
  }

  /**
   * Get new access token
   */
  getNewAccessToken(): Observable<boolean> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.RefreshToken,
        method: ApiMethod.Post,
        body: {
          email: this.email,
          refreshToken: this.refreshToken,
        },
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          if (res.status === 'success') {
            // Set authenticated flag to true
            this._isAuthenticated = true;

            // Store access token in the local storage
            this.accessToken = res.data.accessToken;

            // Store refresh token in the local storage
            this.refreshToken = res.data.refreshToken;

            // Store user email in the local storage
            this.email = res.data.email;

            // Store the use on the user service
            this._userService.currentUser = res.data;

            return of(true);
          }

          return of(false);
        }),
        catchError((_) => {
          // Return
          return of(false);
        }),
        shareReplay()
      );
  }

  /**
   * Handle authentication status
   */
  checkStatus(): Observable<boolean> {
    // Check if the user is already signed in
    if (this._isAuthenticated) {
      return of(true);
    }

    // Check if the access token is available
    if (!this.accessToken) {
      return of(false);
    }

    // Check if the access token is expired
    if (!AuthUtils.isTokenExpired(this.accessToken)) {
      if (this._userService.currentUserValue == null) {
        return this.getProfile();
      }
      return of(true);
    }

    // Get new access token
    return this.getNewAccessToken();
  }

  /**
   * Get user profile
   */
  getProfile(): Observable<boolean> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.Profile,
        method: ApiMethod.Get,
      })
      .pipe(
        switchMap((res: IApiResponse) => {
          // Store the use on the user service
          this._userService.currentUser = res.data;

          // Return
          return of(true);
        }),
        catchError((_) => of(false)),
        shareReplay()
      );
  }

  checkExistingEmail(email: string): Observable<boolean> {
    return this._httpService
      .request({
        apiUrl: ApiEndpoint.CheckExistingEmail,
        method: ApiMethod.Post,
        body: {
          email: email,
        },
      })
      .pipe(
        switchMap((res: IApiResponse<boolean>) => {
          return of(!!res.data);
        })
      );
  }

  /**
   * Check if user has claim
   * This method can be called a couple of different ways
   * *hasClaim="'claimType'" // Assumes claimValue is true
   * *hasClaim="'claimType:value'" // Compares claimValue to value
   * *hasClaim="['claimType1', 'claimType2:value', 'claimType3']"
   * @param claimType
   * @param claimValue
   * @returns
   */
  hasClaim(claimType: any, claimValue?: any): boolean {
    let result: boolean = false;
    if (typeof claimType === 'string') {
      result = this._isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;
      if (claims) {
        result = claims.some((item) => {
          return this._isClaimValid(item);
        });
      }
    }
    return result;
  }

  /**
   * Check if user claim valid
   * @param claimType
   * @param claimValue
   * @returns
   */
  private _isClaimValid(claimType: string, claimValue?: string): boolean {
    let result: boolean = false;

    // Retrieve the current user value
    const currentUser = this._userService.currentUserValue;
    if (currentUser) {
      // See if claim type has value 'clientType:value'
      if (claimType.indexOf(':') >= 0) {
        let words: string[] = claimType.split(':');
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      } else {
        claimType = claimType.toLowerCase();
        // Either get the claim value or assume 'true'
        claimValue = claimValue ? claimValue : 'true';
      }
      // Attempt to find the claim
      result =
        currentUser.claims?.find((item) => {
          return (
            item.claimType.toLowerCase() === claimType &&
            item.claimValue === claimValue
          );
        }) != null;
    }

    return result;
  }

  /**
   *
   * @param userType
   */
  navigateBasedOnUserType(userType: any): void {
    if (userType == null) {
      this._router.navigate(['/onboarding']);
    }

    if (userType === UserType.Student) {
      this._router.navigate(['/student']);
    }

    if (userType === UserType.Tutor) {
      this._router.navigate(['/tutor']);
    }

    if (userType === UserType.Admin) {
      this._router.navigate(['/admin']);
    }
  }
}
