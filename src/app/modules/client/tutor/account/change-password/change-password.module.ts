import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    PreventAutofillModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
})
export class ChangePasswordModule {}
