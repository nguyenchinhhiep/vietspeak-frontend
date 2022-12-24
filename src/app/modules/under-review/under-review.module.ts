import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderReviewComponent } from './under-review.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { LanguagesModule } from 'src/app/components/languages/languages.module';

const routes: Routes = [
  {
    path: '',
    component: UnderReviewComponent,
  },
];

@NgModule({
  declarations: [UnderReviewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    LanguagesModule,
    RouterModule.forChild(routes),
  ],
})
export class UnderReviewModule {}
