import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private _router: Router, private _fb: UntypedFormBuilder) {}

  loading: boolean = false;

  form!: UntypedFormGroup;

  isSent: boolean = false;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.isSent = !this.isSent;
  }

  back() {
    this._router.navigate(['/login']);
  }
}
