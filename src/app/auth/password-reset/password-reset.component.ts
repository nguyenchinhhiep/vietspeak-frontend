import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private _authService: AuthService
  ) {}

  @ViewChild('passwordResetNgForm') passwordResetNgForm!: NgForm;

  passwordResetForm!: UntypedFormGroup;

  checked: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.passwordResetForm = this._fb.group(
      {
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
    if (
      this.passwordResetForm.invalid ||
      this.passwordResetForm.status === 'PENDING'
    )
      return;

    this.passwordResetForm.disable();

    setTimeout(() => {
      // Re-enable the form
      this.passwordResetForm.enable();

      // Reset the form
      this.passwordResetNgForm.resetForm();
    }, 5000);
  }
}
