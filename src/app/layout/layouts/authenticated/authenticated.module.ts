import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from '../admin/admin.module';
import { BlankLayoutModule } from '../blank/blank.module';

import { AuthenticatedLayoutComponent } from './authenticated.component';

@NgModule({
  declarations: [AuthenticatedLayoutComponent],
  imports: [CommonModule, AdminLayoutModule, BlankLayoutModule],
  exports: [AuthenticatedLayoutComponent],
})
export class AuthenticatedLayoutModule {}
