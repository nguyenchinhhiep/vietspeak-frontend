import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { CustomValidators } from 'src/app/core/validators/validators';
import { Fluency, FluencyOptions, Language, LanguageOptions, TeachingExperience, TeachingExperienceOptions, TeachingLanguageOptions } from 'src/app/modules/client/onboarding/languages.model';
import { HeardFrom, HeardFromOptions } from 'src/app/modules/client/onboarding/onboarding.model';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
})
export class TutorProfileComponent implements OnInit {
  constructor(
    private _imageCropperDialogService: ImageCropperDialogService,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _confirmationDialogService: ConfirmationDialogService
  ) {}

  tutorProfileForm!: FormGroup;

  teachingLanguageOptions = TeachingLanguageOptions;
  heardFromOptions = HeardFromOptions;
  teachingExperienceOptions = TeachingExperienceOptions;
  languageOptions = LanguageOptions;
  fluencyOptions = FluencyOptions;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorProfileForm = this._fb.group({
      profilePicture: [],
      profilePictureUrl: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.isEmail()]],
      teachingLanguage: [this.teachingLanguageOptions[0]],
      teachingExperience: [TeachingExperience.OneToSixMonths],
      languages: this._fb.array([this.createlanguageFormGroup()]),
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null, [Validators.required]],
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]],
    });
  }

  submit() {
    for (const control in this.tutorProfileForm.controls) {
      this.tutorProfileForm.controls[control].markAsTouched();
      this.tutorProfileForm.controls[control].markAsDirty();
    }

    if (this.tutorProfileForm.invalid) {
      return;
    }

    const payload = {
      ...this.tutorProfileForm.value,
    };

    this.tutorProfileForm.disable();

    this._toastService.open({
      message: this._translateService.instant('Toast.UpdateSuccessfully'),
      configs: {
        payload: {
          type: 'success',
        },
      },
    });
  }

    // Get language form array
    get languagesFormArray(): FormArray {
      return this.tutorProfileForm.get('languages') as FormArray;
    }
  
    // Create language form group
    createlanguageFormGroup(): FormGroup {
      const fg = this._fb.group({
        language: [Language.English],
        fluency: [Fluency.A1],
      });
  
      return fg;
    }
  
    // Add language
    addLanguage() {
      this.languagesFormArray.push(this.createlanguageFormGroup());
    }
  
    // Remove language form group
    removeLanguage(i: number) {
      this.languagesFormArray.removeAt(i);
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
        this.tutorProfileForm.get('profilePictureUrl')?.setValue(croppedImage);
        this.tutorProfileForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }

  // Remove profile picture
  onRemoveProfilePicture() {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Remove').toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        this.tutorProfileForm.get('profilePictureUrl')?.setValue(null);
        this.tutorProfileForm.get('profilePicture')?.setValue(null);
      }
    });
  }
}
