import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedLayoutModule } from './layouts/unauthenticated/unauthenticated.module';
import { AuthenticatedLayoutModule } from './layouts/authenticated/authenticated.module';

import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    UnauthenticatedLayoutModule,
    AuthenticatedLayoutModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
