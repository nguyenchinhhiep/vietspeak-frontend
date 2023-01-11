import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap, map, catchError, finalize } from 'rxjs/operators';
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
    private _httpService: HttpService
  ) {}

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
    this.getProfile();
  }

  getProfile() {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Profile,
        method: ApiMethod.Get,
      })
      .subscribe((res: IApiResponse) => {
        const profile = res.data || {};
        this.profileForm.patchValue(profile);
      });
  }

  createForm() {
    this.profileForm = this._fb.group({
      avatar: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [Validators.required, CustomValidators.isEmail()],
        this._validateExistingEmail(this._authService, this.userService),
      ],
    });
  }

  submit() {
    for (const control in this.profileForm.controls) {
      this.profileForm.controls[control].markAsTouched();
      this.profileForm.controls[control].markAsDirty();
    }

    if (this.profileForm.invalid || this.profileForm.status === 'PENDING') {
      return;
    }

    const payload = {
      email: this.profileForm.get('email')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
    };

    // Disable the form
    this.profileForm.disable();

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
          this.profileForm.enable();
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

          this.userService.currentUser = {
            ...this.userService.currentUserValue,
            email: this.profileForm.value.email,
            avatar: this.profileForm.value?.avatar,
            name:
              this.profileForm.value?.firstName +
              ' ' +
              this.profileForm.value?.lastName,
          };
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
            this.profileForm.get('avatar')?.setValue(null);
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

            this.profileForm.get('avatar')?.setValue(croppedImage);

            this.userService.currentUser = {
              ...this.userService.currentUserValue,
              avatar: croppedImage,
            };
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
