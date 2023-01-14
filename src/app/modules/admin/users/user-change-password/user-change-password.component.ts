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
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService,
    private _httpService: HttpService,
    private _usersService: UsersService
  ) {}

  changePasswordForm!: FormGroup;
  @ViewChild('changePasswordNgForm') changePasswordNgForm!: NgForm;
  userProfile: any = null;

  ngOnInit(): void {
    this.createForm();

    this._usersService.userProfile$.subscribe((val: any) => {
      this.userProfile = val;
    });
  }

  createForm() {
    this.changePasswordForm = this._fb.group(
      {
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
      newPassword: this.changePasswordForm.get('newPassword')?.value,
    };

    // Disable form
    this.changePasswordForm.disable();

    this._httpService
      .request({
        apiUrl: ApiEndpoint.ChangePasswordUser + '/' + this.userProfile?._id,
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
        if (res.status === 'success') {
          this._toastService.open({
            message: this._translateService.instant(
              'Toast.ChangedSuccessfully'
            ),
            configs: {
              payload: {
                type: 'success',
              },
            },
          });

          // Reset form
          this.changePasswordNgForm.resetForm();
        }
      });
  }
}
