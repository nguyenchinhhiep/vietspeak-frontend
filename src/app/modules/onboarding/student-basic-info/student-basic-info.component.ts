import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-student-basic-info',
  templateUrl: './student-basic-info.component.html',
  styleUrls: ['./student-basic-info.component.scss'],
})
export class StudentBasicInfoComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService, private _fb: FormBuilder) {}
  studentInfoForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }



  submit() {}

  createForm() {
    this.studentInfoForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['male'],
      dob: [null],
      occupation: [null],
    })
  }



  logout() {
    this._authService.signOut();
  }
}
