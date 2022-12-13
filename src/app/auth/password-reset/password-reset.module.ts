import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from 'src/app/components/alert/alert.module';
import { LanguagesModule } from 'src/app/components/languages/languages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetComponent,
  },
];

@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AlertModule,
    LanguagesModule,
    PreventAutofillModule,
    RouterModule.forChild(routes),
  ]
})
export class PasswordResetModule { }
