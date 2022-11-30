import { NgModule } from '@angular/core';
import { LanguagesComponent } from './languages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LanguagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatButtonModule,
    MatDividerModule,
  ],
  exports: [LanguagesComponent],
})
export class LanguagesModule {}
