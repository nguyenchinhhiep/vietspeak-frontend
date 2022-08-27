import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _router: Router, private _fb: UntypedFormBuilder) {}

  loading: boolean = false;

  form!: UntypedFormGroup;

  checked: boolean = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group(
      {
        email: [{ value: 'nguyenchinhhiep95@gmail.com', disabled: true }],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        agreements: [false, [Validators.requiredTrue]],
      },
      {
        validator: CustomValidators.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    for (let control in this.form.controls) {
      this.form.controls[control].markAsDirty();
      this.form.controls[control].markAsTouched();
    }
    if (this.form.invalid) return;
  }

  back() {
    this._router.navigate(['/login']);
  }
}
