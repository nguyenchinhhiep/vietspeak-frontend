import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
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
  LanguageLevelOptions,
  learningLanguageOptions,
  LanguageLevel,
} from 'src/app/modules/client/onboarding/languages.model';
import {
  HeardFrom,
  HeardFromOptions,
} from 'src/app/modules/client/onboarding/onboarding.model';
import { UsersService } from '../../users.service';

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
    private _imageCropperDialogService: ImageCropperDialogService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _httpService: HttpService,
    public userService: UserService,
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  @Input() userProfile: any = null;

  languageLevelOptions = LanguageLevelOptions;
  learningLanguageOptions = learningLanguageOptions;
  heardFromOptions = HeardFromOptions;

  studentProfileForm!: FormGroup;

  studentProfile: any = {};

  ngOnInit(): void {
    this.createForm();

    if (this.userProfile) {
      this.studentProfileForm.patchValue({
        ...this.userProfile,
        ...this.userProfile?.studentProfile,
      });
      const learningLanguage = this.learningLanguageOptions.find(
        (item) =>
          item.value === this.userProfile?.studentProfile.learningLanguage
      );
      if (learningLanguage) {
        this.studentProfileForm
          .get('learningLanguage')
          ?.setValue(learningLanguage);
      }
    }
  }

  createForm() {
    this.studentProfileForm = this._fb.group({
      avatar: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, CustomValidators.isEmail()],
        this._validateExistingEmail(this._authService, this.userProfile),
      ],
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
      heardFrom: [HeardFrom.WebSearch],
    });
  }

  submit() {
    for (let control in this.studentProfileForm.controls) {
      this.studentProfileForm.controls[control].markAsDirty();
      this.studentProfileForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (
      this.studentProfileForm.invalid ||
      this.studentProfileForm.status === 'PENDING'
    )
      return;

    // Disable the form
    this.studentProfileForm.disable();

    const payload = {
      email: this.studentProfileForm.get('email')?.value,
      studentProfile: {
        ...this.studentProfileForm.value,
        learningLanguage:
          this.studentProfileForm.get('learningLanguage')?.value?.value,
      },
    };

    this._httpService
      .request({
        apiUrl: ApiEndpoint.Users + '/' + this.userProfile?._id,
        method: ApiMethod.Put,
        body: payload,
      })
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => {
          // Re-enable the form
          this.studentProfileForm.enable();
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

          this._usersService.getUserProfile$.next(true)
        }
      });
  }

  // Upload profile picture
  onProfilePictureFileSelected(event: any, profilePictureInput: any) {
    const maxSize = 1 * 1024 * 1024;
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
            apiUrl: ApiEndpoint.UserAvatar + '/' + this.userProfile?._id,
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
            this.studentProfileForm.get('avatar')?.setValue(null);

            this._usersService.getUserProfile$.next(true)
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
        this._usersService
          .uploadUserAvatar(croppedImage, this.userProfile?._id)
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

            this.studentProfileForm.get('avatar')?.setValue(croppedImage);

            this._usersService.getUserProfile$.next(true)
          });
      }
    });
  }

  // Validate existing email
  private _validateExistingEmail(
    authService: AuthService,
    userProfile: { email: string }
  ) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.hasError('required') || control.hasError('isEmail')) {
        return of(null);
      }

      if (userProfile?.email == control.value) {
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
