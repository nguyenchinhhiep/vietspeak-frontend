import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiEndpoint, ApiMethod } from '../http/api.model';
import { HttpService } from '../http/services/http.service';
import { StorageKey, StorageType } from '../storage/storage.model';
import { StorageService } from '../storage/storage.service';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthService {
  // Create authenticated flag
  private _isAuthenticated: boolean = false;

  constructor(
    private _storageService: StorageService,
    private _httpService: HttpService,
    private _userService: UserService
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
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Check if the user is already signed in
    if (this._isAuthenticated) {
      throwError(() => 'User is already signed in.');
    }

    return this._httpService
      .request({
        apiUrl: ApiEndpoint.SignIn,
        method: ApiMethod.Post,
        body: credentials,
      })
      .pipe(
        switchMap((res: any) => {
          // Set authenticated flag to true
          this._isAuthenticated = true;

          // Store access token in the local storage
          this.accessToken = res.accessToken;

          // Store refresh token in the local storage
          this.refreshToken = res.refreshToken;

          // Store the use on the user service
          this._userService.currentUser = res.user;

          return of(res);
        })
      );
  }

  /**
   * Sign Up
   *
   * @param user
   */
  signUp(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<any> {
    return this._httpService.request({
      apiUrl: ApiEndpoint.SignUp,
      method: ApiMethod.Post,
      body: user,
    });
  }

  /**
   * Forgot password
   *
   * @param email
   * @returns
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpService.request({
      apiUrl: ApiEndpoint.ForgotPassword,
      method: ApiMethod.Post,
      body: email,
    });
  }

  /**
   * Sign out
   *
   * @returns
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    this._storageService.removeItem(StorageType.Local, StorageKey.AccessToken);

    // Return the observable
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
          refreshToken: this.refreshToken,
        },
      })
      .pipe(
        switchMap((res: any) => {
          // Set authenticated flag to true
          this._isAuthenticated = true;

          // Store access token in the local storage
          this.accessToken = res.accessToken;

          // Store refresh token in the local storage
          this.refreshToken = res.refreshToken;

          // Store the use on the user service
          this._userService.currentUser = res.user;

          return of(true);
        }),
        catchError((_) => of(false))
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
      return of(true);
    }

    // Get new access token
    return this.getNewAccessToken();
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
        currentUser.claims.find((item) => {
          return (
            item.claimType.toLowerCase() === claimType &&
            item.claimValue === claimValue
          );
        }) != null;
    }

    return result;
  }
}
