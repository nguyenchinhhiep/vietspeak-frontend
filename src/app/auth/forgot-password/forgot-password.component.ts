import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/components/alert/alert.model';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private _router: Router, private _fb: UntypedFormBuilder) {}
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
      email: ['', [Validators.required, CustomValidators.isEmail()]],
    });
  }

  submit() {
    for (let control in this.forgotPasswordForm.controls) {
      this.forgotPasswordForm.controls[control].markAsDirty();
      this.forgotPasswordForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.forgotPasswordForm.invalid) return;

    // Disable the form
    this.forgotPasswordForm.disable();

    // Reset the alert
    this.alert = null;

    setTimeout(() => {
      // Re-enable the form
      this.forgotPasswordForm.enable();

      // Reset the form
      this.forgotPasswordNgForm.resetForm();

      // Set the alert
      this.alert = {
        type: 'success',
        message:
          'An email has been sent to your email with instructions to reset your password',
      };
    }, 5000);
  }

  back() {
    this._router.navigate(['/login']);
  }
}
