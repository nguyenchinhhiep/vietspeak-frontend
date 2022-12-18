import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageCropperDialogComponent } from './image-cropper.component';

@Injectable()
export class ImageCropperDialogService {
  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

  // Image cropper library configurations
  private _defaultConfig: any = {
    aspectRatio: 1 / 1,
    maintainAspectRatio: true,
    resizeToWidth: 0,
    resizeToHeight: 0,
    cropperStaticWidth: 0,
    cropperStaticHeight: 0,
    cropperMinWidth: 0,
    cropperMinHeight: 0,
    cropperMaxWidth: 0,
    cropperMaxHeight: 0,
    roundCropper: false,
  };

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    imageFile: File | null | undefined,
    config: any = {}
  ): MatDialogRef<ImageCropperDialogComponent> | null {
    // Check image file exists
    if (imageFile == null) {
      return null;
    }

    const userConfig = Object.assign({}, this._defaultConfig, config);
    // Open the dialog
    return this._matDialog.open(ImageCropperDialogComponent, {
      minWidth: '400px',
      autoFocus: false,
      panelClass: 'image-cropper-dialog',
      data: {
        imageFile,
        config: userConfig,
      },
    });
  }
}
