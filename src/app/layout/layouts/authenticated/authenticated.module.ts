import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from '../admin/admin.module';
import { BlankLayoutModule } from '../blank/blank.module';
import { TutorLayoutModule } from '../tutor/tutor.module';
import { StudentLayoutModule } from '../student/student.module';

import { AuthenticatedLayoutComponent } from './authenticated.component';

@NgModule({
  declarations: [AuthenticatedLayoutComponent],
  imports: [
    CommonModule,
    AdminLayoutModule,
    BlankLayoutModule,
    TutorLayoutModule,
    StudentLayoutModule,
  ],
  exports: [AuthenticatedLayoutComponent],
})
export class AuthenticatedLayoutModule {}
