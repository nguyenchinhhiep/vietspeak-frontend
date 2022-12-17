import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentHeaderComponent } from './header.component';
import { UserModule } from 'src/app/layout/components/user/user.module';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StudentHeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    LanguagesModule,
    UserModule,
    MatIconModule,
  ],
  exports: [StudentHeaderComponent],
})
export class StudentHeaderModule {}
