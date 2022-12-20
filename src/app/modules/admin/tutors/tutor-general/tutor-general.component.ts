import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-tutor-general',
  templateUrl: './tutor-general.component.html',
  styleUrls: ['./tutor-general.component.scss']
})
export class TutorGeneralComponent implements OnInit {

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _toastService: ToastService,
    private _imageCropperDialogService: ImageCropperDialogService
  ) {}
  tutorGeneralForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    for (let control in this.tutorGeneralForm.controls) {
      this.tutorGeneralForm.controls[control].markAsDirty();
      this.tutorGeneralForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.tutorGeneralForm.invalid) return;

    // Disable the form
    this.tutorGeneralForm.disable();
  }

  createForm() {
    this.tutorGeneralForm = this._fb.group({
      profilePicture: [''],
      profilePictureUrl: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.isEmail()]],
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
        this.tutorGeneralForm
          .get('profilePictureUrl')
          ?.setValue(croppedImage);
        this.tutorGeneralForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }

  // Remove profile picture
  onRemoveProfilePicture() {
    const dialogRef = this._confirmationDialogService.open();

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        this.tutorGeneralForm.get('profilePictureUrl')?.setValue(null);
        this.tutorGeneralForm.get('profilePicture')?.setValue(null);
      }
    });
  }
}
