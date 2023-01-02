import { NgModule } from '@angular/core';
import { StudentHeaderComponent } from './header.component';
import { UserModule } from 'src/app/components/user/user.module';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StudentHeaderComponent],
  imports: [LanguagesModule, UserModule, MatIconModule, RouterModule],
  exports: [StudentHeaderComponent],
})
export class StudentHeaderModule {}
