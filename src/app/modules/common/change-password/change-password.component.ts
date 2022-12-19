import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
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
      ...this.changePasswordForm.value,
    };

    this.changePasswordForm.disable();

    this._toastService.open({
      message: this._translateService.instant('Toast.UpdateSuccess'),
      configs: {
        payload: {
          type: 'success',
        },
      },
    });
  }
}
