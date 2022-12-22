import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  LanguageLevelOptions,
  learningLanguageOptions,
  LanguageLevel,
} from 'src/app/modules/client/onboarding/languages.model';
import {
  HeardFromOptions,
  HeardFrom,
} from 'src/app/modules/client/onboarding/onboarding.model';

@Component({
  selector: 'app-student-basic-info',
  templateUrl: './student-basic-info.component.html',
  styleUrls: ['./student-basic-info.component.scss'],
})
export class StudentBasicInfoComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _translateService: TranslateService,
    private _toastService: ToastService,
    private _imageCropperDialogService: ImageCropperDialogService
  ) {}
  studentBasicInfoForm!: FormGroup;

  languageLevelOptions = LanguageLevelOptions;
  heardFromOptions = HeardFromOptions;
  learningLanguageOptions = learningLanguageOptions;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    for (let control in this.studentBasicInfoForm.controls) {
      this.studentBasicInfoForm.controls[control].markAsDirty();
      this.studentBasicInfoForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.studentBasicInfoForm.invalid) return;

    // Disable the form
    this.studentBasicInfoForm.disable();
  }

  createForm() {
    this.studentBasicInfoForm = this._fb.group({
      profilePictureUrl: [''],
      profilePicture: [],
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      heardFrom: [HeardFrom.WebSearch],
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

  // Remove profile picture
  onRemoveProfilePicture() {
    this.studentBasicInfoForm.get('profilePictureUrl')?.setValue(null);
    this.studentBasicInfoForm.get('profilePicture')?.setValue(null);
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
        this.studentBasicInfoForm
          .get('profilePictureUrl')
          ?.setValue(croppedImage);
        this.studentBasicInfoForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }
}
