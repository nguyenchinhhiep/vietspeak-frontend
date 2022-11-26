import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from 'src/app/core/user/role.model';
import { AccountTypeList } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {}

  accountTypeList: any[] = JSON.parse(JSON.stringify(AccountTypeList));
  selectedAccountType: any = null;

  ngOnInit(): void {}

  continue() {
    if (this.selectedAccountType == null) {
      return;
    }

    if (this.selectedAccountType.value === Role.Student) {
      this._router.navigate(['/onboarding/student/basic-info']);
    }

    if (this.selectedAccountType.value === Role.Teacher) {
    }
  }

  logout() {
    this._authService.signOut();
  }
}
