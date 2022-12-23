import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
import {
  LanguageLevelOptions,
  learningLanguageOptions,
  LanguageLevel,
} from 'src/app/modules/client/onboarding/languages.model';

@Component({
  selector: 'app-student-learning',
  templateUrl: './student-learning.component.html',
  styleUrls: ['./student-learning.component.scss'],
})
export class StudentLearningComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  studentLearningForm!: FormGroup;

  languageLevelOptions = LanguageLevelOptions;
  learningLanguageOptions = learningLanguageOptions;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.studentLearningForm = this._fb.group({
      learningLanguage: [learningLanguageOptions[0]],
      currentLevel: [LanguageLevel.Beginner],
    });
  }

  submit() {
    for (let control in this.studentLearningForm.controls) {
      this.studentLearningForm.controls[control].markAsDirty();
      this.studentLearningForm.controls[control].markAsTouched();
    }

    if (this.studentLearningForm.invalid) {
      return;
    }
  }
}
