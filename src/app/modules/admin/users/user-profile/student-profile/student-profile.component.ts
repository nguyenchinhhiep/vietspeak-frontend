import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { CustomValidators } from 'src/app/core/validators/validators';
import {
  LanguageLevelOptions,
  learningLanguageOptions,
  LanguageLevel,
} from 'src/app/modules/client/onboarding/languages.model';
import {
  HeardFrom,
  HeardFromOptions,
} from 'src/app/modules/client/onboarding/onboarding.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _translateService: TranslateService,
    private _toastService: ToastService,
    private _imageCropperDialogService: ImageCropperDialogService
  ) {}

  languageLevelOptions = LanguageLevelOptions;
  learningLanguageOptions = learningLanguageOptions;
  heardFromOptions = HeardFromOptions;

  studentProfileForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    for (let control in this.studentProfileForm.controls) {
      this.studentProfileForm.controls[control].markAsDirty();
      this.studentProfileForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.studentProfileForm.invalid) return;

    // Disable the form
    this.studentProfileForm.disable();
  }

  createForm() {
    this.studentProfileForm = this._fb.group({
      profilePictureUrl: [''],
      profilePicture: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.isEmail()]],
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
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
    this.studentProfileForm.get('profilePictureUrl')?.setValue(null);
    this.studentProfileForm.get('profilePicture')?.setValue(null);
  }

  // Open crop image dialog
  openImageCropper(imageFile: File) {
    const dialogRef = this._imageCropperDialogService.open(imageFile, {
      cropperMaxWidth: 200,
      cropperMaxHeight: 200,
      cropperMinWidth: 150,
      cropperMinHeight: 150,
    });

    dialogRef?.afterClosed().subscribe((croppedImage) => {
      if (croppedImage != null) {
        this.studentProfileForm
          .get('profilePictureUrl')
          ?.setValue(croppedImage);
        this.studentProfileForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }
}
