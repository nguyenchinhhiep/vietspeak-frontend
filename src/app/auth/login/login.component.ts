import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private _router: Router, private _fb: UntypedFormBuilder) {}
  loading: boolean = false;
  form!: UntypedFormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      emailFound: [false],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    for (let control in this.form.controls) {
      this.form.controls[control].markAsDirty();
      this.form.controls[control].markAsTouched();
    }
    if (this.form.invalid) return;

    const emailFound: boolean = this.form.get('emailFound')?.value;

    if (emailFound) {
      console.log(this.form.value);
    } else {
      // Check if email found
      this.form.get('emailFound')?.setValue(true);
      // Set validator and reset states for password
      this.form.get('password')?.setValidators([Validators.required]);
      this.form.get('password')?.markAsUntouched();
      this.form.get('password')?.markAsPristine();
    }
  }

  // Reset form value and validators
  reset() {
    this.createForm();
  }
}
