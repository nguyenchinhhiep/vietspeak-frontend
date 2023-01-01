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
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _router: Router,
    private _fb: UntypedFormBuilder,
    private _authService: AuthService
  ) {}

  @ViewChild('registerNgForm') registerNgForm!: NgForm;

  registerForm!: UntypedFormGroup;

  checked: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this._fb.group(
      {
        email: [
          '',
          [Validators.required, CustomValidators.isEmail()],
          this._validateExistingEmail(this._authService),
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    for (let control in this.registerForm.controls) {
      this.registerForm.controls[control].markAsDirty();
      this.registerForm.controls[control].markAsTouched();
    }
    if (this.registerForm.invalid || this.registerForm.status === 'PENDING')
      return;

    // Disable the form
    this.registerForm.disable();

    const payload = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this._authService.register(payload).subscribe((res) => {
      // Enable the form
      this.registerForm.enable();

      // Reset the form
      this.registerNgForm.resetForm();

      // Navigate to the root
      this._router.navigate(['/']);
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
              if (!isExisting) {
                return null;
              }
              return {
                existingEmail: true,
              };
            })
          );
        })
      );
    };
  }
}
