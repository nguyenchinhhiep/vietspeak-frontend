import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  /**
   *
   * @param req
   * @param next
   * @returns
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request object
    let newReq = req.clone();

    // Check if the request url is the server url
    const isServerUrl = req.url.startsWith(environment.serverUrl);

    if (
      this._authService.accessToken &&
      !AuthUtils.isTokenExpired(this._authService.accessToken) &&
      isServerUrl
    ) {
      // Get access token
      const accessToken = this._authService.accessToken;

      // Add acess token to the request header
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(newReq);
  }
}
