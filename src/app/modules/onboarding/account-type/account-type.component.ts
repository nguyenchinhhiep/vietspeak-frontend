import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AccountTypeList } from 'src/app/core/user/user.model';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss'],
})
export class AccountTypeComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {}

  accountTypeList: any[] = JSON.parse(JSON.stringify(AccountTypeList));

  ngOnInit(): void {}

  onSelectAccountType(type: any) {
    
  }




  onLogout() {
    this._authService.signOut();
  }
}
