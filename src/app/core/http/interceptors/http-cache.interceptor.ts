import {
  HttpContextToken,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from '../services/http-cache.service';

export const CACHEABLE = new HttpContextToken(() => true);

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private _httpCacheService: HttpCacheService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // only cache requests configured to be cacheable
    if (!request.context.get(CACHEABLE)) {
      return next.handle(request);
    }
    // pass along non-cacheable requests
    if (request.method !== 'GET') {
      this._httpCacheService.cleanCache();
      return next.handle(request);
    }
    // attempt to retrieve a cached response
    const cachedResponse = this._httpCacheService.getCacheData(
      request.urlWithParams
    );
    // return cached response
    if (cachedResponse) {
      return of(cachedResponse);
    }
    // send request to server and add response to cache
    return next.handle(request).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          this._httpCacheService.setCacheData(request.urlWithParams, event);
        }
      })
    );
  }
}
