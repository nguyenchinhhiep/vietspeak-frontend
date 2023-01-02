import { NgModule } from '@angular/core';
import { TutorHeaderComponent } from './header.component';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { UserModule } from 'src/app/components/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TutorHeaderComponent],
  imports: [
    LanguagesModule,
    UserModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [TutorHeaderComponent],
})
export class TutorHeaderModule {}
