import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, map, switchMap } from 'rxjs/operators';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageCropperDialogService } from 'src/app/components/image-cropper/image-cropper.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserService } from 'src/app/core/user/user.service';
import { CustomValidators } from 'src/app/core/validators/validators';
import {
  TeachingLanguageOptions,
  TeachingExperienceOptions,
  LanguageOptions,
  FluencyOptions,
  TeachingExperience,
  Language,
  Fluency,
} from '../../../onboarding/languages.model';
import { TutorService } from '../../tutor.service';

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
    private _confirmationDialogService: ConfirmationDialogService,
    public userService: UserService,
    private _authService: AuthService,
    private _httpService: HttpService,
    private _tutorService: TutorService
  ) {}

  teachingLanguageOptions = TeachingLanguageOptions;
  teachingExperienceOptions = TeachingExperienceOptions;
  languageOptions = LanguageOptions;
  fluencyOptions = FluencyOptions;

  tutorProfileForm!: FormGroup;

  maxDate: Date = new Date();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isOnDropFilesContainer: boolean = false;

  ngOnInit(): void {
    this.createForm();
    this.getTutorProfile();
  }

  // Add teaching job
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const teachingJobs =
        this.tutorProfileForm.get('teachingJobs')?.value || [];
      this.tutorProfileForm
        .get('teachingJobs')
        ?.setValue([...teachingJobs, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // Remove teaching job
  remove(job: string): void {
    const teachingJobs = this.tutorProfileForm.get('teachingJobs')?.value || [];
    const index = teachingJobs.indexOf(job);

    if (index >= 0) {
      teachingJobs.splice(index, 1);

      this.tutorProfileForm.get('teachingJobs')?.setValue(teachingJobs);
    }
  }

  // Create form
  createForm() {
    this.tutorProfileForm = this._fb.group({
      avatar: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, CustomValidators.isEmail()],
        this._validateExistingEmail(this._authService, this.userService),
      ],
      dob: ['', Validators.required],
      teachingLanguage: [this.teachingLanguageOptions[0]],
      teachingJobs: ['', Validators.required],
      teachingExperience: [TeachingExperience.OneToSixMonths],
      languages: this._fb.array([this.createlanguageFormGroup()]),
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null],
      introduction: ['', [Validators.required]],
      videoIntroduction: [''],
    });
  }

  // Get tutor profile
  getTutorProfile() {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Profile,
        method: ApiMethod.Get,
      })
      .subscribe((res: IApiResponse) => {
        const tutorProfile = res.data?.tutorProfile || {};

        // Patch profile value to forms
        this.tutorProfileForm.patchValue({
          ...tutorProfile,
          ...res.data,
        });

        // Update languages to form
        const languages = tutorProfile.languages || [];
        this.languagesFormArray.clear();
        languages.forEach((language: any) => {
          const languageFormGroup = this.createlanguageFormGroup(
            language.language,
            language.fluency
          );
          this.languagesFormArray.push(languageFormGroup);
        });

        const teachingLanguage = this.teachingLanguageOptions.find(
          (item) => item.value === tutorProfile.teachingLanguage
        );
        if (teachingLanguage) {
          this.tutorProfileForm
            .get('teachingLanguage')
            ?.setValue(teachingLanguage);
        }
      });
  }

  // Form submit
  submit() {
    for (const control in this.tutorProfileForm.controls) {
      this.tutorProfileForm.controls[control].markAsTouched();
      this.tutorProfileForm.controls[control].markAsDirty();
    }

    if (this.tutorProfileForm.invalid) {
      return;
    }

    const payload = {
      email: this.tutorProfileForm.get('email')?.value,
      tutorProfile: {
        ...this.tutorProfileForm.value,
        teachingLanguage:
          this.tutorProfileForm.get('teachingLanguage')?.value?.value,
      },
    };

    // Delete unnecessary keys
    delete payload['tutorProfile']['teachingCertificates'];
    delete payload['tutorProfile']['email'];
    delete payload['tutorProfile']['avatar'];

    // Disable the form
    this.tutorProfileForm.disable();
    this.tutorProfileForm.updateValueAndValidity();

    this._httpService
      .request({
        apiUrl: ApiEndpoint.Profile,
        method: ApiMethod.Put,
        body: payload,
      })
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => {
          // Re-enable the form
          this.tutorProfileForm.enable();
        })
      )
      .subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          // Display toast
          this._toastService.open({
            message: this._translateService.instant(
              'Toast.UpdatedSuccessfully'
            ),
            configs: {
              payload: {
                type: 'success',
              },
            },
          });
        }
      });
  }

  // Get language form array
  get languagesFormArray(): FormArray {
    return this.tutorProfileForm.get('languages') as FormArray;
  }

  // Create language form group
  createlanguageFormGroup(
    language = Language.English,
    fluency = Fluency.A1
  ): FormGroup {
    const fg = this._fb.group({
      language: [language],
      fluency: [fluency],
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
    const maxSize = 5 * 1024 * 1024;
    const files =
      this.tutorProfileForm.get('teachingCertificates')?.value || [];
    const uploadDocuments: any[] = [];
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

        // Limit file size to 5mb
        if (file.size > maxSize) {
          this._toastService.open({
            message: this._translateService.instant('FileUpload.FileTooLarge', {
              maxUploadSize: '5mb',
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

        uploadDocuments.push(file);
      }
    }

    // Disable the form
    this.tutorProfileForm.disable();
    this.tutorProfileForm.updateValueAndValidity();

    this._tutorService
      .uploadCertificates(uploadDocuments)
      .subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          const teachingCertificates = res.data || [];
          files.push(...teachingCertificates);

          this.tutorProfileForm.get('teachingCertificates')?.setValue(files);
        }

        // Re-enable the form
        this.tutorProfileForm.enable();
      });
  }

  // On remove certificate file
  removeCertificate(index: number) {
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Remove').toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        const files =
          this.tutorProfileForm.get('teachingCertificates')?.value || [];

        const deleteFile = files[index];

        this._httpService
          .request({
            apiUrl: ApiEndpoint.Certificates + '/' + deleteFile?._id,
            method: ApiMethod.Delete,
          })
          .subscribe((res: IApiResponse) => {
            if (res.status === 'success') {
              files.splice(index, 1);

              this.tutorProfileForm
                .get('teachingCertificates')
                ?.setValue(files.length > 0 ? files : null);
            }
          });
      }
    });
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
    const maxSize = 1024 * 1024 * 1;
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

      // Limit file size to 1mb
      if (file.size > maxSize) {
        this._toastService.open({
          message: this._translateService.instant('FileUpload.FileTooLarge', {
            maxUploadSize: '1mb',
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
    const dialogRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.Message', {
        action: this._translateService.instant('Action.Remove').toLowerCase(),
      }),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        this._httpService
          .request({
            apiUrl: ApiEndpoint.Avatar,
            method: ApiMethod.Delete,
          })
          .subscribe((res: IApiResponse) => {
            this._toastService.open({
              message: this._translateService.instant(
                'Toast.RemovedSuccessfully'
              ),
              configs: {
                payload: {
                  type: 'success',
                },
              },
            });
            this.tutorProfileForm.get('avatar')?.setValue(null);
            // Update current user
            this.userService.currentUser = {
              ...this.userService.currentUserValue,
              avatar: '',
            };
          });
      }
    });
  }

  // Open crop image dialog
  openImageCropper(imageFile: File) {
    const dialogRef = this._imageCropperDialogService.open(imageFile, {
      cropperMaxWidth: 300,
      cropperMaxHeight: 300,
      cropperMinWidth: 200,
      cropperMinHeight: 200,
    });

    dialogRef?.afterClosed().subscribe((croppedImage) => {
      if (croppedImage != null) {
        this.userService
          .uploadAvatar(croppedImage)
          .subscribe((res: IApiResponse) => {
            this._toastService.open({
              message: this._translateService.instant(
                'Toast.UpdatedSuccessfully'
              ),
              configs: {
                payload: {
                  type: 'success',
                },
              },
            });

            this.tutorProfileForm.get('avatar')?.setValue(croppedImage);
          });
      }
    });
  }

  // Validate existing email
  private _validateExistingEmail(
    authService: AuthService,
    userService: UserService
  ) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.hasError('required') || control.hasError('isEmail')) {
        return of(null);
      }

      if (userService.currentUserValue?.email == control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => {
          return authService.checkExistingEmail(email).pipe(
            map((isExisting: boolean) => {
              if (!isExisting) {
                return null;
              }

              return {
                existingEmail: true,
              };
            })
          );
        })
      );
    };
  }
}
