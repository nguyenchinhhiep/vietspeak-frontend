import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorHeaderComponent } from './header.component';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { UserModule } from 'src/app/layout/components/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TutorHeaderComponent],
  imports: [CommonModule, SharedModule, LanguagesModule, UserModule, MatIconModule, RouterModule],
  exports: [TutorHeaderComponent],
})
export class TutorHeaderModule {}
