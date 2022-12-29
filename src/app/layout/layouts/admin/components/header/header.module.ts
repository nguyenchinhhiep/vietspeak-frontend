import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './header.component';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { UserModule } from 'src/app/components/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminHeaderComponent],
  imports: [CommonModule, LanguagesModule, UserModule, MatIconModule, MatButtonModule, RouterModule],
  exports: [AdminHeaderComponent],
})
export class AdminHeaderModule {}
