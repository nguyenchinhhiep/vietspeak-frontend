import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  LanguageLevel,
  LanguageLevelOptions,
  learningLanguageOptions,
} from '../languages.model';
import { HeardFrom, HeardFromOptions } from '../onboarding.model';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _confirmationDialogService: ConfirmationDialogService,
    private _translateService: TranslateService
  ) {}
  StudentProfileForm!: FormGroup;

  languageLevelOptions = LanguageLevelOptions;
  heardFromOptions = HeardFromOptions;
  learningLanguageOptions = learningLanguageOptions;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {
    for (let control in this.StudentProfileForm.controls) {
      this.StudentProfileForm.controls[control].markAsDirty();
      this.StudentProfileForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.StudentProfileForm.invalid) return;

    // Disable the form
    this.StudentProfileForm.disable();
  }

  createForm() {
    this.StudentProfileForm = this._fb.group({
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      heardFrom: [HeardFrom.WebSearch],
    });
  }

  logout() {
    this._authService.logout();
  }

  openConfirmationUnsavedChanges() {
    const confirmRef = this._confirmationDialogService.open({
      message: this._translateService.instant('Confirmation.UnsavedChanges'),
      title: this._translateService.instant('Confirmation.Title'),
      actions: {
        cancel: {
          show: true,
          label: this._translateService.instant('Confirmation.Cancel'),
        },
        confirm: {
          show: true,
          label: this._translateService.instant('Confirmation.Confirm'),
          color: 'primary',
        },
      },
    });

    confirmRef.afterClosed().subscribe((type: string) => {
      if (type === 'confirmed') {
      }
    });
  }
}
