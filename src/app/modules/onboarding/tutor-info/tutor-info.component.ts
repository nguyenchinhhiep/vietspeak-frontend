import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/components/toast/toast.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HeardFrom, HeardFromOptions } from '../onboarding.model';
import {
  TeachingExperience,
  TeachingExperienceOptions,
  TeachingLanguageOptions,
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
    private _fb: FormBuilder,
    private _toastService: ToastService,
    private _translateService: TranslateService
  ) {}

  teachingLanguageOptions = TeachingLanguageOptions;
  heardFromOptions = HeardFromOptions;
  teachingExperienceOptions = TeachingExperienceOptions;

  tutorBasicInfoForm!: FormGroup;
  tutorExperienceForm!: FormGroup;
  tutorAdditionalInfoForm!: FormGroup;

  maxDate: Date = new Date();

  remainingCharactersReasonHere: number = 500;
  remainingCharactersIntroduction: number = 1000;

  isOnDropFilesContainer: boolean = false;

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
      teachingLanguage: [this.teachingLanguageOptions[0]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null, [Validators.required]],
    });

    this.tutorExperienceForm = this._fb.group({
      teachingExperience: [TeachingExperience.OneToSixMonths],
      haveExperienceTeachingOnline: [true],
      teachingCertificates: [null, [Validators.required]],
    });

    this.tutorAdditionalInfoForm = this._fb.group({
      heardFrom: [HeardFrom.WebSearch],
      reasonHere: ['', [Validators.required]],
      introduction: ['', [Validators.required]],
    });

    this.tutorAdditionalInfoForm
      .get('reasonHere')
      ?.valueChanges.subscribe((val) => {
        const value = val || '';
        this.remainingCharactersReasonHere = 500 - value.length;
      });

    this.tutorAdditionalInfoForm
      .get('introduction')
      ?.valueChanges.subscribe((val) => {
        const value = val || '';
        this.remainingCharactersIntroduction = 1000 - value.length;
      });
  }

  logout() {
    this._authService.logout();
  }

  // On file input change event
  onFileSelected(event: any, fileInput: any) {
    const uploadFiles = event.target.files || [];
    this.handleFilesUpload(uploadFiles);
    fileInput.value = null;
  }

  handleFilesUpload(uploadFiles: any[]) {
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

  removeFile(index: number) {
    const files =
      this.tutorExperienceForm.get('teachingCertificates')?.value || [];

    files.splice(index, 1);

    this.tutorExperienceForm
      .get('teachingCertificates')
      ?.setValue(files.length > 0 ? files : null);
  }

  onDragEnter(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  onDragOver(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = true;
  }

  onDragLeave(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
  }

  onDrop(event: any) {
    this.preventDefaults(event);
    this.isOnDropFilesContainer = false;
    const dt = event.dataTransfer;
    const files = dt.files || [];
    this.handleFilesUpload(files);
  }

  preventDefaults(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }
}
