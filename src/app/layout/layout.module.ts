import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthenticatedLayoutModule } from './layouts/unauthenticated/unauthenticated.module';
import { AuthenticatedLayoutModule } from './layouts/authenticated/authenticated.module';

import { LayoutComponent } from './layout.component';
import { LoadingBarModule } from '../components/loading-bar/loading-bar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LoadingBarModule,
    UnauthenticatedLayoutModule,
    AuthenticatedLayoutModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
