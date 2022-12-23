import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
import { TeachingLanguageOptions } from 'src/app/modules/client/onboarding/languages.model';

@Component({
  selector: 'app-tutor-teaching',
  templateUrl: './tutor-teaching.component.html',
  styleUrls: ['./tutor-teaching.component.scss'],
})
export class TutorTeachingComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  tutorTeachingForm!: FormGroup;

  teachingLanguageOptions = TeachingLanguageOptions;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.tutorTeachingForm = this._fb.group({
      teachingLanguage: [this.teachingLanguageOptions[0]],
    });
  }

  submit() {
    for (let control in this.tutorTeachingForm.controls) {
      this.tutorTeachingForm.controls[control].markAsDirty();
      this.tutorTeachingForm.controls[control].markAsTouched();
    }

    if (this.tutorTeachingForm.invalid) {
      return;
    }
  }
}
