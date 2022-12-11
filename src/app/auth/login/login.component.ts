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
    private _translateService: TranslateService
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

    setTimeout(() => {
      // Re-enable the form
      this.loginForm.enable();

      // Reset the form
      this.loginNgForm.resetForm();

      // Set the alert
      this.alert = {
        type: 'error',
        message: this._translateService.instant(
          'Errors.InvalidEmailOrPassword'
        ),
      };
    }, 5000);
  }
}
