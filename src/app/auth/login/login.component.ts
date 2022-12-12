import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertType } from 'src/app/components/alert/alert.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _translateService: TranslateService,
    private _authService: AuthService
  ) {}
  @ViewChild('loginNgForm') loginNgForm!: NgForm;

  alert: { type: AlertType; message: string } | any = {
    type: 'success',
    message: '',
  };

  loading: boolean = false;
  loginForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, CustomValidators.isEmail()]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    for (let control in this.loginForm.controls) {
      this.loginForm.controls[control].markAsDirty();
      this.loginForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.loginForm.invalid) return;

    // Disable the form
    this.loginForm.disable();

    // Reset the alert
    this.alert = {};

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this._authService.login(payload).subscribe({
      next: (res) => {
        // Re-enable the form
        this.loginForm.enable();

        // Reset the form
        this.loginNgForm.resetForm();

        // Navigate to onboarding
        this._router.navigate(['/onboarding']);
      },
      error: (e) => {
        // Re-enable the form
        this.loginForm.enable();

        // Set the alert
        this.alert = {
          type: 'error',
          message: this._translateService.instant(
            'Errors.InvalidEmailOrPassword'
          ),
        };
      },
    });
  }
}
