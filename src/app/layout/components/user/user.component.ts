import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Role } from 'src/app/core/user/role.model';
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

  onSettings() {
    const role = this.currentUser?.role;
    if (role === Role.Admin) {
      this._router.navigate(['/admin/settings']);
    }
    if (role === Role.Tutor) {
      this._router.navigate(['/tutor/settings']);
    }

    if (role === Role.Student) {
      this._router.navigate(['/student/settings']);
    }
  }
}
