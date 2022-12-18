import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperDialogComponent } from './image-cropper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AutoFocusModule } from 'src/app/directives/auto-focus/auto-focus.module';
import { ImageCropperDialogService } from './image-cropper.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ImageCropperDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatIconModule,
    AutoFocusModule,
    MatButtonModule,
    ImageCropperModule,
  ],
  providers: [ImageCropperDialogService],
})
export class ImageCropperDialogModule {}
