import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  HeardFrom,
  HeardFromOptions,
  Language,
  TeachingLanguageOptions,
} from '../onboarding.model';
import {
  TeachingExperience,
  TeachingExperienceOptions,
} from './tutor-info.model';

@Component({
  selector: 'app-tutor-info',
  templateUrl: './tutor-info.component.html',
  styleUrls: ['./tutor-info.component.scss'],
})
export class TutorInfoComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {}
  teachingLanguageOptions = TeachingLanguageOptions;
  heardFromOptions = HeardFromOptions;
  teachingExperienceOptions = TeachingExperienceOptions;

  tutorBasicInfoForm!: FormGroup;
  tutorExperienceForm!: FormGroup;
  tutorAdditionalInfoForm!: FormGroup;

  maxDate: Date = new Date();

  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit(): void {
    this.createForm();
  }

  submitTutorBasicInfoForm() {
    for (let control in this.tutorBasicInfoForm.controls) {
      this.tutorBasicInfoForm.controls[control].markAsDirty();
      this.tutorBasicInfoForm.controls[control].markAsTouched();
    }

    if (this.tutorBasicInfoForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  submitTutorExperienceForm() {
    for (let control in this.tutorExperienceForm.controls) {
      this.tutorExperienceForm.controls[control].markAsDirty();
      this.tutorExperienceForm.controls[control].markAsTouched();
    }

    if (this.tutorExperienceForm.invalid) {
      return;
    }

    this.stepper.next();
  }

  createForm() {
    this.tutorBasicInfoForm = this._fb.group({
      teachingLanguage: [Language.English],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null, [Validators.required]],
    });

    this.tutorExperienceForm = this._fb.group({
      teachingExperience: [TeachingExperience.ZeroToSixMonths],
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [[]],
    });

    this.tutorAdditionalInfoForm = this._fb.group({
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: [],
    });
  }

  logout() {
    this._authService.signOut();
  }
}
