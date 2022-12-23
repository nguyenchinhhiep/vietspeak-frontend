import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperDialogModule } from 'src/app/components/image-cropper/image-cropper.module';
import { PreventAutofillModule } from 'src/app/directives/prevent-autofill/prevent-autofill.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    PreventAutofillModule,
    ImageCropperDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProfileModule { }
