import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _router: Router, private _fb: UntypedFormBuilder) {}

  @ViewChild('registerNgForm') registerNgForm!: NgForm;

  registerForm!: UntypedFormGroup;

  checked: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this._fb.group(
      {
        email: ['', [Validators.required, CustomValidators.isEmail()]],
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
    if (this.registerForm.invalid) return;

    this.registerForm.disable();

    setTimeout(() => {
      // Re-enable the form
      this.registerForm.enable();

      // Reset the form
      this.registerNgForm.resetForm();
    }, 5000);
  }
}
