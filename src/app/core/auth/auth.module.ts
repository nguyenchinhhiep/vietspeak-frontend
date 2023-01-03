import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NoAuthGuard } from './guards/no-auth.guard';
import { HasClaimDirective } from './has-claim.directive';

@NgModule({
  declarations: [HasClaimDirective],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    AuthGuard,
    NoAuthGuard,
  ],
})
export class AuthModule {}
