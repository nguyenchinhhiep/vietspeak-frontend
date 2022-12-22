import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import {
  TeachingExperienceOptions,
  LanguageOptions,
  FluencyOptions,
  TeachingExperience,
  Language,
  Fluency,
} from 'src/app/modules/client/onboarding/languages.model';

@Component({
  selector: 'app-tutor-experience',
  templateUrl: './tutor-experience.component.html',
  styleUrls: ['./tutor-experience.component.scss'],
})
export class TutorExperienceComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  teachingExperienceOptions = TeachingExperienceOptions;
  languageOptions = LanguageOptions;
  fluencyOptions = FluencyOptions;

  tutorExperienceForm!: FormGroup;

  isOnDropFilesContainer: boolean = false;

  ngOnInit(): void {
    this.createForm();
  }

  // Create forms
  createForm() {
    this.tutorExperienceForm = this._fb.group({
      teachingExperience: [TeachingExperience.OneToSixMonths],
      languages: this._fb.array([this.createlanguageFormGroup()]),
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null, [Validators.required]],
    });

    this.languagesFormArray.at(0).get('language')?.disable();
  }

  submitTutorExperienceForm() {
    for (let control in this.tutorExperienceForm.controls) {
      this.tutorExperienceForm.controls[control].markAsDirty();
      this.tutorExperienceForm.controls[control].markAsTouched();
    }

    if (this.tutorExperienceForm.invalid) {
      return;
    }
  }

  // Get language form array
  get languagesFormArray(): FormArray {
    return this.tutorExperienceForm.get('languages') as FormArray;
  }

  // Create language form group
  createlanguageFormGroup(): FormGroup {
    const fg = this._fb.group({
      language: [Language.English],
      fluency: [Fluency.A1],
    });

    return fg;
  }

  // Add language
  addLanguage() {
    this.languagesFormArray.push(this.createlanguageFormGroup());
  }

  // Remove language form group
  removeLanguage(i: number) {
    this.languagesFormArray.removeAt(i);
  }

  // On file input change event
  onCertificatesSelected(event: any, fileInput: any) {
    const uploadFiles = event.target.files || [];
    this.handleCertificatesUpload(uploadFiles);
    fileInput.value = null;
  }

  // Handle certificate files
  handleCertificatesUpload(uploadFiles: any[]) {
    const maxSize = 33554432;
    const files =
      this.tutorExperienceForm.get('teachingCertificates')?.value || [];
    if (uploadFiles.length > 0) {
      for (const file of uploadFiles) {
        // Only allow .pdf file
        if (file.type != 'application/pdf') {
          this._toastService.open({
            message: this._translateService.instant(
              'FileUpload.OnlyAllowedFileType',
              {
                fileType: '.pdf',
              }
            ),
            configs: {
              payload: {
                type: 'error',
              },
            },
          });
          continue;
        }

        // Limit file size to 32mb
        if (file.size > maxSize) {
          this._toastService.open({
            message: this._translateService.instant('FileUpload.FileTooLarge', {
              maxUploadSize: '32mb',
            }),
            configs: {
              payload: {
                type: 'error',
              },
            },
          });
          continue;
        }

        // Skip the same files
        if (files.find((f: File) => f.name?.toLowerCase() === file.name)) {
          continue;
        }

        files.push(file);

        this.tutorExperienceForm.get('teachingCertificates')?.setValue(files);
      }
    }
  }

  // On remove certificate file
  removeCertificate(index: number) {
    const files =
      this.tutorExperienceForm.get('teachingCertificates')?.value || [];

    files.splice(index, 1);

    this.tutorExperienceForm
      .get('teachingCertificates')
      ?.setValue(files.length > 0 ? files : null);
  }

  // On drag enter
  onDragEnter(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  // On drag over
  onDragOver(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  // On drag leave
  onDragLeave(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
  }

  // On drop files
  onDrop(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
    const dt = event.dataTransfer;
    const files = dt.files || [];
    this.handleCertificatesUpload(files);
  }

  preventDefaults(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }
}
