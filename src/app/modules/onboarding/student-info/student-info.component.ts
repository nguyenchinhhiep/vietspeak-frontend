import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Gender, Genders, Occupation, Occupations } from './student-info.model';

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

  genders = Genders;
  occupations = Occupations;

  ngOnInit(): void {
    this.createForm();
  }

  submit() {}

  createForm() {
    this.studentInfoForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null],
      occupation: [Occupation.Student, Validators.required],
    });
  }

  logout() {
    this._authService.signOut();
  }
}
