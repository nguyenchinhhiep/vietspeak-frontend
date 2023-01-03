import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../../logger/logger.service';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from 'src/app/components/toast/toast.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _toastService: ToastService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this._errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private _errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      log.error('A client-side or network error occurred.');
    } else if ([401, 403].includes(error.status)) {
      // Do something with authentication error
      log.error('Authentication error.');
      // this._authService.signOut();
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // Do something with the error
      log.error('Request error', error);
    }

    console.log(error)

    // Display toast
    this._toastService.open({
      message: error.message || 'Something went wrong!',
      configs: {
        payload: {
          type: 'error',
        },
      },
    });

    // Return an observable with a user-facing error message.
    return throwError(() => ({
      status: error.status,
      statusText: error.statusText,
      message: error.message,
    }));
  }
}
