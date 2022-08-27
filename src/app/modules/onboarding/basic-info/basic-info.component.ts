import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  constructor(private _router: Router, private _fb: FormBuilder) {}

  form!: UntypedFormGroup;

  loading: boolean = false;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      knowFrom: ['', [Validators.required]],
      timezone: ['', Validators.required],
    });
  }

  submit() {}

  back() {
    this._router.navigate(['/onboarding/account-type']);
  }
}
