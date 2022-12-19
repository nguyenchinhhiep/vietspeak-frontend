import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private _imageCropperDialogService: ImageCropperDialogService,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _confirmationDialogService: ConfirmationDialogService
  ) {}

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.profileForm = this._fb.group({
      profilePicture: [],
      profilePictureUrl: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  submit() {
    for (const control in this.profileForm.controls) {
      this.profileForm.controls[control].markAsTouched();
      this.profileForm.controls[control].markAsDirty();
    }

    if (this.profileForm.invalid) {
      return;
    }

    const payload = {
      ...this.profileForm.value,
    };

    this.profileForm.disable();

    this._toastService.open({
      message: this._translateService.instant('Toast.UpdateSuccess'),
      configs: {
        payload: {
          type: 'success',
        },
      },
    });
  }

  // Upload profile picture
  onProfilePictureFileSelected(event: any, profilePictureInput: any) {
    const maxSize = 2097152;
    const file = event.target.files[0];
    if (file) {
      if (!file.type.includes('image')) {
        this._toastService.open({
          message: this._translateService.instant(
            'FileUpload.OnlyAllowedFileType',
            {
              fileType: 'image',
            }
          ),
          configs: {
            payload: {
              type: 'error',
            },
          },
        });

        return;
      }

      // Limit file size to 2mb
      if (file.size > maxSize) {
        this._toastService.open({
          message: this._translateService.instant('FileUpload.FileTooLarge', {
            maxUploadSize: '2mb',
          }),
          configs: {
            payload: {
              type: 'error',
            },
          },
        });
        return;
      }

      profilePictureInput.value = null;

      this.openImageCropper(file);
    }
  }

  // Open crop image dialog
  openImageCropper(imageFile: File) {
    const dialogRef = this._imageCropperDialogService.open(imageFile, {
      cropperMaxWidth: 150,
      cropperMaxHeight: 150,
      cropperMinWidth: 100,
      cropperMinHeight: 100,
    });

    dialogRef?.afterClosed().subscribe((croppedImage) => {
      if (croppedImage != null) {
        this.profileForm.get('profilePictureUrl')?.setValue(croppedImage);
        this.profileForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }

  // Remove profile picture
  onRemoveProfilePicture() {
    const dialogRef = this._confirmationDialogService.open();

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        this.profileForm.get('profilePictureUrl')?.setValue(null);
        this.profileForm.get('profilePicture')?.setValue(null);
      }
    });
  }
}
