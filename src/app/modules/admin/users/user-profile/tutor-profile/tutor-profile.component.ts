import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { CustomValidators } from 'src/app/core/validators/validators';
import {
  TeachingLanguageOptions,
  TeachingExperienceOptions,
  LanguageOptions,
  FluencyOptions,
  TeachingExperience,
  Language,
  Fluency,
} from 'src/app/modules/client/onboarding/languages.model';
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

  teachingLanguageOptions = TeachingLanguageOptions;
  teachingExperienceOptions = TeachingExperienceOptions;
  languageOptions = LanguageOptions;
  fluencyOptions = FluencyOptions;
  heardFromOptions = HeardFromOptions;

  tutorProfileForm!: FormGroup;

  maxDate: Date = new Date();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isOnDropFilesContainer: boolean = false;

  ngOnInit(): void {
    this.createForm();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      const teachingJob = this.tutorProfileForm.get('teachingJob')?.value || [];
      this.tutorProfileForm
        .get('teachingJob')
        ?.setValue([...teachingJob, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(job: string): void {
    const teachingJob = this.tutorProfileForm.get('teachingJob')?.value || [];
    const index = teachingJob.indexOf(job);

    if (index >= 0) {
      teachingJob.splice(index, 1);

      this.tutorProfileForm.get('teachingJob')?.setValue(teachingJob);
    }
  }

  createForm() {
    this.tutorProfileForm = this._fb.group({
      profilePicture: [],
      profilePictureUrl: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.isEmail()]],
      dob: ['', Validators.required],
      teachingLanguage: [this.teachingLanguageOptions[0]],
      teachingJob: ['', Validators.required],
      teachingExperience: [TeachingExperience.OneToSixMonths],
      languages: this._fb.array([this.createlanguageFormGroup()]),
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null, [Validators.required]],
      introduction: ['', [Validators.required]],
      videoIntroduction: [''],
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: ['', [Validators.required]],
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

  // On file input change event
  onCertificatesSelected(event: any, fileInput: any) {
    const uploadFiles = event.target.files || [];
    this.handleCertificatesUpload(uploadFiles);
    fileInput.value = null;
  }

  // Handle certificate files
  handleCertificatesUpload(uploadFiles: any[]) {
    const maxSize = 33554432;
    const files =
      this.tutorProfileForm.get('teachingCertificates')?.value || [];
    if (uploadFiles.length > 0) {
      for (const file of uploadFiles) {
        // Only allow .pdf file
        if (file.type != 'application/pdf') {
          this._toastService.open({
            message: this._translateService.instant(
              'FileUpload.OnlyAllowedFileType',
              {
                fileType: '.pdf',
              }
            ),
            configs: {
              payload: {
                type: 'error',
              },
            },
          });
          continue;
        }

        // Limit file size to 32mb
        if (file.size > maxSize) {
          this._toastService.open({
            message: this._translateService.instant('FileUpload.FileTooLarge', {
              maxUploadSize: '32mb',
            }),
            configs: {
              payload: {
                type: 'error',
              },
            },
          });
          continue;
        }

        // Skip the same files
        if (files.find((f: File) => f.name?.toLowerCase() === file.name)) {
          continue;
        }

        files.push(file);

        this.tutorProfileForm.get('teachingCertificates')?.setValue(files);
      }
    }
  }

  // On remove certificate file
  removeCertificate(index: number) {
    const files =
      this.tutorProfileForm.get('teachingCertificates')?.value || [];

    files.splice(index, 1);

    this.tutorProfileForm
      .get('teachingCertificates')
      ?.setValue(files.length > 0 ? files : null);
  }

  // On drag enter
  onDragEnter(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  // On drag over
  onDragOver(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  // On drag leave
  onDragLeave(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
  }

  // On drop files
  onDrop(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
    const dt = event.dataTransfer;
    const files = dt.files || [];
    this.handleCertificatesUpload(files);
  }

  preventDefaults(event: any) {
    event.preventDefault();
    event.stopPropagation();
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
      cropperMaxWidth: 200,
      cropperMaxHeight: 200,
      cropperMinWidth: 150,
      cropperMinHeight: 150,
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
