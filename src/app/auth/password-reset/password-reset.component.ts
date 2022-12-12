import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  @ViewChild('passwordResetNgForm') passwordResetNgForm!: NgForm;

  passwordResetForm!: UntypedFormGroup;

  queryParams$: Observable<Params> = this._activatedRoute.queryParams;

  isChanged: boolean = false;

  ngOnInit(): void {
    this.createForm();

    this.queryParams$.subscribe((params: Params) => {
      const token = params['token'];
      const userId = params['userId'];

      if (!token || !userId) {
        this._toastService.open({
          message: this._translateService.instant('Errors.InvalidRequest'),
          configs: {
            payload: {
              type: 'error',
            },
          },
        });
        this._router.navigate(['/']);
        return;
      }

      this.passwordResetForm.patchValue({
        token,
        userId,
      });
    });
  }

  createForm() {
    this.passwordResetForm = this._fb.group(
      {
        token: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    for (let control in this.passwordResetForm.controls) {
      this.passwordResetForm.controls[control].markAsDirty();
      this.passwordResetForm.controls[control].markAsTouched();
    }
    if (this.passwordResetForm.invalid) return;

    // Disable the form
    this.passwordResetForm.disable();

    const payload = {
      token: this.passwordResetForm.value.token,
      userId: this.passwordResetForm.value.userId,
      password: this.passwordResetForm.value.password,
    };

    this._authService.resetPassword(payload).subscribe({
      next: (res) => {
        // Re-enable the form
        this.passwordResetForm.disable();

        // Reset the form
        this.passwordResetNgForm.resetForm();

        //  Change the flag
        this.isChanged = true;
      },
      error: (err) => {
        // Re-enable the form
        this.passwordResetForm.disable();

        // Reset the form
        this.passwordResetNgForm.resetForm();
      },
    });
  }
}
