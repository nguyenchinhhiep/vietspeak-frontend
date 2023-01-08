import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ToastService } from 'src/app/components/toast/toast.service';
import {
  ApiEndpoint,
  ApiMethod,
  IApiResponse,
} from 'src/app/core/http/api.model';
import { HttpService } from 'src/app/core/http/services/http.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _httpService: HttpService
  ) {}

  changePasswordForm!: FormGroup;

  @ViewChild('changePasswordNgForm') changePasswordNgForm!: NgForm;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this._fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validator: CustomValidators.mustMatch(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
  }

  submit() {
    for (const control in this.changePasswordForm.controls) {
      this.changePasswordForm.controls[control].markAsTouched();
      this.changePasswordForm.controls[control].markAsDirty();
    }

    if (this.changePasswordForm.invalid) {
      return;
    }

    const payload = {
      currentPassword: this.changePasswordForm.get('currentPassword')?.value,
      newPassword: this.changePasswordForm.get('newPassword')?.value,
    };

    this.changePasswordForm.disable();

    this._httpService
      .request({
        apiUrl: ApiEndpoint.ChangePassword,
        method: ApiMethod.Post,
        body: payload,
      })
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => {
          // Re-enable the form
          this.changePasswordForm.enable();
        })
      )
      .subscribe((res: IApiResponse) => {
        // Display toast
        this._toastService.open({
          message: this._translateService.instant('Toast.UpdatedSuccessfully'),
          configs: {
            payload: {
              type: 'success',
            },
          },
        });

        // Reset the form
        this.changePasswordNgForm.resetForm();
      });
  }
}
