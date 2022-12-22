import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  HeardFrom,
  HeardFromOptions,
} from 'src/app/modules/client/onboarding/onboarding.model';

@Component({
  selector: 'app-tutor-additional-info',
  templateUrl: './tutor-additional-info.component.html',
  styleUrls: ['./tutor-additional-info.component.scss'],
})
export class TutorAdditionalInfoComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  tutorAdditionalInfoForm!: FormGroup;

  heardFromOptions = HeardFromOptions;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorAdditionalInfoForm = this._fb.group({
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]],
    });
  }
}
