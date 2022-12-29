import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLayoutComponent } from './student.component';
import { RouterModule } from '@angular/router';
import { StudentHeaderModule } from './components/header/header.module';
import { UserModule } from '../../../components/user/user.module';

@NgModule({
  declarations: [StudentLayoutComponent],
  imports: [CommonModule, StudentHeaderModule,UserModule, RouterModule],
  exports: [StudentLayoutComponent],
})
export class StudentModule {}
