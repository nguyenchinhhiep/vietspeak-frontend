import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
// import { HttpCacheInterceptor } from './interceptors/http-cache.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HttpCacheService } from './services/http-cache.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    HttpCacheService,
    HttpService,
  ],
})
export class HttpModule {}
