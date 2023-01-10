import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, throwError } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType } from 'src/app/core/user/user-type.model';
import { UserService } from 'src/app/core/user/user.service';
import {
  LanguageLevel,
  LanguageLevelOptions,
  learningLanguageOptions,
} from '../languages.model';
import { HeardFrom, HeardFromOptions } from '../onboarding.model';

@Component({
  selector: 'app-onboarding-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService,
    private _httpService: HttpService,
    private _toastService: ToastService,
    public userService: UserService
  ) {}
  studentProfileForm!: FormGroup;

  languageLevelOptions = LanguageLevelOptions;
  heardFromOptions = HeardFromOptions;
  learningLanguageOptions = learningLanguageOptions;

  ngOnInit(): void {
    this.createForm();
    this.getStudentProfile();
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

    const payload = {
      userType: UserType.Student,
      studentProfile: {
        ...this.studentProfileForm.value,
        learningLanguage:
          this.studentProfileForm.get('learningLanguage')?.value?.value,
      },
    };

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

          this.userService.currentUser = {
            ...this.userService.currentUserValue,
            ...res.data,
          };

          this._router.navigate(['/student/account/profile']);
        }
      });
  }

  getStudentProfile() {
    this._httpService
      .request({
        apiUrl: ApiEndpoint.Profile,
        method: ApiMethod.Get,
      })
      .subscribe((res: IApiResponse) => {
        const studentProfile = res.data?.studentProfile || {};
        this.studentProfileForm.patchValue(studentProfile);
        const learningLanguage = this.learningLanguageOptions.find(
          (item) => item.value === studentProfile.learningLanguage
        );
        if (learningLanguage) {
          this.studentProfileForm
            .get('learningLanguage')
            ?.setValue(learningLanguage);
        }
      });
  }

  createForm() {
    this.studentProfileForm = this._fb.group({
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      heardFrom: [HeardFrom.WebSearch],
    });
  }

  logout() {
    this._authService.logout();
  }

  openConfirmationUnsavedChanges() {
    const confirmRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.UnsavedChanges'),
      title: this._translateService.instant('Confirmation.Title'),
      actions: {
        cancel: {
          show: true,
          label: this._translateService.instant('Confirmation.Cancel'),
        },
        confirm: {
          show: true,
          label: this._translateService.instant('Confirmation.Confirm'),
          color: 'primary',
        },
      },
    });

    confirmRef.afterClosed().subscribe((type: string) => {
      if (type === 'confirmed') {
      }
    });
  }
}
