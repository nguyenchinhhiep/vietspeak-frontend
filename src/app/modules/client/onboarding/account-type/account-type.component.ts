import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { HttpService } from 'src/app/core/http/services/http.service';
import { UserType } from 'src/app/core/user/user-type.model';
import { UserService } from 'src/app/core/user/user.service';
import { AccountTypeList } from '../onboarding.model';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _httpService: HttpService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}

  accountTypeForm!: FormGroup;

  accountTypeList: any[] = JSON.parse(JSON.stringify(AccountTypeList));
  selectedAccountType: any = null;

  ngOnInit(): void {
    this.createForm();
    const userType = this._userService.currentUserValue?.userType;
    if (userType != null) {
      const selectedUserType = this.accountTypeList.find(
        (item) => item.value === userType
      );
      if (selectedUserType != null) {
        this.onAccountType(selectedUserType);
      }
    }
  }

  createForm() {
    this.accountTypeForm = this._fb.group({
      userType: ['', Validators.required],
    });
  }

  onAccountType(type: any) {
    this.selectedAccountType = type;
    this.accountTypeForm.get('userType')?.setValue(type.value);
  }

  continue() {
    for (let control in this.accountTypeForm.controls) {
      this.accountTypeForm.controls[control].markAsDirty();
      this.accountTypeForm.controls[control].markAsTouched();
    }

    // Return if the form is invalid
    if (this.accountTypeForm.invalid) return;

    if (this.selectedAccountType.value === UserType.Student) {
      this._router.navigate(['/onboarding/student']);
    }

    if (this.selectedAccountType.value === UserType.Tutor) {
      this._router.navigate(['/onboarding/tutor']);
    }
  }

  logout() {
    this._authService.logout().subscribe((res: boolean) => {
      this._router.navigate(['/login']);
    });
  }
}
