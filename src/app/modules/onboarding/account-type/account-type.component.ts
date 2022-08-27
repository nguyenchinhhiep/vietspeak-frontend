import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountTypeList } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {
  constructor(private _router: Router) {}

  accountTypeList: any[] = JSON.parse(JSON.stringify(AccountTypeList));

  ngOnInit(): void {}

  onSelectType(type: any) {
    this.accountTypeList.forEach((type) => (type.selected = false));

    type['selected'] = true;
  }

  continue() {
    this._router.navigate(['/onboarding/basic-info']);
  }

  isDisabled() {
    return this.accountTypeList.filter((type) => type.selected).length <= 0;
  }

  back() {
    this._router.navigate(['/']);
  }
}
