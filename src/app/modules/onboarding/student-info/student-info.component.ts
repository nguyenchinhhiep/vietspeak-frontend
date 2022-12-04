import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HeardFrom, HeardFromOptions, Language } from '../onboarding.model';
import {
  LanguageLevel,
  LanguageLevelOptions,
  learningLanguageOptions,
} from './student-info.model';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder
  ) {}
  studentInfoForm!: FormGroup;

  languageLevelOptions = LanguageLevelOptions;
  heardFromOptions = HeardFromOptions;
  learningLanguageOptions = learningLanguageOptions;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {}

  createForm() {
    this.studentInfoForm = this._fb.group({
      learningLanguage: [Language.English],
      currentLevel: [LanguageLevel.Beginner],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      heardFrom: [HeardFrom.WebSearch],
    });
  }

  logout() {
    this._authService.signOut();
  }
}
