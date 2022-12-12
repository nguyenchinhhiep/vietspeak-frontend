import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, timer } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AlertType } from 'src/app/components/alert/alert.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService,
    private _translateService: TranslateService
  ) {}
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm!: NgForm;

  alert: { type: AlertType; message: string } | null = {
    type: 'success',
    message: '',
  };

  loading: boolean = false;

  forgotPasswordForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this._fb.group({
      email: [
        '',
        [Validators.required, CustomValidators.isEmail()],
        this._validateExistingEmail(this._authService),
      ],
    });
  }

  submit() {
    for (let control in this.forgotPasswordForm.controls) {
      this.forgotPasswordForm.controls[control].markAsDirty();
      this.forgotPasswordForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (
      this.forgotPasswordForm.invalid ||
      this.forgotPasswordForm.status === 'PENDING'
    )
      return;

    // Disable the form
    this.forgotPasswordForm.disable();

    // Reset the alert
    this.alert = null;

    const email = String(this.forgotPasswordForm.value.email);

    this._authService.forgotPassword(email).subscribe({
      next: (res) => {
        // Enable the form
        this.forgotPasswordForm.enable();

        // Reset the form
        this.forgotPasswordNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: 'success',
          message: this._translateService.instant('ForgotPassword.SentEmailSuccess'),
        };
      },
      error: (err) => {
        // Enable the form
        this.forgotPasswordForm.enable();

        // Reset the form
        this.forgotPasswordNgForm.resetForm();
      },
    });
  }

  private _validateExistingEmail(authService: AuthService) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.hasError('required') || control.hasError('isEmail')) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => {
          return authService.checkExistingEmail(email).pipe(
            map((isExisting: boolean) => {
              if (isExisting) {
                return null;
              }
              return {
                notFoundEmail: true,
              };
            })
          );
        })
      );
    };
  }
}
