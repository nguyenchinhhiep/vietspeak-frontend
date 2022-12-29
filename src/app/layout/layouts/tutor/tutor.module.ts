import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorLayoutComponent } from './tutor.component';
import { RouterModule } from '@angular/router';
import { TutorHeaderModule } from './components/header/header.module';
import { UserModule } from '../../../components/user/user.module';

@NgModule({
  declarations: [TutorLayoutComponent],
  imports: [CommonModule, TutorHeaderModule, UserModule, RouterModule],
  exports: [TutorLayoutComponent],
})
export class TutorLayoutModule {}
