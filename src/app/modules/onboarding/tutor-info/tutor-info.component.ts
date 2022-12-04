import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Language, TeachingLanguageOptions } from '../onboarding.model';

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

  tutorBasicInfoForm!: FormGroup;
  tutorExperienceForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {}

  createForm() {
    this.tutorBasicInfoForm = this._fb.group({
      teachingLanguage: [Language.English],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null],
    });
  }

  logout() {
    this._authService.signOut();
  }
}
