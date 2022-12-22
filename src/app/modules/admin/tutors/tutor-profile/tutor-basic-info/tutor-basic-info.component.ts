import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TeachingLanguageOptions } from 'src/app/modules/client/onboarding/languages.model';

@Component({
  selector: 'app-tutor-basic-info',
  templateUrl: './tutor-basic-info.component.html',
  styleUrls: ['./tutor-basic-info.component.scss'],
})
export class TutorBasicInfoComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _imageCropperDialogService: ImageCropperDialogService
  ) {}
  teachingLanguageOptions = TeachingLanguageOptions;

  tutorBasicInfoForm!: FormGroup;

  maxDate: Date = new Date();

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorBasicInfoForm = this._fb.group({
      profilePicture: [],
      profilePictureUrl: [],
      teachingLanguage: [this.teachingLanguageOptions[0]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null, [Validators.required]],
    });
  }

  submitTutorBasicInfoForm() {
    for (let control in this.tutorBasicInfoForm.controls) {
      this.tutorBasicInfoForm.controls[control].markAsDirty();
      this.tutorBasicInfoForm.controls[control].markAsTouched();
    }

    if (this.tutorBasicInfoForm.invalid) {
      return;
    }
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

  // Remove profile picture
  onRemoveProfilePicture() {
    this.tutorBasicInfoForm.get('profilePictureUrl')?.setValue(null);
    this.tutorBasicInfoForm.get('profilePicture')?.setValue(null);
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
        this.tutorBasicInfoForm
          .get('profilePictureUrl')
          ?.setValue(croppedImage);
        this.tutorBasicInfoForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }
}
