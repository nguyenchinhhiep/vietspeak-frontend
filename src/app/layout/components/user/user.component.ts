import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserType } from 'src/app/core/user/user-type.model';
import { IUser } from 'src/app/core/user/user.model';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  currentUser: IUser | null = null;

  ngOnInit(): void {
    this.currentUser = this._userService.currentUserValue;
  }

  logout() {
    this._authService.logout().subscribe();
  }

  onAccount() {
    const userType = this.currentUser?.userType;
    if (userType === UserType.Admin) {
      this._router.navigate(['/admin/account']);
    }
    if (userType === UserType.Tutor) {
      this._router.navigate(['/tutor/account']);
    }

    if (userType === UserType.Student) {
      this._router.navigate(['/student/account']);
    }
  }
}
