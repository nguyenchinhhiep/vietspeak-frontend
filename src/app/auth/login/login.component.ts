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
import { AlertType } from 'src/app/components/alert/alert.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IApiResponse } from 'src/app/core/http/api.model';
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
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute
  ) {}
  @ViewChild('loginNgForm') loginNgForm!: NgForm;

  alert: { type: AlertType; message: string } | any = {
    type: 'success',
    message: '',
  };

  loading: boolean = false;
  loginForm!: UntypedFormGroup;
  queryParams$: Observable<Params> = this._activatedRoute.queryParams;
  redirectUrl: string = '';

  ngOnInit(): void {
    this.queryParams$.subscribe((params: Params) => {
      this.redirectUrl = params['redirectUrl'];
    });
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
      next: (res: IApiResponse) => {
        // Re-enable the form
        this.loginForm.enable();

        //  If error
        if (res.status == 'error') {
          if (res.code === 401) {
            // Set the alert
            this.alert = {
              type: 'error',
              message: this._translateService.instant(
                'Error.InvalidEmailOrPassword'
              ),
            };
          }

          if (res.code === 403) {
            // Set the alert
            this.alert = {
              type: 'error',
              message: this._translateService.instant('Error.AccountBlocked'),
            };
          }
        }

        if (res.status === 'success') {
          // Reset the form
          this.loginNgForm.resetForm();

          // Navigate to the redirect route
          if (this.redirectUrl) {
            this._router.navigate([this.redirectUrl]);
            return;
          }

          // Navigate
          this._router.navigate(['/student']);
        }
      },
      error: (err) => {
        // Re-enable the form
        this.loginForm.enable();
      },
    });
  }
}
