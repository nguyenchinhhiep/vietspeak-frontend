import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  Fluency,
  FluencyOptions,
  Language,
  LanguageOptions,
  TeachingExperience,
  TeachingExperienceOptions,
  TeachingLanguageOptions,
} from '../languages.model';
import { HeardFrom, HeardFromOptions } from '../onboarding.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-tutor-info',
  templateUrl: './tutor-info.component.html',
  styleUrls: ['./tutor-info.component.scss'],
})
export class TutorProfileComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _imageCropperDialogService: ImageCropperDialogService
  ) {}

  teachingLanguageOptions = TeachingLanguageOptions;
  heardFromOptions = HeardFromOptions;
  teachingExperienceOptions = TeachingExperienceOptions;
  languageOptions = LanguageOptions;
  fluencyOptions = FluencyOptions;

  tutorBasicInfoForm!: FormGroup;
  tutorExperienceForm!: FormGroup;
  tutorMotivationForm!: FormGroup;
  tutorIntroductionForm!: FormGroup;

  maxDate: Date = new Date();

  isOnDropFilesContainer: boolean = false;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit(): void {
    this.createForm();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      const teachingJobs =
        this.tutorExperienceForm.get('teachingJobs')?.value || [];
      this.tutorExperienceForm
        .get('teachingJobs')
        ?.setValue([...teachingJobs, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(job: string): void {
    const teachingJobs =
      this.tutorExperienceForm.get('teachingJobs')?.value || [];
    const index = teachingJobs.indexOf(job);

    if (index >= 0) {
      teachingJobs.splice(index, 1);

      this.tutorExperienceForm.get('teachingJobs')?.setValue(teachingJobs);
    }
  }

  submitTutorBasicInfoForm() {
    for (let control in this.tutorBasicInfoForm.controls) {
      this.tutorBasicInfoForm.controls[control].markAsDirty();
      this.tutorBasicInfoForm.controls[control].markAsTouched();
    }

    if (this.tutorBasicInfoForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  submitTutorIntroductionForm() {
    for (let control in this.tutorIntroductionForm.controls) {
      this.tutorIntroductionForm.controls[control].markAsDirty();
      this.tutorIntroductionForm.controls[control].markAsTouched();
    }

    if (this.tutorIntroductionForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  submitTutorExperienceForm() {
    for (let control in this.tutorExperienceForm.controls) {
      this.tutorExperienceForm.controls[control].markAsDirty();
      this.tutorExperienceForm.controls[control].markAsTouched();
    }

    if (this.tutorExperienceForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  createForm() {
    this.tutorBasicInfoForm = this._fb.group({
      profilePicture: [],
      profilePictureUrl: [],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null, [Validators.required]],
    });

    this.tutorExperienceForm = this._fb.group({
      teachingLanguage: [this.teachingLanguageOptions[0]],
      teachingJobs: [[], Validators.required],
      teachingExperience: [TeachingExperience.OneToSixMonths],
      languages: this._fb.array([this.createlanguageFormGroup()]),
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null, [Validators.required]],
    });

    this.tutorIntroductionForm = this._fb.group({
      introduction: ['', [Validators.required]],
      videoIntroduction: [''],
    });

    this.tutorMotivationForm = this._fb.group({
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: ['', [Validators.required]],
    });

    this.tutorExperienceForm
      .get('teachingLanguage')
      ?.valueChanges.subscribe((option) => {
        this.languagesFormArray.at(0).get('language')?.setValue(option?.value);
      });

    this.languagesFormArray.at(0).get('language')?.disable();
  }

  logout() {
    this._authService.logout();
  }

  // Get language form array
  get languagesFormArray(): FormArray {
    return this.tutorExperienceForm.get('languages') as FormArray;
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
      this.tutorExperienceForm.get('teachingCertificates')?.value || [];
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

        this.tutorExperienceForm.get('teachingCertificates')?.setValue(files);
      }
    }
  }

  // On remove certificate file
  removeCertificate(index: number) {
    const files =
      this.tutorExperienceForm.get('teachingCertificates')?.value || [];

    files.splice(index, 1);

    this.tutorExperienceForm
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

  // Remove profile picture
  onRemoveProfilePicture() {
    this.tutorBasicInfoForm.get('profilePictureUrl')?.setValue(null);
    this.tutorBasicInfoForm.get('profilePicture')?.setValue(null);
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
        this.tutorBasicInfoForm
          .get('profilePictureUrl')
          ?.setValue(croppedImage);
        this.tutorBasicInfoForm.get('profilePicture')?.setValue(croppedImage);
      }
    });
  }
}
